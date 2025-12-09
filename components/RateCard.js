export default function RateCard({ provider, rate, href, isBest, index, formatCurrency, logo }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`rate-card ${isBest ? 'best' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="rate-card-header">
        <div className="provider-info">
          {logo && (
            <img
              src={logo}
              alt={`${provider} logo`}
              className="provider-logo"
            />
          )}
          <h3 className="provider-name">{provider}</h3>
        </div>
        {isBest && <span className="best-badge">Best Rate</span>}
      </div>

      <div className="rate-value">{formatCurrency(rate)}</div>

      <div className="rate-card-footer">
        <span className="visit-link">Visit provider →</span>
      </div>
    </a>
  );
}
