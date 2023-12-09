import { useState, useEffect } from "react";
import { getProduct } from "../../services/productService.js";
import ProductListItem from "./product-list-item/ProductListItem.jsx"
import styles from './ProductList.module.css'
import jwtParser from "../../lib/jwtParser.js";


const ProductList = ({ myProducts }) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        if (myProducts) {

            const decodedPayload = jwtParser();
            const userId = decodedPayload._id;
            getProduct(null, userId).then(products => setProducts([...products])).catch(err => console.log(err));
        }
        else {
            getProduct().then(products => setProducts([...products])).catch(err => console.log(err));
        }
    }, [myProducts])

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