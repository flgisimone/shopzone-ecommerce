import Head from 'next/head';
import { useRef } from 'react'
import { useGlobalContext } from '@/context';
import emailjs from '@emailjs/browser';

import Image from 'next/image'
import styles from "../styles/Contact.module.scss"

const Contact = () => {

    const { 
        firstName, setFirstName,
        lastName, setLastName,
        optionValue, setOptionValue,
        email, setEmail,
        message, setMessage,
        privacy, setPrivacy,
        setModuleContact
     } = useGlobalContext()

     const form = useRef()

    const onHandleFirstName = (e) => setFirstName(e.target.value)
    const onHandleLastName = (e) => setLastName(e.target.value)
    const onHandleOptionValue = (e) => setOptionValue(e.target.value)
    const onHandleEmail = (e) => setEmail(e.target.value)
    const onHandleMessage = (e) => setMessage(e.target.value)
    const onHandlePrivacy = (e) => setPrivacy(e.target.value)

    const onHandleSubmit = (e) => {
        e.preventDefault()
        setModuleContact({
            firstName,
            lastName,
            optionValue,
            email,
            message,
            privacy
        })
        setFirstName("")
        setLastName("")
        setOptionValue("")
        setEmail("")
        setMessage("")
        setPrivacy("")

        emailjs.sendForm('service_afp03sz', 'template_g2t1j2o', form.current, 'vvSqsU-fF1YN9n3dg')
        .then((result) => {
            console.log(result.text)
        }, (error) => {
            console.log(error.text)
        })
    }

  return (
    <>
    <Head>
        <title>Contact | Shopzone - Ecommerce</title>
        <meta name="description" content="Contact | Shopzone - Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <section className={styles.Contact}>
        <Image 
        src={"https://i.postimg.cc/wMS1qxtC/bg-scene-contact.jpg"}
        width={1920}
        height={768}
        alt={"cover"}/>
        <h2>Contact Us</h2>
        <form ref={form} onSubmit={onHandleSubmit}>
            <div className={styles.field_1}>
                <input type="text" value={firstName} name="firstName" placeholder="First name" onChange={onHandleFirstName} required/>
                <input type="text" value={lastName} name="lastName" placeholder="Last name" onChange={onHandleLastName} required/>
            </div>
            <div className={styles.field_2}>
                <input type="email" value={email} name="email" placeholder="Email" onChange={onHandleEmail} required/>
                <select name="filter" id="filter-select" className={styles.selectValue} defaultValue="select request" onChange={onHandleOptionValue} >
                    <option value="select request" disabled>Select request</option>
                    <option value="assistance" name="object">Assistance</option>
                    <option value="product's info" name="object">Product information</option>
                </select>
            </div>
            <textarea placeholder="Insert Message..." id="contact" name="message" rows="7" cols="50" value={message} onChange={onHandleMessage} required/>
            <div className={styles.field_privacy}>
                <div className={styles.containerCheckbox}>
                    <input type="checkbox" name="privacy" id="privacy" placeholder="Consent Privacy" onChange={onHandlePrivacy} required/>
                    <label htmlFor="privacy" value={privacy} name={privacy} required>Consent Privacy</label>
                </div>
                <span>You agree to the <a>terms of use</a> and acknowledge the <a>privacy policy</a></span>
            </div>
            <input type="submit" value="Send" />
        </form>
    </section>
    </>
  )
}

export default Contact