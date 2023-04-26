import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from "next/link"

import { 
  BsFillPeopleFill,
  BsCart, BsCartCheckFill, 
  BsHeart, BsFillHeartFill } from 'react-icons/bs';

  import {
    RiStarFill, RiStarHalfFill, RiStarLine
  } from 'react-icons/ri'

import styles from "./styles.module.scss"

const SliderProduct = ({data}) => {

    const [favorite, setFavorite] = useState(false)
    const [cart, setCart] = useState(false)

    const starCreator = (num) => {
      return Array.from({length: 5}, (_, index) => {
        if(num >= index + 1) return <RiStarFill key={index} className={styles.star} fill="#fca903"/>
        if (num >= index + 0.5) return <RiStarHalfFill key={index} className={styles.star} fill="#fca903"/>
        return <RiStarLine key={index} className={styles.star} fill="#fca903"/>
      })
    }

    //aggiunta al localStorage per favoriti
    useEffect(() => {
        const key = `FavoriteProduct: ${data?.title}`
        const value = localStorage.getItem(key)
        if (value) {
            setFavorite(true)
          }
    }, [data?.title])

    const onToggleFavorite = () => {
        const key = `FavoriteProduct: ${data?.title}`
        const value = localStorage.getItem(key)
        if (value) {
            localStorage.removeItem(key)
            setFavorite(false)
          } else {
            const value = JSON.stringify(data)
            localStorage.setItem(key, value)
            setFavorite(true)
          }
    }
    //--------------------------------

    //Logica aggiunta al localStorage per carrello
    useEffect(() => {
      const key = `CartProduct: ${data?.title}`
      const value = localStorage.getItem(key)
      if (value) {
        setCart(true)
      }
    }, [data?.title])

    const onToggleCart = () => {
      const key = `CartProduct: ${data?.title}`
      const value = localStorage.getItem(key)
      if (value) {
          localStorage.removeItem(key)
          setCart(false)
        } else {
          const value = JSON.stringify(data)
          localStorage.setItem(key, value)
          setCart(true)
        }
    }  
    //--------------------------------

  return (
    <div className={styles.Product}>
      <Link 
        href={`/product/${data.id}`}
        as={`/product/${data.id}`}
      >
        <Image 
          src={data?.image?.includes("https://") ? data?.image : "https://i.postimg.cc/9XNt59Zb/Image-not-available.png"}
          width={640}
          height={480}
          alt={data?.title}/>
      </Link>
      <div className={styles.containerInfoProduct}>
        <div className={styles.infoProduct}>
          <Link 
            href={`/product/${data.id}`}
            as={`/product/${data.id}`}
          >
            <h2 title={data?.title}>{data?.title}</h2>
          </Link>
          <Link 
            href={`/product/${data.id}`}
            as={`/product/${data.id}`}
          >
            <p title={data?.description}>{data?.description}</p>
          </Link>
        </div>
        <Link href="/" className={styles.categoryProduct}>Category 
          <span>
            {data?.category}
          </span>
        </Link>
        <div className={styles.rating}>
          <span className={styles.rate}>{starCreator(Math.round(data?.rating?.rate))}</span>
          <span className={styles.count}><BsFillPeopleFill />{data?.rating?.count}</span>
        </div>
        <div className={styles.actionProduct}>
          <span>{data?.price + "$"}</span>
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
  )
}

export default SliderProduct