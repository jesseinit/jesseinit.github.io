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
            <a href="https://twitter.com/jesseinit">__init__</a>
          </p>
          <ul className="header__nav">
            {/* <li className="header__nav__item">blog</li>
            <li className="header__nav__item">resume</li> */}
          </ul>
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
              I'm a fullstack (backend focused) software engineer from Lagos, Nigeria, still living
              in Nigeria. The vast majority of my career have been spent understanding and
              proactively leveraging technology to impact lives positively far beyond the shores of
              my environment.
            </p>

            <p className="hero__description">
              In the last 3 years I've been building services and products in the finance, ecommerce
              and health space, enriching lifes using technologies like Python(Django, Flask,
              FastAPI), Javascript(React, Node.js), PostgreSQL, Docker, Redis etc.
            </p>

            <p className="hero__description">
              I'm constantly looking for challenging and impactful opportunities so can always shoot
              me an{' '}
              <a className="text-underline" href="mailto:jesse.egbosionu@gmail.com">
                email
              </a>
              .
            </p>
          </aside>
          <aside className="hero__aside text-align-center">
            <img
              src="https://res.cloudinary.com/dqfjoblug/image/upload/v1619192037/site__hero_rg5gzv.jpg"
              className="hero__image"
            />
          </aside>
        </section>
      </main>
      <footer className="footer">
        <p className="text-align-center">Made with Awesomeness and ❤️</p>
      </footer>
    </div>
  );
}
