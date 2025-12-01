import Link from 'next/link';

export default function Header({ showNavLinks = true }) {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <Link href="/">
            <span className="logo-text">JE</span>
          </Link>
        </div>
        {showNavLinks && (
          <div className="nav-links">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/rates" className="nav-link cta">
              Rates
            </Link>
          </div>
        )}
        {!showNavLinks && (
          <div className="nav-links">
            <a href="mailto:me@jesseinit.dev" className="nav-link cta">
              Get in touch
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
