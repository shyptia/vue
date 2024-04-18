export function getItemFromLocalStorage({ key }: { key: string }) {
  const storedItem = localStorage.getItem(key)

  return storedItem ? JSON.parse(storedItem) : undefined
}

export function removeItemFromLocalStorage({ key }: { key: string }) {
  localStorage.removeItem(key)
}

export function saveItemToLocalStorage({ key, value }: { key: string; value: any }) {
  localStorage.setItem(key, JSON.stringify(value))
}
