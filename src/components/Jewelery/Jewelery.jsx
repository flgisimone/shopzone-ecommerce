import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Product from '../Product/Product'

import { BsFillArrowRightCircleFill } from 'react-icons/bs';

import styles from "../../styles/Category.module.scss"

const Jewelery = () => {

    const [category, setCategory] = useState()

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/category/jewelery")
        .then(res => res.json())
        .then(data => setCategory(data))
    }, [])

  return (
    <section className={styles.Category}>
        <div className={styles.headerCategory}>
            <h3>Jewelery</h3>
            <Link href={"/jewelery"} className={styles.goToPage}><span>Discover more</span><BsFillArrowRightCircleFill /></Link>   
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

export default Jewelery