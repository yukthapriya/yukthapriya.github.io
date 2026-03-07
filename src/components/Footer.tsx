export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container footer-inner">
        <p>
          © {year}{' '}
          <a href="/" className="footer-name">
            Yuktha Priya Masupalli
          </a>{' '}
          — Software Engineer · ML · Data
        </p>
        <p className="footer-built">
          Built with{' '}
          <span aria-label="React">
            <i className="fab fa-react" aria-hidden="true" /> React
          </span>{' '}
          +{' '}
          <span aria-label="TypeScript">
            <i className="fas fa-code" aria-hidden="true" /> TypeScript
          </span>{' '}
          · Deployed via GitHub Actions
        </p>
        <div className="social-footer" role="list" aria-label="Social links">
          <a
            href="https://github.com/yukthapriya"
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label="GitHub profile"
          >
            <i className="fab fa-github" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/yukthapriya"
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label="LinkedIn profile"
          >
            <i className="fab fa-linkedin" aria-hidden="true" />
          </a>
          <a
            href="https://scholar.google.com/citations?hl=en&user=UkX-bOYAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label="Google Scholar profile"
          >
            <i className="fas fa-graduation-cap" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
