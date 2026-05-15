import { Link } from 'react-router-dom'
import { getAllPosts } from '../lib/posts'
import { PostList } from '../components/PostList'
import { usePageTitle } from '../hooks/usePageTitle'
import './Home.css'

export function Home() {
  usePageTitle('')
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <div className="home">
      <section className="hero content-panel">
        <p className="hero__eyebrow">Portfolio Blog</p>
        <h1 className="hero__title">Thoughts on code, design, and building on the web.</h1>
        <p className="hero__subtitle">
          A read-only blog built with React, Vite, and markdown — showcasing front-end
          fundamentals for my portfolio.
        </p>
        <Link to="/blog" className="hero__cta">
          Read all posts
        </Link>
      </section>

      <section className="home__latest content-panel">
        <div className="section-header">
          <h2>Latest posts</h2>
          <Link to="/blog" className="section-header__link">
            View all
          </Link>
        </div>
        <PostList posts={latestPosts} />
      </section>
    </div>
  )
}
