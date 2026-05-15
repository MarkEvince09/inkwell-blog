import { NavLink } from 'react-router-dom'
import './Header.css'

export function Header() {
  return (
    <header className="site-header">
      <NavLink to="/" className="site-logo">
        Inkwell
      </NavLink>
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>
          Blog
        </NavLink>
      </nav>
    </header>
  )
}
