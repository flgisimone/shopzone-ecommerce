import { useGlobalContext } from '@/context';
import Image from 'next/image';
import Link from 'next/link';

import { AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai';
import { BsHeartFill, BsCartFill} from 'react-icons/bs';

import styles from "./styles.module.scss"

const Navbar = () => {

    const { openMenu, setOpenMenu } = useGlobalContext()

    const btnOpenMenu = () =>{
        setOpenMenu(true)
    }

    const btnClosenMenu = () =>{
        setOpenMenu(false)
    }

    const onHandleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password")
        location.href="/login"
    }

  return (
    <section className={styles.Menu}>
      <div className={styles.ContainerMenu}>
        <Link href={"/"}>
          <Image
          src={"https://i.postimg.cc/ZqLZgBPy/logoipsum-248.png"}
          width={244}
          height={100}
          alt={"logo"} />
        </Link>
        <nav>
          <div className={styles.containerLink_wishlist_cart}>
            <Link href={"/wishlist"}><BsHeartFill color="#242424" fill='#242424'/></Link>
            <Link href={"/cart"}><BsCartFill color="#242424" fill='#242424'/></Link>
          </div>
          <ul className={openMenu ? `${styles.ulMenu} ${styles.show}` : `${styles.ulMenu} ${styles.hidden}`} role="menu">
            <li><Link href={"/"}>HOME</Link></li>
            <li><Link href={"/products"}>PRODUCTS</Link></li>
            <li><Link href={"/cart"}>CART</Link></li>
            <li><Link href={"/wishlist"}>WISHLIST</Link></li>
            <li><Link href={"/contact"}>CONTACT</Link></li>
            <button onClick={onHandleLogout}>Logout</button>
          </ul>
          <div className={styles.containerBtn}>
            <button onClick={btnOpenMenu} className={!openMenu ? `${styles.btnOpenMenu} ${styles.show}` : `${styles.btnOpenMenu} ${styles.hidden}`}><AiOutlineMenu /></button>
            <button onClick={btnClosenMenu} className={openMenu ? `${styles.btnClosenMenu} ${styles.show}` : `${styles.btnClosenMenu} ${styles.hidden}`}><AiFillCloseCircle /></button>
          </div>
        </nav>
      </div>
    </section>
  )
}

export default Navbar