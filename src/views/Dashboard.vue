<template>
  <div class="container">
    <div
      v-for="(block, index) in blocks"
      :key="block.id"
      class="block"
      :style="{
        width: block.width + 'px',
        height: block.height + 'px',
        top: block.top + 'px',
        left: block.left + 'px',
        zIndex: block.zIndex
      }"
      @click="increaseZIndex(block)"
    >
      Title {{ index + 1 }}
      <div class="resize-handle" @mousedown="startResize($event, block)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { getBlocksFromLocalStorage, saveBlocksToLocalStorage } from '@/utils/blocks';

interface Block {
  id: string;
  width: number;
  height: number;
  top: number;
  left: number;
  zIndex: number;
}

const blocks: Ref<Block[]> = ref(getBlocksFromLocalStorage());

let startX: number | null = null;
let startY: number | null = null;
let startWidth: number | null = null;
let startHeight: number | null = null;
let isResizing = false;
let activeBlockId: string | null = null;

const startResize = (event: MouseEvent, block: Block) => {
  isResizing = true;
  startX = event.clientX;
  startY = event.clientY;
  startWidth = block.width;
  startHeight = block.height;
  activeBlockId = block.id;
  document.addEventListener('mousemove', resizeBlock);
  document.addEventListener('mouseup', endResize);
};

const resizeBlock = (event) => {
  if (!isResizing || !startX || !startY || !startWidth || !startHeight || !activeBlockId) return;

  const offsetX = event.clientX - startX;
  const offsetY = event.clientY - startY;

  const index = blocks.value.findIndex((block) => block.id === activeBlockId);
  if (index !== -1) {
    blocks.value[index].width = startWidth + offsetX;
    blocks.value[index].height = startHeight + offsetY;
  }
};

const endResize = () => {
  isResizing = false;
  activeBlockId = null;
  saveBlocksToLocalStorage(blocks.value);
  document.removeEventListener('mousemove', resizeBlock);
  document.removeEventListener('mouseup', endResize);
};

const increaseZIndex = (block: Block) => {
  block.zIndex = blocks.value.reduce((maxZIndex, currentBlock) => {
    return Math.max(maxZIndex, currentBlock.zIndex);
  }, 0) + 1;
  saveBlocksToLocalStorage(blocks.value);
}
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}

.block {
  position: absolute;
  border: 1px solid #000000;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #ffffff;
  border: 1px solid #000000;
  cursor: se-resize;
  bottom: 0;
  right: 0;
}
</style>