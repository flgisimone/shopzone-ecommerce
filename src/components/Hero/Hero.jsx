import React from 'react'
import styles from "./styles.module.scss"

const Hero = () => {
  return (
    <section className={styles.Hero}>
        <div className={styles.boxHero}>
            <h1>Lorem Ipsum dolor sit amet</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button>GO!</button>
        </div>
    </section>
  )
}

export default Hero