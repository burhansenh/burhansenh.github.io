import { Outlet, Link, useLocation } from 'react-router-dom'

export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const navLinks = [
    { to: '/experience', label: 'Experience' },
    { to: '/projects', label: 'Projects' },
    { to: '/about', label: 'About' },
  ]

  return (
    <>
      {!isHome && (
        <header className="site-header">
          <div className="container header-inner">
            <Link to="/" className="logo">Burhan Kara</Link>
            <nav>
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={pathname.startsWith(to) ? 'active' : ''}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
      )}

      <main>
        <Outlet />
      </main>

      {!isHome && (
        <footer className="site-footer">
          <div className="container">
            <p>&copy; 2026 Burhan Kara</p>
          </div>
        </footer>
      )}
    </>
  )
}
