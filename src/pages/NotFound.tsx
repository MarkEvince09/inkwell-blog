import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import './NotFound.css'

export function NotFound() {
  usePageTitle('Page not found')

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go home</Link>
    </div>
  )
}
