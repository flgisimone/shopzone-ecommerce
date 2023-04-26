import { useEffect, useState } from "react"

import SliderProduct from "../SliderProduct/SliderProduct";

import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';

import styles from "./styles.module.scss"

const TopProducts = () => {

  const [topProducts, setTopProducts] = useState([])
  const [slide, setSlide] = useState(0)
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => setTopProducts(data))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(slide => (slide + 1) % 5)
    }, 3_500)
    return () => clearInterval(interval)
  }, [])

  const prevSlide = () => {
    setSlide(slide => (slide + 4) % 5)
  }

  const nextSlide = () => {
    setSlide(slide => (slide + 1) % 5)
  }
  return (
    <div className={styles.TopProducts}>
      <h3>Top Products</h3>
      <div className={styles.containerTopProducts}>
        {
          topProducts
          .filter(products => products.rating.rate > 4.5)
          .slice(slide , slide + 1)
          .map(products => 
            <div className={styles.topProduct} key={products.id}>
              <button className={styles.btnPrev} onClick={prevSlide}><BsFillArrowLeftCircleFill /></button>
              <SliderProduct data={products} />
              <button className={styles.btnNext} onClick={nextSlide}><BsFillArrowRightCircleFill /></button>
            </div>
            )
        }
      </div>
    </div>
  )
}

export default TopProducts