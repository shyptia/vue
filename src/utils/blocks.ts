export function getBlocksFromLocalStorage() {
  const storedBlocks = localStorage.getItem('blocks')
  if (storedBlocks) {
    return JSON.parse(storedBlocks)
  } else {
    return [
      {
        id: 'title1',
        width: 300,
        height: 100,
        left: getRandomPosition(),
        top: getRandomPosition(),
        zIndex: 1
      },
      {
        id: 'title2',
        width: 300,
        height: 100,
        left: getRandomPosition(),
        top: getRandomPosition(),
        zIndex: 1
      },
      {
        id: 'title3',
        width: 300,
        height: 100,
        left: getRandomPosition(),
        top: getRandomPosition(),
        zIndex: 1
      },
      {
        id: 'title4',
        width: 300,
        height: 100,
        left: getRandomPosition(),
        top: getRandomPosition(),
        zIndex: 1
      },
      {
        id: 'title5',
        width: 300,
        height: 100,
        left: getRandomPosition(),
        top: getRandomPosition(),
        zIndex: 1
      }
    ]
  }
}

export function saveBlocksToLocalStorage(value: any) {
  localStorage.setItem('blocks', JSON.stringify(value))
}

function getRandomPosition() {
  return Math.floor(Math.random() * 500)
}
