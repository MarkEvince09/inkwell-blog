import { Router } from 'express'
import { getCachedPost, getCachedPostSummaries } from '../services/posts.js'

export const postsRouter = Router()

postsRouter.get('/', (_req, res) => {
  res.json(getCachedPostSummaries())
})

postsRouter.get('/:slug', (req, res) => {
  const post = getCachedPost(req.params.slug)
  if (!post) {
    res.status(404).json({ error: 'Post not found' })
    return
  }
  res.json(post)
})
