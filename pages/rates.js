import Head from 'next/head';
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/api';

export default function Rates() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const apiData = await fetchData();

                setData(apiData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataFromApi();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(value);
    };

    // Your UI rendering logic here, using the 'data' state
    return (
        <div className="container">
            <Head>
                <title>EUR Rates</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="header">
                <nav className="header__navbar">
                    <p className="header__logo">
                        <a href="https://twitter.com/jesseinit">init</a>
                    </p>
                </nav>
            </header>
            <main>
                <h2>For €1 you'll get the following rates</h2>
                <section className="hero">
                    {data && (
                        <div>
                            <p>Send: {formatCurrency(data.send)}</p>
                            <p>TapTap: {formatCurrency(data.tap)}</p>
                            <p>AceTransfer: {formatCurrency(data.ace)}</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
