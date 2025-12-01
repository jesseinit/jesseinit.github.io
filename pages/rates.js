import Head from "next/head";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";

export default function Rates() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const apiData = await fetchData();
                setData(apiData);
                setError(null);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load exchange rates. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchDataFromApi();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
        }).format(value);
    };

    const getBestRate = () => {
        if (!data || data.length === 0) return null;
        return Math.max(...data.map(item => item.rate));
    };

    const bestRate = getBestRate();

    const sortedData = data ? [...data].sort((a, b) => {
        const aIsBest = a.bestRate || a.rate === bestRate;
        const bIsBest = b.bestRate || b.rate === bestRate;
        if (aIsBest && !bIsBest) return -1;
        if (!aIsBest && bIsBest) return 1;
        return b.rate - a.rate;
    }) : null;

    return (
        <div className="container">
            <Head>
                <title>EUR to NGN Exchange Rates - Jesse Egbosionu</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Compare live EUR to NGN exchange rates across multiple providers." />
            </Head>

            <header className="header">
                <nav className="navbar">
                    <div className="logo">
                        <a href="/">
                            <span className="logo-text">JE</span>
                        </a>
                    </div>
                    <div className="nav-links">
                        <a href="/" className="nav-link">Home</a>
                        <a href="/rates" className="nav-link cta">Rates</a>
                    </div>
                </nav>
            </header>

            <main className="main-content">
                <section className="rates-section">
                    <div className="rates-header">
                        <div className="rates-title-group">
                            <h1 className="rates-title">Exchange Rates</h1>
                            <p className="rates-subtitle">
                                Compare live EUR to NGN rates across providers
                            </p>
                        </div>

                        <div className="currency-display">
                            <div className="currency-badge">
                                <span className="currency-from">€1 EUR</span>
                                <span className="currency-arrow">→</span>
                                <span className="currency-to">NGN</span>
                            </div>
                        </div>
                    </div>

                    {loading && (
                        <div className="rates-grid">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="rate-card skeleton">
                                    <div className="skeleton-header"></div>
                                    <div className="skeleton-rate"></div>
                                    <div className="skeleton-badge"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {error && (
                        <div className="error-state">
                            <div className="error-icon">⚠️</div>
                            <h3 className="error-title">Unable to load rates</h3>
                            <p className="error-message">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="retry-button"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {!loading && !error && sortedData && sortedData.length > 0 && (
                        <>
                            <div className="rates-grid">
                                {sortedData.map((item, index) => (
                                    <a
                                        key={item.provider}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`rate-card ${item.bestRate || item.rate === bestRate ? 'best' : ''}`}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="rate-card-header">
                                            <h3 className="provider-name">{item.provider}</h3>
                                            {(item.bestRate || item.rate === bestRate) && (
                                                <span className="best-badge">Best Rate</span>
                                            )}
                                        </div>

                                        <div className="rate-value">
                                            {formatCurrency(item.rate)}
                                        </div>

                                        <div className="rate-card-footer">
                                            <span className="visit-link">
                                                Visit provider →
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="rates-info">
                                <p className="info-text">
                                    Rates are updated regularly. Click on a provider to visit their website.
                                </p>
                                <p className="info-timestamp">
                                    Last updated: {new Date().toLocaleString('en-GB', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short'
                                    })}
                                </p>
                            </div>
                        </>
                    )}

                    {!loading && !error && (!data || data.length === 0) && (
                        <div className="empty-state">
                            <div className="empty-icon">📊</div>
                            <h3 className="empty-title">No rates available</h3>
                            <p className="empty-message">
                                We couldn't find any exchange rates at the moment.
                            </p>
                        </div>
                    )}
                </section>
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <p>Built with <span className="heart">❤️</span> and Amara Chukwu</p>
                    <p className="footer-year">© {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    );
}
