import React from 'react'
import Link from 'next/link'
import Head from 'next/head';

import { AiOutlineArrowLeft, AiOutlineHome } from 'react-icons/ai';

import styles from "../styles/404.module.scss"

const Page404 = () => {
  return (
    <>
    <Head>
      <title>404 Not Found | TLG Recruiting FE Homework</title>
      <meta name="description" content="Products | TLG Recruiting FE Homework" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.page404}>
        <h2>404</h2>
        <h1>PAGE NOT FOUND</h1>
        <Link href={"/"}><AiOutlineHome/><AiOutlineArrowLeft />Back to HOME</Link>
    </div>    
    </>
  )
}

export default Page404