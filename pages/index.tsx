import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HomePage from '../containers/HomeContainer/HomePage';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PropertyCo</title>
        <meta name="description" content="Property Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HomePage />
      </main>
    </div>
  )
}
