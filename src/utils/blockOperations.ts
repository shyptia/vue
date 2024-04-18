import type { Ref } from "vue";
import type { Block } from "./blocks"
import { getItemFromLocalStorage, removeItemFromLocalStorage, saveItemToLocalStorage } from "./localStorage";

export function increaseZIndex({ blocks, block }: { blocks: Ref<Block[]>; block: Block }) {
  block.zIndex =
    blocks.value.reduce((maxZIndex, currentBlock) => Math.max(maxZIndex, currentBlock.zIndex), 0) +
    1
  saveItemToLocalStorage({ key: 'blocks', value: blocks.value })
}

export function deleteBlock({ blocks, block }: { blocks: Ref<Block[]>; block: Block }) {
  if (blocks.value.length < 5) return

  saveItemToLocalStorage({ key: 'deleted', value: block })
  blocks.value = blocks.value.filter((item) => item.id !== block.id)
  saveItemToLocalStorage({ key: 'blocks', value: blocks.value })
}

export function returnDeletedBlock ({ blocks }: { blocks: Ref<Block[]> }) {
  const deletedBlock = getItemFromLocalStorage({ key: 'deleted' })

  if (deletedBlock) {
    deletedBlock.width = 300
    deletedBlock.height = 100
    deletedBlock.top = (window.innerHeight - 100) / 2
    deletedBlock.left = (window.innerWidth - 300) / 2
    blocks.value.push(deletedBlock)

    removeItemFromLocalStorage({ key: 'deleted' })
    saveItemToLocalStorage({ key: 'blocks', value: blocks.value })
  }
}
