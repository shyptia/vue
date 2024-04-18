# Vue task

### Demo 

- [DEMO LINK](https://main--darling-fairy-0471b1.netlify.app/)

https://github.com/shyptia/vue/assets/57047930/8ec58c65-3950-4c27-aa7e-8b98119346c2

### Description

This repository contains a single-page application implemented using the VueJS framework. The application consists of multiple sections, each corresponding to its own URL. 

Section 1: Interactive dashboard
In this section, an interactive workspace template for an investor's dashboard is implemented. The template comprises five different blocks positioned on a grid. Users can interact with these blocks by moving, resizing, and deleting/returning them. Block positions and sizes persist even after browser refresh or tab closure/reopening. 

Notes:
- To resize the block, interact with the small square in the bottom right corner of the block. Interact with this square using the mouse to enlarge or shrink the size as needed.
- To move the block, interact directly with the block itself. Press and hold the mouse to move the block where needed.
- To delete the block, double-click on the block.
- After deleting a block, a button will appear at the top to return the block. If you want to restore the deleted block, you need to click on it.

Section 2: Server Interaction via WebSocket Protocol
This section implements subscription to new unconfirmed Bitcoin transactions using the Blockchain WebSocket API. The interface includes a list of transactions that updates continuously, the sum of displayed transactions, and three buttons: "Start", "Stop", and "Reset".

Notes:
- Users click on the "Start" button to subscribe to new transaction messages. Each message adds a transaction to the list and updates the transaction sum.
- Users click on the "Reset" button to clear the list of transactions and reset the sum. However, upon receiving the next message, the list is populated again, and the sum is updated.
- Users click on the "Stop" button to unsubscribe from new transaction messages. Messages stop coming, but the list and sum remain unchanged from the state after the last received message.

### Technologies used:

- Vue.js
- TypeScript
- WebSocket Protocol
- CSS
- HTML

### Instructions how to run application locally:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Open terminal in the project.
4. Set up project and install necessary packages:
```bash 
yarn
```
4. Run the development server:
```bash 
yarn dev
```
5. Open application in your browser `http://localhost:5173/`

```sh
yarn lint
```
