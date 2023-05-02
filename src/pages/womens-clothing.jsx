import { useGlobalContext } from "@/context"
import Head from "next/head";

import Product from "@/components/Product/Product"
import Loader from "@/components/Loader/Loader"
import Searchbar from "@/components/Searchbar/Searchbar"

import { MdReadMore } from 'react-icons/md'

import styles from "../styles/SingleCategory.module.scss"

const WomensClothing = ({data}) => {

    const { showProduct, setShowProduct, 
        isLoading, setIsLoading,
        searchValue } = useGlobalContext()

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
      <title>Women's Clothing | Shopzone - Ecommerce</title>
      <meta name="description" content="Women's Clothing | Shopzone - Ecommerce" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <section className={styles.categoryPage}>
        <h1>Women's Clothing</h1>
        <Searchbar />
        <div className={styles.containerCategoryPage}>
            {
                data
                .filter(prod => prod?.title?.toLowerCase().includes(searchValue?.toLowerCase()))
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

export default WomensClothing

export async function getServerSideProps() {
    const res = await fetch("https://fakestoreapi.com/products/category/women's%20clothing");
    const data = await res.json();
  
    return {
      props: {
        data,
      },
    };
  }