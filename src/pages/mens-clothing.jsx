import { useGlobalContext } from "@/context"
import Head from "next/head";

import Product from "@/components/Product/Product"
import Loader from "@/components/Loader/Loader";

import { MdReadMore } from 'react-icons/md';

import styles from "../styles/SingleCategory.module.scss"

const MensClothing = ({data}) => {

    const { showProduct, setShowProduct, isLoading, setIsLoading } = useGlobalContext()

    const handleLoadMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowProduct(showProduct + 10);
        }, 500); 
    }

  return (
    <>
    <Head>
      <title>Men's Clothing | Shopzone - Ecommerce</title>
      <meta name="description" content="Men's Clothing | Shopzone - Ecommerce" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>    
    <section className={styles.categoryPage}>
        <h1>Men's Clothing</h1>
        <div className={styles.containerCategoryPage}>
            {
                data
                .slice(0, showProduct)
                .map(prod => 
                    <div className={styles.productCategory} key={prod.id}>
                        <Product data={prod} />
                    </div>
                )
            }
        </div>
        {
            showProduct <= data?.length && (
                <button onClick={handleLoadMore} className={styles.btnLoadMore}>
                {
                    isLoading ? <Loader /> : 
                    <div className={styles.containerLoadMore}> 
                        <MdReadMore className={styles.iconLoadMore}/> 
                        <span>Load more Products</span>
                    </div>
                }
                </button>
            )
        }   
    </section>    
    </>
  )
}

export default MensClothing

export async function getServerSideProps() {
    const res = await fetch("https://fakestoreapi.com/products/category/men's%20clothing");
    const data = await res.json();
  
    return {
      props: {
        data,
      },
    };
  }