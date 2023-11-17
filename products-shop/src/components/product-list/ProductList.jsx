import { useState, useEffect } from "react";
import { getProduct } from "../../services/productService.js";
import ProductListItem from "./product-list-item/ProductListItem.jsx"
import styles from './ProductList.module.css'

const ProductList = () => {

    const [products, setProducts] = useState([]);


    useEffect(() => {

        getProduct().then(products => setProducts([...products])).catch(err => console.log(err));

       

    }, [])



    return (

        <>
        {
            products.length == 0 ?
        <div className={styles.notFound}>

            <h1>Currently there are no products available...</h1>

        </div>
        :
        <div>

            <ul className={styles.shopWrapper}>

                {products.map(product => <ProductListItem key={product._id} item={product} />)}

            </ul>

        </div>
    }
    </>
    )

}

export default ProductList;