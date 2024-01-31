import { useState, useEffect, useContext } from "react";
import { getProduct } from "../../services/productService.js";
import ProductListItem from "./product-list-item/ProductListItem.jsx"
import styles from './ProductList.module.css'
import { LoggerContext } from "../../LoggerContext.jsx";
import { LanguageContext } from "../../LanguageContext.jsx";


const ProductList = ({ myProducts }) => {

    const [products, setProducts] = useState([]);
    const {userId} = useContext(LoggerContext);
    const {specsEnum} = useContext(LanguageContext);

    useEffect(() => {

        if (myProducts) {

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
                    
                    myProducts ?<div className={styles.notFoundMine}>
                    <h1>Currently you are noot selling any items!</h1>
                    <button className="defaultButton">Click here to redirect to home page!</button>
                </div> :
                    <div className={styles.notFound}>
                        <h1>{specsEnum.noProducts}</h1>
                    </div>
                    :
                    <div>
                        {myProducts ? <span className="headerDiv">My Products</span> : ''}
                        <ul className={styles.shopWrapper}>
                            {products.map(product => <ProductListItem key={product._id} item={product} />)}

                        </ul>
                    </div>
            }
        </>
    )

}

export default ProductList;