import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Product from '../Product/Product'

import { BsFillArrowRightCircleFill } from 'react-icons/bs';

import styles from "../../styles/Category.module.scss"

const MenClothing = () => {

    const [category, setCategory] = useState()

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/category/men's clothing")
        .then(res => res.json())
        .then(data => setCategory(data))
    }, [])

  return (
    <section className={styles.Category}>
        <div className={styles.headerCategory}>
            <h3>Men's Clothing</h3>
            <Link href={"/mens_clothing"} className={styles.goToPage}><BsFillArrowRightCircleFill /></Link>   
        </div>
        <div className={styles.subContainerCategory}>
            <div className={styles.containerCategoryProduct}>
            {
            category?.slice(0, 4).map(product =>
                <div className={styles.product} key={product.id}>
                    <Product data={product} />
                </div>
                )
            }              
            </div>
        </div>       
    </section>
  )
}

export default MenClothing