import { useContext } from 'react';
import styles from './ProductListItem.module.css'
import { NavLink } from "react-router-dom";
import { LanguageContext } from '../../../LanguageContext.jsx';

LanguageContext
const ProductListItem = ({ item }) => {

    const {specsEnum} = useContext(LanguageContext);

    return (
        <li className={styles.wrapped}>

            <NavLink to={`/products/${item._id}`} className={styles.columnLink}>
                <div className={styles.column}>

                    <img src={item.image} className={styles.preview} />
                    <div className={styles.details}>
                        <div>{item.name}</div>
                        <div>{item.announced}</div>
                        <div className={styles.price}>{item.price} {specsEnum.currency}</div>
                    </div>

                </div>
            </NavLink>
        </li>
    )
}

export default ProductListItem;