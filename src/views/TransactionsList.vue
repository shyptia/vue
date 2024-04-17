<template>
  <div>
    <h1 class="header">Transactions</h1>

    <div class="button-container">
    <CustomButton @click="startSubscription" text="Start" variant="success" :disabled="isSubscribed" />
    <CustomButton @click="stopSubscription" text="Stop" variant="danger" :disabled="!isSubscribed" />
    <CustomButton @click="reset" text="Reset" variant="warning" />
    </div>

    <p class="total-sum">Total sum: {{ total }} BTC</p>

    <table class="table">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in transactions" :key="index">
          <td>{{ transaction.from }}</td>
          <td>{{ transaction.to }}</td>
          <td>{{ transaction.sum }} BTC</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import CustomButton from './CustomButton.vue';

  export default {
    data() {
      return {
        websocket: null,
        isSubscribed: false,
        transactions: [],
        total: 0
      };
    },
    methods: {
      startSubscription() {
        this.websocket = new WebSocket('wss://ws.blockchain.info/inv');

        this.websocket.onopen = () => {
          console.log('WebSocket connected');
          this.websocket.send('{"op":"unconfirmed_sub"}');
          this.isSubscribed = true;
        };

        this.websocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const transaction = {
            from: data.x.inputs.map(input => input.prev_out.addr).join(', '),
            to: data.x.out.map(output => output.addr).join(', '),
            sum: (data.x.out.reduce((acc, curr) => acc + curr.value, 0) / 100000000).toFixed(8)
          };
          this.transactions.push(transaction);
          this.total += parseFloat(transaction.sum);
        };
      },
      stopSubscription() {
        if (this.websocket) {
          this.websocket.close();
          this.isSubscribed = false;
        }
      },
      reset() {
        this.transactions = [];
        this.total = 0;
      }
    },
    components: {
      CustomButton,
    },
  };
</script>

<style>
  .header {
    font-weight: 700;
    font-size: 32px;
    text-align: center;
  }

  .button-container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
  }

  .total-sum {
    font-weight: 700;
    text-align: center;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }
</style>