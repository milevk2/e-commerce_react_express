import styles from './ProductListItem.module.css'
import { NavLink } from "react-router-dom";

const ProductListItem = ({ item }) => {

    return (
        <li className={styles.wrapped}>

            <NavLink to={`/products/${item._id}`} className={styles.columnLink}>
                <div className={styles.column}>

                    <img src={item.image} className={styles.preview} />
                    <div className={styles.details}>
                        <div>{item.name}</div>
                        <div>{item.announced}</div>
                        <div className={styles.price}>{item.price} bgn</div>
                    </div>

                </div>
            </NavLink>
        </li>
    )
}

export default ProductListItem;