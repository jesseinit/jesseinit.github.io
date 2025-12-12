export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Built with <span className="heart">❤️</span>
        </p>
        <p className="footer-year">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
