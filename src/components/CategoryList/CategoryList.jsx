import { useEffect, useState } from "react"
import Link from "next/link"
import Product from "../Product/Product";
import { RxDropdownMenu } from 'react-icons/rx';

import styles from "./styles.module.scss"

const CategoryList = () => {

  const [dataCategory, setDataCategory] = useState([])
  const [dataProducts, setDataProducts] = useState([])
  const [showProduct, setShowProducts] = useState(4)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(data => setDataCategory(data))
  }, [])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => setDataProducts(data))
  }, [])

  const onHandleShow = () => {
    setShowProducts(prev => prev + 4)
  }

return (
  <section className={styles.CategoryList}>
    <div className={styles.containerCategory}>
      {
        dataCategory.map((categoryItem, index) => <Link href={"/"} key={index}>{categoryItem}</Link>)
      }
    </div>
    <div className={styles.allProducts}>
      <h2>All Products</h2>
      <div className={styles.containerProducts}>
        {
          dataProducts
          .slice(0, showProduct)
          .map(product => 
            <div className={styles.Product} key={product.id}>
              <Product data={product} />
            </div>
            )
          }
      </div>
      <div className={styles.containerShowProducts}>
        {
          showProduct != dataProducts.length ? 
          (
            <button className={styles.btnShowProducts} onClick={onHandleShow}>
              <RxDropdownMenu className={styles.iconShowProducts}/>
              Show other Products
            </button>
          ) :
          ( 
            <span className={styles.notProducts}> No other Products </span> 
          )
        }
      </div>
    </div>
  </section>
)
}

export default CategoryList
