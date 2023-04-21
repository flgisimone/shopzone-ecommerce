/**
 * In this component there are four columns containing the website logo, logout button, contact information, resources and a sitemap. 
 
 * When the logout button is clicked, the authentication information (email and password) is removed from the localStorage and the user is redirected to the login page.
 */

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from "./styles.module.scss"

const Footer = () => {

    const onHandleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password")
        location.href="/login"
    }

  return (
    <footer className={styles.Footer}>
        <div className={styles.containerFooter}>
            <div className={styles.column_1}>
                <Link href={"/"}>
                    <Image
                    src={"https://i.postimg.cc/ZqLZgBPy/logoipsum-248.png"}
                    width={244}
                    height={100}
                    alt={"logo"} />
                </Link>
                <button onClick={onHandleLogout}>Logout</button>                
            </div>
            <div className={styles.column_2}>
                <ul>
                    <h3>Contact</h3>
                    <li>Email: fakestore@gmail.com</li>
                    <li>Phone: +99 999 999 999</li>
                    <li>Address: 203 Los Santos, San Andreas</li>
                </ul>
            </div>
            <div className={styles.column_3}>
                <ul>
                    <h3>Resources</h3>
                    <li><Link href={"/"}>PRIVACY</Link></li>
                    <li><Link href={"/"}>SHIPPING & ORDER</Link></li>
                </ul>
            </div>
            <ul className={styles.sitemap}>
                <h3>Sitemap</h3>
                <li><Link href={"/"}>HOME</Link></li>
                <li><Link href={"/products"}>PRODUCTS</Link></li>
                <li><Link href={"/wishlist"}>WISHLIST</Link></li>
                <li><Link href={"/contact"}>CONTACT</Link></li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer