import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/navigation/Header';
import Main from '../components/main/Main';
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
      <Main>
        <aside>
          <h2 style={{ fontWeight: 300 }}>Hi I'm Jesse</h2>
          <p>I'm a software engineer from Lagos, Nigeria</p>
        </aside>
        <aside>
          <Image
            src="https://res.cloudinary.com/dqfjoblug/image/upload/v1619192037/site__hero_rg5gzv.jpg"
            width={468}
            height={468}
          />
        </aside>
      </Main>
    </div>
  );
}
