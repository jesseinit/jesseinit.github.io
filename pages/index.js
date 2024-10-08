import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Home - Jesse Egbosionu</title>
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
        <section className="hero">
          <aside className="hero__aside">
            <h2 className="hero__author_name">Jesse Egbosionu</h2>
            <section className="hero__links">
              <a href="https://github.com/jesseinit" rel="noopener" alt="GitHub">
                GitHub
              </a>
              <span> · </span>
              <a href="https://linkedin.com/in/jesse-egbosionu/" rel="noopener" alt="Linkedin">
                LinkedIn
              </a>
              <span> · </span>
              <a href="https://twitter.com/jesseinit/" rel="noopener" alt="Twitter">
                Twitter
              </a>
            </section>
            <p className="hero__description">
              I'm a software engineer based in Amsterdam, Netherlands and currently focused in building and scaling
              software backends. Creating impact, team-work and continuous learning are some of my core
              tenets and I continuously adapt these in solving customers problems when I build
              software.
            </p>

            <p className="hero__description">
              In the last 5 years I've been building services and products in the finance, ecommerce
              and logistics domain, enriching lives using technologies like Python(Django,
              FastAPI), Javascript(React, Node.js), PostgreSQL, Docker, Redis, Kubernetes etc.
            </p>

            <p className="hero__description">
              I'm constantly looking for challenging and impactful opportunities so can always shoot
              me an{' '}
              <a className="text-underline email-cta" href="mailto:me@jesseinit.dev">
                email
              </a>
              .
            </p>
          </aside>
          <aside className="hero__aside text-align-center">
            <img
              src="hero.jpg"
              className="hero__image"
            />
          </aside>
        </section>
      </main>
      <footer className="footer">
        <p className="text-align-center">Made with <span style={{ "color": "red" }}>❤️</span> and Vibes</p>
      </footer>
    </div >
  );
}
