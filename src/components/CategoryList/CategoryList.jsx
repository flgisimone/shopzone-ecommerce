import { useEffect, useState } from "react"

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

  const onHandleCategory = () => {
    if(dataCategory[0] === "electronics") window.location.href = "/electronics"
    if(dataCategory[1] === "jewelery") window.location.href = "/jewelery"
    if(dataCategory[2] === "men's clothing") window.location.href = "/mens-clothing"
    if(dataCategory[3] === "women's clothing") window.location.href = "/womens-clothing"
  }

return (
  <section className={styles.CategoryList}>
    <div className={styles.containerCategory}>
        <div className={styles.subcontainerCategory}>
        <h2>Category</h2>
        <div className={styles.containerBtnCategory}>
        {
          dataCategory.map((categoryItem, index) => 
          <button className={styles.btnCategory} key={index} onClick={
            () => {
              if(index === 0) window.location.href = "/electronics"
              if(index === 1) window.location.href = "/jewelery"
              if(index === 2) window.location.href = "/mens-clothing"
              if(index === 3) window.location.href = "/womens-clothing"
            }
          }>{categoryItem}</button>)
        }
        </div>
      </div>
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
