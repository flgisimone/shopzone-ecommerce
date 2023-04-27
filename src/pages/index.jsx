import Head from 'next/head'
import Link from 'next/link'

import Hero from '@/components/Hero/Hero'
import CategoryList from '@/components/CategoryList/CategoryList'
import TopProducts from '@/components/TopProducts/TopProducts'

import styles from '@/styles/Home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Shopzone - Ecommerce</title>
        <meta name="description" content="Home | Shopzone - Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Hero />
        <section className={styles.goToPage}>
          <Link href={"/wishlist"}>
            <div className={styles.pageFavorite}>
              <h2>GO TO WISHLIST</h2>
            </div>
          </Link>
          <Link href={"/contact"}>
            <div className={styles.pageContact}>
              <h2>CONTACT US</h2>
            </div>          
          </Link>
        </section>
        <section className={styles.categoriesHome}>
          <CategoryList />
        </section>
        <section className={styles.bottomHero}>
          <h2>Lorem ipsum dolor sit amet</h2>
        </section>
      </main>
    </>
  )
}
