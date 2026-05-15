import { commentsKey, postCache } from '../cache/postCache.js'

export interface CommentEvent {
  id: string
  postSlug: string
  author: string
  body: string
  createdAt: string
}

export type Comment = CommentEvent

const TOPIC = 'post-comments'
const queue: CommentEvent[] = []
let consumerStarted = false

function processEvent(event: CommentEvent): void {
  const serialized = JSON.stringify(event)
  postCache.appendToList(commentsKey(event.postSlug), serialized)
}

export function enqueueComment(event: CommentEvent): void {
  queue.push(event)
  console.log(`[${TOPIC}] enqueued comment ${event.id} for ${event.postSlug}`)
}

export function startCommentConsumer(): void {
  if (consumerStarted) return
  consumerStarted = true

  setInterval(() => {
    while (queue.length > 0) {
      const event = queue.shift()!
      processEvent(event)
      console.log(`[${TOPIC}] processed comment ${event.id}`)
    }
  }, 50)
}

export function getCommentsForPost(slug: string): Comment[] {
  return postCache
    .getList(commentsKey(slug))
    .map((raw) => JSON.parse(raw) as Comment)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}
