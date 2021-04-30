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
          <p className="header__logo">__init__</p>
          <ul className="header__nav">
            {/* <li className="header__nav__item">blog</li>
            <li className="header__nav__item">resume</li> */}
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <aside className="hero__aside">
            <h2 className="hero__greeting">Hi I'm Jesse</h2>
            <p className="hero__description">I'm a software engineer from Lagos, Nigeria</p>
          </aside>
          <aside className="hero__aside">
            <img
              src="https://res.cloudinary.com/dqfjoblug/image/upload/v1619192037/site__hero_rg5gzv.jpg"
              className="hero__image"
            />
          </aside>
        </section>
      </main>
    </div>
  );
}
