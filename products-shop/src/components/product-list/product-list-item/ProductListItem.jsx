import styles from './ProductListItem.module.css'
import { NavLink } from "react-router-dom";

const ProductListItem = ({ item }) => {

    return (
        <li className={styles.wrapped}>

            <div className={styles.column}>
                <NavLink to={`/products/${item._id}`} className={styles.columnLink}>
                    <img src={item.image} className={styles.preview} />
                    <div className={styles.details}>
                    <div>{item.name}</div>
                    <div>{item.announced}</div>
                    <div className={styles.price}>{item.price} bgn</div>
                    </div>
                </NavLink>
            </div>
        </li>
    )
}

export default ProductListItem;