import Head from 'next/head';
import { useState, useEffect } from 'react';

import { BsBagCheckFill } from 'react-icons/bs';

import styles from "../styles/Thankyoupage.module.scss"

const Thankyoupage = () => {

  const [count, setCount] = useState(5);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
      setRedirect(true);
      window.location.href = '/'
    }

    return () => clearInterval(interval)
  }, [count])

  return (
    <>
    <Head>
      <title>Thank You | Shopzone - Ecommerce</title>
      <meta name="description" content="Thank You | Shopzone - Ecommerce" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>        
    <div className={styles.Thankyoupage}>
      <h1>Purchase made</h1>
      <BsBagCheckFill color="#FF7A00" fill="#FF7A00"/>
      <p>{`Redirecting in ${count} seconds...`}</p>
    </div>
    </>
  )
}

export default Thankyoupage