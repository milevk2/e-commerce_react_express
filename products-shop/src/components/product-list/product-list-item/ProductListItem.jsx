import { useEffect } from "react";
import styles from './ProductListItem.module.css'

const ProductListItem = ({ item }) => {


    useEffect(() => {

        console.log(item, 'details');

    })

    return (


        <li className={styles.wrapped}>
            <a href={`/products/${item._id}`}>
               
                <div className={styles.column}>
                    <img src={item.image} className={styles.preview} />
                    <div>{item.name}</div>
                    <div>{item.announced}</div>
                    <div>{item.description}</div>
                    <div>{item.price}</div>
                </div>
            </a>
        </li>

    )

}

export default ProductListItem;