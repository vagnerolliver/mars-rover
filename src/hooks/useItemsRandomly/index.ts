type GetFn<T> = (items: T[], limit?: number) => T[]
  
export function useItemsRandomly<T = unknown> (): GetFn<T> {
  const get = (items: T[], limit = 4): T[] => {
    const result = []
    for (let i = 0; i < limit; i++) {
      const pos = Math.floor(Math.random() * items.length)
      result.push(...items.slice(pos, pos + 1))
    }
    return result
  }

  return get
}