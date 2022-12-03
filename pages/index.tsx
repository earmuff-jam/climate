import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Item Climate Statistics</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Currently, under active development.
        </h1>
        <h2>
          Climate is designed to aide you with your item management.
        </h2>
        <p className={styles.description}>
          Revisit us soon, for more updates.
        </p>
        <p className={styles.subscribeText}>
          You can even
          <Link href="/subscribe"> subscribe for updates.</Link>
        </p>
        <p className={styles.subscribeText}>
          Not satisfied yet !? You can also
          <Link href="/requestFeatures"> request features ... </Link>
        </p>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
