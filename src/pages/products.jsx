/**
 * This page shows the list of products retrieved from the API called "https://api.escuelajs.co/api/v1/products", 
 * through the fetch performed by server-side rendering: generated first server-side and then sent to the client. 
 
 * The useGlobalContext() hook allows state sharing between components, both for the loader and for rendering subsequent products.
 
 * In addition, a "Load more" button is shown that, when clicked, loads more products from the API: 12 at a time.
 
 * P.S. A timemout of 500ms has been inserted to show the loader. 
 */

import Head from "next/head";
import { useGlobalContext } from "@/context";

import Product from "@/components/Product/Product"
import Loader from "@/components/Loader/Loader"

import { MdReadMore } from 'react-icons/md';

import styles from "../styles/Products.module.scss"

const Products = ({data}) => {

  const { showProduct, setShowProduct, isLoading, setIsLoading } = useGlobalContext()

    const handleLoadMore = () => {
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          setShowProduct(showProduct + 12);
      }, 500); 
  }

  return (
    <>
    <Head>
      <title>Products | TLG Recruiting FE Homework</title>
      <meta name="description" content="Products | TLG Recruiting FE Homework" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1 className={styles.titlePage}>Products</h1>
    <section className={styles.Products}>
        {
          data?.slice(0, showProduct)
          .map((product , index) => 
          <div className={styles.product} key={index}>
            <Product data={product} />
          </div>
          )
        }
    </section>
    {
      showProduct <= data?.length && (
        <button onClick={handleLoadMore} className={styles.btnLoadMore}>
          {isLoading ? <Loader /> : 
          <div className={styles.containerLoadMore}> 
            <MdReadMore className={styles.iconLoadMore}/> 
            <span>Load more Products</span>
          </div>}
        </button>
      )
    }    
    </>
  )
}

export default Products

export async function getServerSideProps() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
  
    return {
      props: {
        data,
      },
    };
  }