import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title, description, showNavLinks = true }) {
  return (
    <div className="container">
      <Head>
        <title>{title || 'Jesse Egbosionu - Software Engineer'}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={description || 'Software engineer based in Amsterdam, focused on building scalable backend systems.'}
        />
      </Head>

      <Header showNavLinks={showNavLinks} />

      <main className="main-content">{children}</main>

      <Footer />
    </div>
  );
}
