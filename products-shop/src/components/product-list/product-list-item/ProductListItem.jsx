import { useEffect } from "react";
import styles from './ProductListItem.module.css'
import { NavLink } from "react-router-dom";

const ProductListItem = ({ item }) => {

    useEffect(() => {

        console.log(item, 'details');

    })

    return (
        <li className={styles.wrapped}>
            <NavLink  to={`/products/${item._id}`}>
               
                <div className={styles.column}>
                    <img src={item.image} className={styles.preview} />
                    <div>{item.name}</div>
                    <div>{item.announced}</div>
                    <div>{item.description}</div>
                    <div>{item.price}</div>
                </div>
            </NavLink>
        </li>
    )
}

export default ProductListItem;