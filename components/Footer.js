export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Built with <span className="heart">❤️</span> and Amara Chukwu
        </p>
        <p className="footer-year">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
