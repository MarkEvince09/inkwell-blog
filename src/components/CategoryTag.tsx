import { Link } from 'react-router-dom'
import './CategoryTag.css'

interface CategoryTagProps {
  label: string
  type: 'category' | 'tag'
}

export function CategoryTag({ label, type }: CategoryTagProps) {
  const path = type === 'category' ? `/category/${encodeURIComponent(label)}` : `/tag/${encodeURIComponent(label)}`

  return (
    <Link to={path} className={`pill pill--${type}`}>
      {label}
    </Link>
  )
}
