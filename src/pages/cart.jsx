import React, {useEffect, useState} from 'react'
import { useGlobalContext } from '@/context'
import Link from 'next/link';
import Image from 'next/image';

import { IoIosArrowDroprightCircle } from 'react-icons/io';

import styles from "../styles/Cart.module.scss"

const Cart = () => {

    const { cart, setCart } = useGlobalContext()

    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0);
    const [quantity, setQuantity] = useState({})   

    useEffect(() => {
        const savedCart = []
        for(const key in localStorage){
          if(key.startsWith("CartProduct: ")){
            const productData = JSON.parse(localStorage.getItem(key))
            savedCart.push(productData)
          }
        }
        setCart(savedCart)
      }, [])

      useEffect(() => {
        let sum = 0;
        cart.forEach(product => {
          const quantity = product.quantity || 1
          sum += product.price * quantity
        });
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
          })
        )
      }

      const onHandleRemove = (productRemove) => {
        for (const key in localStorage) {
          if(key === `CartProduct: ${productRemove.title}` || key === `CartProduct: ${productRemove.id}`){
            localStorage.removeItem(key);
          }
        }
        setCart((prevCart) =>
        prevCart.filter((product) => product.id !== productRemove.id)
        );
      }

      localStorage.setItem("TotalCart", (total + tax)?.toFixed(2))

  return (
    <section className={styles.Cart}>
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <div className={styles.containerCart}>
          <div className={styles.infoProductCart}>
            <div className={styles.imageProduct}>
              {
                cart.map(product =>
                  <div className={styles.product} key={product.id}>
                    <Image
                    src={product.image}
                    width={50}
                    height={50}
                    alt={product.title} 
                    />
                  </div>)
              } 
            </div>
            <div className={styles.nameProduct}>
              {
                cart.map(product =>
                  <div className={styles.product} key={product.id}>
                    <Link href={`/product/${product.id}`} as={`/product/${product.id}`} >{product.title} </Link>
                  </div>)
              } 
              </div>
              <div className={styles.priceProduct}>
                {
                  cart.map(product => 
                  <div className={styles.product} key={product.id}>
                    <span>{product.price}$</span>
                  </div>)
                } 
              </div>
              <div className={styles.quantityProduct}>
                {
                  cart.map(product => 
                  <div className={styles.product} key={product.id}>
                      <input 
                      type="number" 
                      id={`quantity-${product.id}`} 
                      name={`quantity-${product.id}`} 
                      min="1" max="99" 
                      value={quantity.find((q, i) => cart[i].id === product.id)} 
                      onChange={(e) => onHandleQuantity(product.title, e)}></input>
                  </div>)
                  } 
              </div>
              <div className={styles.removeProduct}>
                {
                  cart.map(product => 
                  <div className={styles.product} key={product.id}>
                    <button className={styles.btnRemoveProduct} onClick={() => onHandleRemove(product)}>X</button>
                  </div>)
                } 
              </div>               
            </div>
            <div className={styles.totalCart}>
              <span>Total {"(TAX incl. 22%)"} </span>
              <h2>{(total + tax)?.toFixed(2)}$</h2>
              <Link href={"/checkout"}>Go to Checkout <IoIosArrowDroprightCircle color="white" fill="white"/></Link>
            </div>   
        </div>       
      ) : 
      (
        <p>Your cart is empty.</p>
      )
    }
    </section>
  )
}

export default Cart