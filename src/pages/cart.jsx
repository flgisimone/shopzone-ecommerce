import { useEffect, useState } from 'react'
import Head from 'next/head';
import { useGlobalContext } from '@/context'
import Link from 'next/link';
import Image from 'next/image';

import Searchbar from '@/components/Searchbar/Searchbar';
import FavoriteProduct from '@/components/FavoriteProduct/FavoriteProduct';

import { IoIosArrowDroprightCircle } from 'react-icons/io';

import styles from "../styles/Cart.module.scss"

const Cart = () => {
  
  const {
    cart, setCart,
    favorites, setFavorites,
    searchValue 
  } = useGlobalContext()
    
    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [quantity, setQuantity] = useState([])
    const [savedCart] = useState([])   
    
    useEffect(() => {
      for(const key in localStorage){
        if(key.startsWith("CartProduct")){
          const productData = JSON.parse(localStorage.getItem(key))
          savedCart.push(productData)
        }
      }
      setCart(savedCart)
    }, [setCart])
    
    useEffect(() => {
      let sum = 0
      cart.forEach(product => {
        const quantity = product.quantity || 1
        sum += product.price * quantity
      })
      setTotal(sum)
      setTax(sum * 0.22)
    }, [cart])
    
    useEffect(() => {
      setQuantity(cart.map((product) => product.quantity || 1))
    }, [cart])

    const onHandleQuantity = (productId, e) => {
      const newCart = [...cart]
      const index = newCart.findIndex((product) => product.title === productId)
      newCart[index].quantity = e.target.value
      setCart([...newCart])
      
      localStorage.setItem(
        `CartProduct: ${productId}`,
        JSON.stringify({
          ...cart[index],
          quantity: e.target.value,
        }
        )
      )
    }
    
    const onHandleRemove = (productRemove) => {
      for(const key in localStorage){
        if(key === `CartProduct: ${productRemove.title}` || key === `CartProduct: ${productRemove.id}`)
        {
          localStorage.removeItem(key)
        }
      }
      setCart((prevCart) => prevCart.filter((product) => product.id !== productRemove.id))
    }

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

    useEffect(() => {
      localStorage.setItem("TotalCart", (total + tax)?.toFixed(2))
    }, [total])
    
    const onHandleCheckout = () =>  localStorage.setItem('OrderCart', JSON.stringify(cart)) 

  return (
    <>
    <Head>
      <title>Cart | Shopzone - Ecommerce</title>
      <meta name="description" content="Cart | Shopzone - Ecommerce" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>    
    <section className={styles.Cart}>
      <h1>Your Cart</h1>
      {
      cart.length > 0 ? (
        <div className={styles.containerCart}>
          <div className={styles.containerProduct}>
            {
              cart.map(product =>
                <div className={styles.infoProductCart} key={product.id}>
                  <Image
                  src={product.image}
                  width={50}
                  height={50}
                  alt={product.title} 
                  onClick={() => window.location.href =`/product/${product.id}`}
                  />
                  <Link href={`/product/${product.id}`} as={`/product/${product.id}`} title={product.title}>{product.title} </Link>
                  <span>{product.price}$</span>
                  <input type="number" 
                    id={`quantity-${product.id}`} 
                    name={`quantity-${product.id}`} 
                    min="1" max="99" 
                    value={Array.isArray(quantity) && quantity.find((q, i) => cart[i].id === product.id)}
                    onChange={(e) => onHandleQuantity(product.title, e)} />
                  <button className={styles.btnRemoveProduct} onClick={() => onHandleRemove(product)}>X</button>                  
                </div>)
              } 
            </div>
            <div className={styles.totalCart}>
              <span>Total {"(TAX incl. 22%)"} </span>
              <h2>{(total + tax)?.toFixed(2)}$</h2>
              <Link href={"/checkout"} onClick={onHandleCheckout}>Go to Checkout <IoIosArrowDroprightCircle color="white" fill="white"/></Link>
            </div>   
        </div>       
      ) : 
      (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      )
      }
      <div className={styles.wishlistProducts}>
        <h3>Your Wishlist</h3>
        <Searchbar />
        {
          favorites.length > 0 ? 
          <div className={styles.listFavorite}>

            {
              favorites?.
              filter(product => product?.title?.toLowerCase().includes(searchValue?.toLowerCase()))
              .map((product) => 
              <div className={styles.product} key={product.id}>
                <FavoriteProduct data={product}/>
              </div>
              )
            }
          </div>
        :
        <p>Your wishlist is empty.</p> 
        }
      </div> 
    </section>
    </>
  )
}

export default Cart