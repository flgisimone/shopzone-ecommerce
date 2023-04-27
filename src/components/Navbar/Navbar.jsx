import { useGlobalContext } from '@/context';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai';
import { BsHeartFill, BsCartFill } from 'react-icons/bs';

import styles from "./styles.module.scss"

const Navbar = () => {

    const { userLogged, setUserLogged } = useGlobalContext(null)

    const [openMenu, setOpenMenu] = useState(false)
    const [openSubMenu, setOpenSubMenu] = useState(false)

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"))
      if (storedUser) {
        setUserLogged(storedUser.user);
      } else {
        setUserLogged(null);
      }
    }, [])

    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (event.target.closest(`.${styles.Menu}`) === null) setOpenMenu(false)
      }
      if (openMenu) document.body.addEventListener("click", handleOutsideClick)
      return () => document.body.removeEventListener("click", handleOutsideClick)
    }, [openMenu]);

    const btnOpenMenu = () => setOpenMenu(true)
    const btnClosenMenu = () =>setOpenMenu(false)
    const btnSubMenu = () =>  setOpenSubMenu(prev => !prev)

    const onHandleLogin = () => location.href="/login"
    const onHandleLogout = () => {
        localStorage.removeItem("email")
        localStorage.removeItem("password")
        localStorage.removeItem("user")
        location.href="/"
    }

  return (
    <section className={styles.Menu} >
      <div className={styles.ContainerMenu}>
        <div className={styles.logo_user}>
          <Link href={"/"} onClick={btnClosenMenu}>
            <Image
            src={"https://i.postimg.cc/qBZyLTQz/logo-86.png"}
            width={244}
            height={100}
            alt="logo" />
          </Link>
          {
            userLogged && 
            <div className={styles.userLogged}>
              <Image src={userLogged.avatar} 
              width={50}
              height={50}
              alt={userLogged.name}/>
              <span>Hi, {userLogged.name}!</span>
            </div>
          }
        </div>
        <nav>
          <div className={styles.containerLink_wishlist_cart}>
            <Link href={"/wishlist"} onClick={btnClosenMenu}><BsHeartFill color="#242424" fill='#242424'/></Link>
            <Link href={"/cart"} onClick={btnClosenMenu}><BsCartFill color="#242424" fill='#242424'/></Link>
            <div className={styles.containerBtn}>
              <button onClick={btnOpenMenu} className={!openMenu ? `${styles.btnOpenMenu} ${styles.show}` : `${styles.btnOpenMenu} ${styles.hidden}`}><AiOutlineMenu /></button>
              <button onClick={btnClosenMenu} className={openMenu ? `${styles.btnClosenMenu} ${styles.show}` : `${styles.btnClosenMenu} ${styles.hidden}`}><AiFillCloseCircle /></button>
            </div>
          </div>
          <ul className={openMenu ? `${styles.ulMenu} ${styles.show}` : `${styles.ulMenu} ${styles.hidden}`} role="menu">
            <li onClick={btnClosenMenu}><Link href={"/"}>HOME</Link></li>
            <div className={styles.containerSubMenu}>
              <li onClick={btnSubMenu} className={styles.subMenu}>CATEGORIES</li>
              <ul className={openSubMenu ? `${styles.show} ${styles.subUlMenu}` : `${styles.hidden}`}>
                <li onClick={btnClosenMenu}><Link href={"/electronics"}>Electronics</Link></li>
                <li onClick={btnClosenMenu}><Link href={"/jewelery"}>Jewelery</Link></li>
                <li onClick={btnClosenMenu}><Link href={"/mens-clothing"}>Men's Clothing</Link></li>
                <li onClick={btnClosenMenu}><Link href={"/womens-clothing"}>Women's Clothing</Link></li>
              </ul>
            </div>
            <li onClick={btnClosenMenu}><Link href={"/cart"}>CART</Link></li>
            <li onClick={btnClosenMenu}><Link href={"/wishlist"}>WISHLIST</Link></li>
            <li onClick={btnClosenMenu}><Link href={"/contact"}>CONTACT</Link></li>
            {
              userLogged ? <button onClick={onHandleLogout}>Logout</button> : <button onClick={onHandleLogin}>Login</button> 
            }
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default Navbar