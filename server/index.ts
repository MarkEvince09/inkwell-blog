import cors from 'cors'
import express from 'express'
import { postsRouter } from './routes/posts.js'
import { warmPostCache } from './services/posts.js'

const app = express()
const PORT = Number(process.env.PORT) || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/posts', postsRouter)

async function start() {
  const count = await warmPostCache()
  console.log(`[cache] warmed ${count} posts as JSON strings`)
  app.listen(PORT, () => {
    console.log(`[server] http://localhost:${PORT}`)
  })
}

start().catch((err) => {
  console.error('[server] failed to start', err)
  process.exit(1)
})
