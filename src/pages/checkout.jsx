import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import emailjs from '@emailjs/browser';

import styles from "../styles/Checkout.module.scss"

const Checkout = () => {

  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [totalPayment, setTotalPayment] = useState(0)
  const [summaryCart, setSummaryCart] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("")
  const [priceQty, setPriceQty] = useState(0)

  const onHandleName = (e) => setName(e.target.value)
  const onHandleNumber = (e) => setNumber(e.target.value)
  const onHandleExpiry = (e) => setExpiry(e.target.value)
  const onHandleCvc = (e) => setCvc(e.target.value)
  const onHandlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  }

  useEffect(() => {
    const totalPayment = []
    for(const key in localStorage){
      if(key.startsWith("TotalCart")){
        const totalOrder = JSON.parse(localStorage.getItem(key))
        totalPayment.push(totalOrder)
      }
    }
    setTotalPayment(totalPayment)
  }, [])

  useEffect(() => {
    for(const key in localStorage){
      if(key.startsWith("OrderCart")){
        const totalSummary = JSON.parse(localStorage.getItem(key))
        setSummaryCart(totalSummary)
      }
    }
  }, [])

  const form = useRef();

  const onHandlePaymentComplete = (e) => {
    e.preventDefault();
    for(const key in localStorage){
      if(key.startsWith("TotalCart")) localStorage.removeItem(key);
      if(key.startsWith("CartProduct")) localStorage.removeItem(key);
    }

    window.location.href = "/thankyoupage"

    emailjs.sendForm('service_afp03sz', 'template_j8gbpuf', form.current, 'vvSqsU-fF1YN9n3dg')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
  }  

  return (
    <section className={styles.Checkout}>
      <h1>Checkout</h1>
      <h3>Total Order: {totalPayment}$</h3>
      <form ref={form} onSubmit={onHandlePaymentComplete}>
      <input type="hidden" name="totalPayment" value={totalPayment}/>
      <fieldset className={styles.fieldsetCard}>
          <legend className={styles.legendCardName}>
            Choose Payment Method
          </legend>
          <div className={styles.typePayment}>
            <input type="radio" name="paymentMethod" value="Mastercard" onChange={onHandlePaymentMethod}/>
            <div className={styles.containerCard}>
              <Image
              src={"https://img.icons8.com/color/256/mastercard.png"}
              width={100}
              height={100}
              alt={"mastercard payment"} 
              />
              <span>Mastercard Payment</span>
            </div>
          </div>
          <div className={styles.typePayment}>
            <input type="radio" name="paymentMethod" value="Paypal" onChange={onHandlePaymentMethod}/>
            <div className={styles.containerCard}>
              <Image
              src={"https://img.icons8.com/color/512/paypal.png"}
              width={100}
              height={100}
              alt={"paypal payment"} 
              />
              <span>Paypal Payment</span>
            </div>
          </div>
          <div className={styles.typePayment}>
            <input type="radio" name="paymentMethod" value="Bank Transfer" onChange={onHandlePaymentMethod}/>
            <div className={styles.containerCard}>
              <Image
              src={"https://img.icons8.com/color/256/merchant-account.png"}
              width={100}
              height={100}
              alt={"bank transfer payment"} 
              />
              <span>Bank Transfer Payment</span>
            </div>
          </div>
          <div className={styles.typePayment}>
            <input type="radio" name="paymentMethod" value="Mark Payment" onChange={onHandlePaymentMethod}/>
            <div className={styles.containerCard}>
              <Image
              src={"https://img.icons8.com/color/256/wallet--v1.png"}
              width={100}
              height={100}
              alt={"Mark payment"} 
              />
              <span>Mark Payment</span>
            </div>
          </div>
        </fieldset>
        <fieldset className={styles.fieldsetSpecifications}>
          <legend className={styles.legendSpecifications}>
            Payment Data
          </legend>
          <div className={styles.dataPayments}>

            <input type="text" 
            className={styles.accountholder} 
            name="name_surname" 
            id="name_surname" 
            placeholder="Name and Surname" 
            value={name} 
            onChange={onHandleName}
            required autoComplete='off'/>

            <input type="text"
            className={styles.numberCard} 
            placeholder="Card Number" 
            value={number} 
            onChange={onHandleNumber} 
            minLength={16} maxLength={16}
            required autoComplete='off'/>

            <div className={styles.expiryDate}>
              <span>Expiry</span>
              <input type="month" 
              min="" value={expiry} 
              onChange={onHandleExpiry} 
              required autoComplete='off'/>
            </div>

            <input type="text"
            className={styles.cvc} 
            value={cvc} 
            placeholder="CVC" 
            onChange={onHandleCvc}            
            minLength={3} maxLength={3}
            required autoComplete='off'/>
          </div>
        </fieldset>
        <input type="submit" value="Complete Order"/>
      </form>

      <div className={styles.cartSummary}>
        <h2>Summary Order</h2>
        <div className={styles.containerCartSummary}>
          {
            summaryCart.map(prod => 
              <div className={styles.prodSummary}>
                <div className={styles.product} key={prod.id}>
                  <Image
                  src={prod.image}
                  width={50}
                  height={50}
                  alt={prod.title}
                  />
                  <span className={styles.title}>{prod.title}</span>
                  {
                    prod.quantity > 1 ? 
                    <span className={styles.qtyPrice}>{prod.quantity} x {prod.price}$</span> 
                    : 
                    <span className={styles.qtyPrice}>1 x {prod.price}$</span>
                  }
                </div>
              </div>
              )
          }
        </div>
      </div>
    </section>
  )
}

export default Checkout