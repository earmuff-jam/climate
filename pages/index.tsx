import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import HomePage from '../containers/HomeContainer/HomePage';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Item Climate Statistics</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HomePage />
      </main>
    </div>
  )
}
