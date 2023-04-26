import { useGlobalContext } from '@/context';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { auth } from '@/firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import styles from "./styles.module.scss"

const Footer = () => {

    const { user } = useGlobalContext()

    const [userGoogle] = useAuthState(auth)

    const onHandleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password")
        location.href="/"

        auth.signOut().then(() => {
            router.push("/");
          });
          location.reload()
    }

    const onHandleLogin = () => {
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
                {
                    user || userGoogle ? <button onClick={onHandleLogout}>Logout</button> : <button onClick={onHandleLogin}>Login</button>
                }            
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