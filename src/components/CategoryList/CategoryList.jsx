import { useEffect, useState } from "react"
import Link from "next/link"

import TopProducts from "../TopProducts/TopProducts";
import Electronics from "../Electronics/Electronics";
import Jewelery from "../Jewelery/Jewelery";
import MenClothing from "../MenClothing/MenClothing";
import WomenClothing from "../WomenClothing/WomenClothing";

import styles from "./styles.module.scss"

const CategoryList = () => {

  const [dataCategory, setDataCategory] = useState([])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(data => setDataCategory(data))
  }, [])



return (
  <section className={styles.CategoryList}>
    <h2>Category</h2>
    <div className={styles.containerCategory}>
      {
        dataCategory.map((categoryItem, index) => <Link href={"/"} className={styles.pageCategory} key={index}>{categoryItem}</Link>)
      }
      <TopProducts />
    </div>
    <div className={styles.electronics}>
      <Electronics />
    </div>
    <div className={styles.jewelery}>
      <Jewelery />
    </div>
    <div className={styles.menClothing}>
      <MenClothing />
    </div>
    <div className={styles.menClothing}>
      <WomenClothing />
    </div>
  </section>
)
}

export default CategoryList
