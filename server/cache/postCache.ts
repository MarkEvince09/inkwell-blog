/**
 * Simulated Redis: each value is a single JSON string (like SET post:slug).
 */
const store = new Map<string, string>()

export const postCache = {
  get(key: string): string | null {
    return store.get(key) ?? null
  },

  set(key: string, value: string): void {
    store.set(key, value)
  },

  del(key: string): void {
    store.delete(key)
  },

  appendToList(key: string, value: string): void {
    const existing = store.get(key)
    const list: string[] = existing ? JSON.parse(existing) : []
    list.push(value)
    store.set(key, JSON.stringify(list))
  },

  getList(key: string): string[] {
    const raw = store.get(key)
    if (!raw) return []
    return JSON.parse(raw) as string[]
  },

  keys(): string[] {
    return Array.from(store.keys())
  },
}

export function postKey(slug: string): string {
  return `post:${slug}`
}

export function commentsKey(slug: string): string {
  return `comments:${slug}`
}
