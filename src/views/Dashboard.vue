<template>
  <div class="container">
    <div
      v-for="(block, index) in blocks"
      :key="block.id"
      class="block"
      :style="{ width: block.width + 'px', height: block.height + 'px' }"
      @mousedown="startResize($event, block.id)"
      @mouseup="endResize"
      @mousemove="resizeBlock($event, block.id)"
    >
      Title {{ index + 1 }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const blocks = ref(getBlocksFromLocalStorage());

function getBlocksFromLocalStorage() {
  const storedBlocks = localStorage.getItem('blocks');
  if (storedBlocks) {
    return JSON.parse(storedBlocks);
  } else {
    return [
      { id: 'title1', width: 300, height: 100 },
      { id: 'title2', width: 300, height: 100 },
      { id: 'title3', width: 300, height: 100 },
      { id: 'title4', width: 300, height: 100 },
      { id: 'title5', width: 300, height: 100 },
    ];
  }
}

let startX, startY;
let startWidth, startHeight;
let isResizing = false;
let activeBlockId = null;

const resizeBlock = (event, id) => {
  if (!isResizing || id !== activeBlockId) return;

  const offsetX = event.clientX - startX;
  const offsetY = event.clientY - startY;

  const index = blocks.value.findIndex(block => block.id === id);
  if (index !== -1) {
    blocks.value[index].width = startWidth + offsetX;
    blocks.value[index].height = startHeight + offsetY;
  }
};

const startResize = (event, id) => {
  if (event.target === event.currentTarget) {
    isResizing = true;
    startX = event.clientX;
    startY = event.clientY;
    const index = blocks.value.findIndex(block => block.id === id);
    if (index !== -1) {
      startWidth = blocks.value[index].width;
      startHeight = blocks.value[index].height;
    }
    activeBlockId = id;
  }
};

const endResize = () => {
  isResizing = false;
  activeBlockId = null;
  saveBlocksToLocalStorage();
};

function saveBlocksToLocalStorage() {
  localStorage.setItem('blocks', JSON.stringify(blocks.value));
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.block {
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
</style>