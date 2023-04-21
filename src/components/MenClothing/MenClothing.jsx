import React, { useEffect, useState } from 'react'

import styles from "./styles.module.scsssection"

const MenClothing = () => {

    const [category, setCategory] = useState()
    useEffect(() => {
        fetch("https://fakestoreapi.com/products/category/jewelery")
        .then(res => res.json())
        .then(data => setCategory(data))
    }, [])

  return (
    <section className={styles.MenClothing}>
        <div className={styles.containerProducts}>
            {
                category?.map(product => 
                <div className={styles.product} key={product.id}>
                    <h2>{product?.title}</h2>
                </div>
                )
            }
        </div>
    </section>
  )
}

export default MenClothing