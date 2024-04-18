import { getItemFromLocalStorage } from "./localStorage"

export interface Block {
  id: string
  width: number
  height: number
  top: number
  left: number
  zIndex: number
}

export function getBlocksFromLocalStorage({key} : {key: string}) {
  const storedBlocks = getItemFromLocalStorage({key})
  if (storedBlocks) {
    return storedBlocks;
  } else {
    return [
      {
        id: 'Title 1',
        width: 300,
        height: 100,
        left: getRandomPosition(),
        top: getRandomPosition(),
        zIndex: 1
      },
      {
        id: 'Title 2',
        width: 300,
        height: 100,
        left: getRandomPosition(),
        top: getRandomPosition(),
        zIndex: 1
      },
      {
        id: 'Title 3',
        width: 300,
        height: 100,
        left: getRandomPosition(),
        top: getRandomPosition(),
        zIndex: 1
      },
      {
        id: 'Title 4',
        width: 300,
        height: 100,
        left: getRandomPosition(),
        top: getRandomPosition(),
        zIndex: 1
      },
      {
        id: 'Title 5',
        width: 300,
        height: 100,
        left: getRandomPosition(),
        top: getRandomPosition(),
        zIndex: 1
      }
    ]
  }
}

function getRandomPosition() {
  return Math.floor(Math.random() * 500)
}
