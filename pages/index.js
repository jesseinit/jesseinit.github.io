import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/navigation/Header';
import NavBar from '../components/navigation/NavBar';
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Jesse Egbosionu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <NavBar />
      </Header>
      <main>
        <h2>Hi I'm Jesse</h2>
        <Image
          src="https://res.cloudinary.com/dqfjoblug/image/upload/v1619192037/site__hero_rg5gzv.jpg"
          width={468}
          height={468}
          // className={styles.hero__img}
        />
        <p>I'm a software engineer from Lagos, Nigeria</p>
      </main>
    </div>
  );
}
