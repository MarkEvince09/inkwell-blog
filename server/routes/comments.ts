import { randomUUID } from 'node:crypto'
import { Router } from 'express'
import { getCachedPost } from '../services/posts.js'
import {
  enqueueComment,
  getCommentsForPost,
  type CommentEvent,
} from '../messaging/commentBus.js'

export const commentsRouter = Router({ mergeParams: true })

commentsRouter.get('/', (req, res) => {
  const slug = req.params.slug as string
  if (!getCachedPost(slug)) {
    res.status(404).json({ error: 'Post not found' })
    return
  }
  res.json(getCommentsForPost(slug))
})

commentsRouter.post('/', (req, res) => {
  const slug = req.params.slug as string
  if (!getCachedPost(slug)) {
    res.status(404).json({ error: 'Post not found' })
    return
  }

  const author = String(req.body?.author ?? '').trim()
  const body = String(req.body?.body ?? '').trim()

  if (!author || !body) {
    res.status(400).json({ error: 'Author and body are required' })
    return
  }

  const event: CommentEvent = {
    id: randomUUID(),
    postSlug: slug,
    author,
    body,
    createdAt: new Date().toISOString(),
  }

  enqueueComment(event)
  res.status(202).json({ accepted: true, id: event.id })
})
