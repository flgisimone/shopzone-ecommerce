/**
 * This dynamic page shows the details of an individual product. 
 * The data is retrieved via API calls, using getStaticPath and getStaticProps to statically render the product data. 
 * 
 * The component shows the image, title, description, category, price, and a button to add or remove the product from favorites.
 */

import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';

import { AiFillHeart, AiOutlineHeart, AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillPeopleFill, BsStarFill, BsStarhalf, BsStar } from 'react-icons/bs';

import styles from "./styles.module.scss"

const SingleProduct = ({productData}) => {
  
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
      const key = `FavoriteProduct: ${productData?.title}`
      const value = localStorage.getItem(key)
      if (value) {
          setFavorite(true)
        }
  }, [productData?.title])

  const onToggleFavorite = () => {
    const key = `FavoriteProduct: ${productData?.title}`
    const value = localStorage.getItem(key);
    if (value) {
        localStorage.removeItem(key);
        setFavorite(false);
      } else {
        const value = JSON.stringify(productData);
        localStorage.setItem(key, value);
        setFavorite(true);
      }
  }

  const starCreator = (num) => {
    return Array.from({length: 5}, (_, index) => {
      if(num >= index + 1) return <BsStarFill key={index} className={styles.star} fill="#fca903"/>
      if (num >= index + 0.5) return <BsStarhalf key={index} className={styles.star} fill="#fca903"/>
      return <BsStar key={index} className={styles.star} fill="#fca903"/>
    })
  }

  return (
    <>
    <Head>
        <title>{productData?.title}</title>
        <meta name="description" content={productData?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <section className={styles.SingleProduct}>
      <Link href={"/products"}><AiOutlineArrowLeft/></Link>
      <div className={styles.containerProduct}>
        <Image 
        src={productData.image?.includes("https://") ? productData?.image : "https://i.postimg.cc/9XNt59Zb/Image-not-available.png"}
        width={400}
        height={200}
        alt={productData?.title}/>
        <div className={styles.infoProduct}>
          <h1>{productData?.title}</h1>
          <div className={styles.containerDescription}>
            <h4>Description</h4>
            <p>{productData?.description}</p>
          </div>
          <div className={styles.rating}>
            <span className={styles.rate}>{starCreator(Math.round(productData?.rating?.rate))}</span>
            <span className={styles.count}><BsFillPeopleFill />{productData?.rating?.count}</span>
          </div>
          <div className={styles.price_wishlist}>
            <span>{productData?.price + "$"}</span>
            <button onClick={onToggleFavorite} >
                {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>
          <div className={styles.infoCategory}>
            <span>Category product: {productData?.category}</span>
            <span>ID product: {productData?.id}</span>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default SingleProduct

export async function getStaticPaths() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
  
    const paths = data?.map((product) => ({
      params: { id: product.id.toString() },
    }));
  
    return { paths, fallback: true };
  }

  export async function getStaticProps({ params }) {
    
    const resProduct = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  
    const productData = await resProduct.json();
  
    return {
      props: {
        productData
      },
    };
  }