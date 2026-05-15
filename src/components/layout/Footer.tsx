import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>
        &copy; {year} Inkwell. Built with React &amp; Vite.
      </p>
    </footer>
  )
}
