import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jesse Egbosionu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Hi I'm Jesse</h1>
        <Image
          src="https://res.cloudinary.com/dqfjoblug/image/upload/v1619192037/site__hero_rg5gzv.jpg"
          width={468}
          height={468}
          className={styles.hero__img}
        />
        <p>I'm a software engineer from Lagos, Nigeria</p>
      </main>
    </div>
  );
}
