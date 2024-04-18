<template>
  <CustomButton v-if="blocks.length < 5" text="Return deleted block to dashboard" variant="warning" @click="handleReturnDeletedBlock" />
  <div class="container">
    <div
      v-for="block in blocks"
      :key="block.id"
      class="block"
      :style="{
        width: block.width + 'px',
        height: block.height + 'px',
        top: block.top + 'px',
        left: block.left + 'px',
        zIndex: block.zIndex
      }"
      @click="handleIncreaseZIndex(block)"
      @mousedown="startDrag($event, block)"
      @dblclick="handleDeleteBlock(block)"
    >
      {{ block.id }}
      <div class="resize-handle" @mousedown="startResize($event, block)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { getBlocksFromLocalStorage, type Block } from '@/utils/blocks'
import CustomButton from '../components/CustomButton.vue'
import { saveItemToLocalStorage } from '@/utils/localStorage';
import {increaseZIndex, deleteBlock, returnDeletedBlock } from '@/utils/blockOperations'

const blocks: Ref<Block[]> = ref(getBlocksFromLocalStorage({key: 'blocks'}))

let startX: number | null = null
let startY: number | null = null
let startWidth: number | null = null
let startHeight: number | null = null
let isResizing = false
let activeBlockId: string | null = null
let startLeft: number | null = null
let startTop: number | null = null
let isDragging = false

const startDrag = (event: MouseEvent, block: Block) => {
  if (isResizing) return
  increaseZIndex({blocks, block})
  isDragging = true
  startX = event.clientX
  startY = event.clientY
  startLeft = block.left
  startTop = block.top
  activeBlockId = block.id
  document.addEventListener('mousemove', dragBlock)
  document.addEventListener('mouseup', endDrag)
}

const dragBlock = (event: MouseEvent) => {
  if (!isDragging || !startX || !startY || !startLeft || !startTop || !activeBlockId) return

  const offsetX = event.clientX - startX
  const offsetY = event.clientY - startY

  const index = blocks.value.findIndex((block) => block.id === activeBlockId)
  if (index !== -1) {
    blocks.value[index].left = startLeft + offsetX
    blocks.value[index].top = startTop + offsetY
  }
}

const endDrag = () => {
  isDragging = false
  activeBlockId = null
  saveItemToLocalStorage({key: 'blocks', value: blocks.value})
  document.removeEventListener('mousemove', dragBlock)
  document.removeEventListener('mouseup', endDrag)
}

const startResize = (event: MouseEvent, block: Block) => {
  isResizing = true
  startX = event.clientX
  startY = event.clientY
  startWidth = block.width
  startHeight = block.height
  activeBlockId = block.id
  document.addEventListener('mousemove', resizeBlock)
  document.addEventListener('mouseup', endResize)
}

const resizeBlock = (event: MouseEvent) => {
  if (!isResizing || !startX || !startY || !startWidth || !startHeight || !activeBlockId) return

  const offsetX = event.clientX - startX
  const offsetY = event.clientY - startY

  const index = blocks.value.findIndex((block) => block.id === activeBlockId)
  if (index !== -1) {
    blocks.value[index].width = startWidth + offsetX
    blocks.value[index].height = startHeight + offsetY
  }
}

const endResize = () => {
  isResizing = false
  activeBlockId = null
  saveItemToLocalStorage({key: 'blocks', value: blocks.value})
  document.removeEventListener('mousemove', resizeBlock)
  document.removeEventListener('mouseup', endResize)
}

const handleIncreaseZIndex = (block: Block) => increaseZIndex({blocks, block})
const handleDeleteBlock = (block: Block) =>  deleteBlock({blocks, block})
const handleReturnDeletedBlock = () => returnDeletedBlock({blocks})
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
