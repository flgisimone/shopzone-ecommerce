/**
 * The page contains a form where the user can enter their first name, last name, email, request option, message, and agree to the terms of use and privacy policy.
 * When the user submits the form, the data is saved in an object called moduleContact using the localStorage.
 
 * The page uses the useGlobalContext hook to manage the global state of the application.
 * When the user submits the form, the state is updated using the functions: 
 * setFirstName; 
 * setLastName;
 * setOptionValue; 
 * setEmail; 
 * setMessage; 
 * setPrivacy; 
 * setModuleContact;
 */

import Head from 'next/head';
import React from 'react'
import { useGlobalContext } from '@/context';

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
        moduleContact, setModuleContact
     } = useGlobalContext()

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
    }

    localStorage.setItem("Contact Module", JSON.stringify(moduleContact));

  return (
    <>
    <Head>
        <title>Contact | TLG Recruiting FE Homework</title>
        <meta name="description" content="Contact | TLG Recruiting FE Homework" />
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
        <form onSubmit={onHandleSubmit}>
            <div className={styles.field_1}>
                <input type="text" value={firstName} placeholder="First name" onChange={onHandleFirstName} required/>
                <input type="text" value={lastName} placeholder="Last name" onChange={onHandleLastName} required/>
            </div>
            <div className={styles.field_2}>
                <input type="email" value={email} placeholder="Email" onChange={onHandleEmail} required/>
                <select name="filter" id="filter-select" className={styles.selectValue} defaultValue="select request" onChange={onHandleOptionValue} >
                    <option value="select request" disabled>Select request</option>
                    <option value="assistance">Assistance</option>
                    <option value="product information">Product information</option>
                </select>
            </div>
            <textarea placeholder="Insert Message..." id="contact" name="contact" rows="7" cols="50" value={message} onChange={onHandleMessage} required/>
            <div className={styles.field_privacy}>
                <div className={styles.containerCheckbox}>
                    <input type="checkbox" name="privacy" id="privacy" placeholder="Consent Privacy" onChange={onHandlePrivacy} required/>
                    <label htmlFor="privacy" value={privacy} required>Consent Privacy</label>
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