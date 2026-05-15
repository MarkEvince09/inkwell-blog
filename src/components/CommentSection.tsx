import { useEffect, useState } from 'react'
import { fetchComments, submitComment, type Comment } from '../lib/api'
import './CommentSection.css'

interface CommentSectionProps {
  postSlug: string
}

export function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [author, setAuthor] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    function poll() {
      void fetchComments(postSlug).then((data) => {
        setComments(data ?? [])
        setLoading(false)
      })
    }
    const initial = window.setTimeout(poll, 0)
    const interval = window.setInterval(poll, 2000)
    return () => {
      window.clearTimeout(initial)
      window.clearInterval(interval)
    }
  }, [postSlug])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!author.trim() || !body.trim()) return

    setStatus('sending')
    const ok = await submitComment(postSlug, author.trim(), body.trim())
    if (ok) {
      setBody('')
      setStatus('sent')
      window.setTimeout(() => setStatus('idle'), 2000)
      window.setTimeout(() => {
        void fetchComments(postSlug).then((data) => setComments(data ?? []))
      }, 300)
    } else {
      setStatus('error')
    }
  }

  return (
    <section className="comments content-panel" aria-label="Comments">
      <h2 className="comments__title">Comments ({comments.length})</h2>

      <form className="comments__form" onSubmit={handleSubmit}>
        <label className="comments__label">
          Name
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            required
            maxLength={80}
          />
        </label>
        <label className="comments__label">
          Comment
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your thoughts…"
            required
            rows={3}
            maxLength={2000}
          />
        </label>
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Post comment'}
        </button>
        {status === 'sent' && (
          <p className="comments__status comments__status--ok">Comment queued successfully.</p>
        )}
        {status === 'error' && (
          <p className="comments__status comments__status--err">
            Could not send comment. Is the API server running?
          </p>
        )}
      </form>

      {loading ? (
        <p className="comments__loading">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="comments__empty">No comments yet. Be the first!</p>
      ) : (
        <ul className="comments__list">
          {comments.map((c) => (
            <li key={c.id} className="comments__item">
              <div className="comments__item-header">
                <strong>{c.author}</strong>
                <time dateTime={c.createdAt}>
                  {new Date(c.createdAt).toLocaleString()}
                </time>
              </div>
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
