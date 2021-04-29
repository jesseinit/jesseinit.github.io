import Head from 'next/head';
import Header from '../components/navigation/Header';
import NavBar from '../components/navigation/NavBar';
import navStyles from '../components/navigation/navigation.module.css';
import mainStyles from '../components/main/main.module.css';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Home - Jesse Egbosionu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={navStyles.site__header}>
        <nav className={navStyles.site__navbar}>
          <p>__init__</p>
          <ul>
            <li>blog</li>
            <li>resume</li>
          </ul>
        </nav>
      </header>
      <main>
        <section className={mainStyles.hero}>
          <aside>
            <h2 className={mainStyles.hero__greeting}>I'm Jesse</h2>
            <p className={mainStyles.hero__description}>
              I'm a software engineer from Lagos, Nigeria
            </p>
          </aside>
          <aside>
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
