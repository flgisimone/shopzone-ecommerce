import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"
import styles from "./styles.module.scss"

const Layout = ({children}) => {
  return (
    <>
    <div className={styles.Layout}>
      <Navbar />
      {children}
      <Footer />
    </div>

    </>
  )
}

export default Layout