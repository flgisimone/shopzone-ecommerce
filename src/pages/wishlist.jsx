import Head from 'next/head';
import { useEffect } from 'react'
import { useGlobalContext } from '@/context';

import Product from '@/components/Product/Product'
import styles from "../styles/Wishlist.module.scss"

import { BsFillTrashFill } from 'react-icons/bs';

const Wishlist = () => {

  const { favorites, setFavorites } = useGlobalContext()
  
  useEffect(() => {
    const savedFavorite = []
    for(const key in localStorage){
      if(key.startsWith("FavoriteProduct")){
        const productData = JSON.parse(localStorage.getItem(key))
        savedFavorite.push(productData)
      }
    }
    setFavorites(savedFavorite)
  }, [])

  const onHandleRemove = (productRemove) => {
    for (const key in localStorage) {
      if(key === `FavoriteProduct: ${productRemove.title}`){
        localStorage.removeItem(key)
      }
    }
    setFavorites((prevFavorites) =>
      prevFavorites.filter((product) => product.id !== productRemove.id)
    )
  }

  const onClickRemove = () => {
    for (const key in localStorage) {
      if (key.startsWith("FavoriteProduct:")) {
        localStorage.removeItem(key);
        location.reload()
      }
    }
  }

  return (
    <>
    <Head>
      <title>Wishlist | Shopzone - Ecommerce</title>
      <meta name="description" content="Wishlist | Shopzone - Ecommerce" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header className={styles.Wishlist}>
      <div className={styles.wishlistHeader}>
        <h2>Wishlist</h2>
        <div className={styles.containerBtn}>
          <button onClick={onClickRemove}>Clear</button>
          <button onClick={() => location.reload()}>Update</button>
        </div>
      </div>
      {
        favorites.length > 0 ? (
          <div className={styles.containerProduct}>
            {
              favorites.map((product) => 
              <div className={styles.product} key={product.id}>
                <Product data={product}/>
                <button onClick={() => onHandleRemove(product)} className={styles.btnRemove}>Remove Product <BsFillTrashFill /> </button>
              </div>)
            }
          </div>
        ) : (
        <div className={styles.emptyList}>
          <span>Wishlist Empty</span>
        </div>
        )
      }
    </header>
    </>
  )
}

export default Wishlist