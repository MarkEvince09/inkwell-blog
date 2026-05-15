import type { Post } from '../types/post'
import { getPostBySlug } from './posts'

const API_BASE = '/api'

export interface Comment {
  id: string
  postSlug: string
  author: string
  body: string
  createdAt: string
}

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_BASE}/posts/${encodeURIComponent(slug)}`)
    if (res.ok) {
      return (await res.json()) as Post
    }
  } catch {
    // API unavailable — fall back to bundled markdown
  }
  return getPostBySlug(slug) ?? null
}

export async function fetchPostSummaries(): Promise<Omit<Post, 'content'>[] | null> {
  try {
    const res = await fetch(`${API_BASE}/posts`)
    if (res.ok) {
      return (await res.json()) as Omit<Post, 'content'>[]
    }
  } catch {
    // ignore
  }
  return null
}

export async function fetchComments(slug: string): Promise<Comment[] | null> {
  try {
    const res = await fetch(
      `${API_BASE}/posts/${encodeURIComponent(slug)}/comments`,
    )
    if (res.ok) {
      return (await res.json()) as Comment[]
    }
  } catch {
    // ignore
  }
  return null
}

export async function submitComment(
  slug: string,
  author: string,
  body: string,
): Promise<boolean> {
  try {
    const res = await fetch(
      `${API_BASE}/posts/${encodeURIComponent(slug)}/comments`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, body }),
      },
    )
    return res.status === 202
  } catch {
    return false
  }
}
