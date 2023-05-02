import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'

import { AiOutlineArrowLeft } from 'react-icons/ai';

import { BsFillPeopleFill,
  BsCartCheckFill, BsCart, 
  BsHeart, BsFillHeartFill } from 'react-icons/bs';

  import {
    RiStarFill, RiStarHalfFill, RiStarLine
  } from 'react-icons/ri'

import styles from "./styles.module.scss"

const SingleProduct = ({productData}) => {
  
  const [favorite, setFavorite] = useState(false)
  const [cart, setCart] = useState(false)

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

  useEffect(() => {
    const key = `CartProduct: ${productData?.title}`
    const value = localStorage.getItem(key)
    if (value) {
      setCart(true)
    }
  }, [productData?.title])

  const onToggleCart = () => {
    const key = `CartProduct: ${productData?.title}`
    const value = localStorage.getItem(key)
    if (value) {
        localStorage.removeItem(key)
        setCart(false)
      } else {
        const value = JSON.stringify(productData)
        localStorage.setItem(key, value)
        setCart(true)
      }
  }  

  const onHandlePage = () => {
    if(productData?.category === "electronics") window.location.href = "/electronics"
    if(productData?.category === "jewelery") window.location.href = "/jewelery"
    if(productData?.category === "men's clothing") window.location.href = "/mens-clothing"
    if(productData?.category === "women's clothing") window.location.href = "/womens-clothing"
  }

  const starCreator = (num) => {
    return Array.from({length: 5}, (_, index) => {
      if(num >= index + 1) return <RiStarFill key={index} className={styles.star} fill="#fca903"/>
      if (num >= index + 0.5) return <RiStarHalfFill key={index} className={styles.star} fill="#fca903"/>
      return <RiStarLine key={index} className={styles.star} fill="#fca903"/>
    })
  }

  return (
    <>
    <Head>
        <title>{productData?.title + " - Shopzone Ecommerce"}</title>
        <meta name="description" content={productData?.description + "Shopzone Ecommerce"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <section className={styles.SingleProduct}>
      <button onClick={onHandlePage}><AiOutlineArrowLeft/></button>
      <div className={styles.containerProduct}>
        <Image 
        src={productData?.image?.includes("https://") ? productData?.image : "https://i.postimg.cc/9XNt59Zb/Image-not-available.png"}
        width={400}
        height={200}
        alt={productData?.title}/>
        <div className={styles.infoProduct}>
          <div className={styles.infoCategory}>
            <span>Category product: {productData?.category}</span>
            <span>ID product: {productData?.id}</span>
          </div>
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
            <div className={styles.containertn}>
              <button onClick={onToggleCart} >
                {cart ? <BsCartCheckFill /> : <BsCart />}
              </button>
              <button onClick={onToggleFavorite} >
                {favorite ? <BsFillHeartFill /> : <BsHeart />}
              </button>
            </div>
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