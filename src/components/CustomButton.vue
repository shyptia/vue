<template>
  <button
    :class="['button', variant, { 'disabled': isDisabled }]"
    @click="handleClick"
    :disabled="isDisabled">
    {{ text }}
  </button>
</template>

<script>
  export default {
    props: {
      onClick: {
        type: Function,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      variant: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'danger', 'warning', 'success'].includes(value)
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      isDisabled() {
        return this.disabled;
      }
    },
    methods: {
      handleClick() {
        this.onClick();
      }
    }
  };
</script>

<style scoped>
  .button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: #ffffff;
    font-size: 18px;
  }

  .default {
    background-color: #007bff;
  }

  .danger {
    background-color: #dc3545;
  }

  .warning {
    background-color: #ffc107;
  }

  .success {
    background-color: #28a745;
  }

  .disabled {
    opacity: 0.5;
    background-color: #5b5858;
    cursor: not-allowed;
  }
</style>
