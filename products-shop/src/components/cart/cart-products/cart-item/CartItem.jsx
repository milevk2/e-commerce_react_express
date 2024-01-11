import styles from './CartItem.module.css';
import { useContext, useEffect } from 'react';
import { LanguageContext } from '../../../../LanguageContext.jsx';
import { CartContext } from '../../../../CartContext.jsx';
import { NavLink } from 'react-router-dom';


const CartItem = ({ item }) => {

    const { specsEnum } = useContext(LanguageContext);
    const { removeItem } = useContext(CartContext)


    function removeItemHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        removeItem(item._id);
    }

    return (

        <NavLink to={`/products/${item._id}`} className={styles.link}>
            <div className={styles.cartRow}>

                <div ><img src={item.image} className={styles.itemImage} /></div>

                <div className={styles.itemName}>{item.name}</div>

                <div className={styles.itemName}>Quantity: {`${item.buyQuantity}x${item.price}`}</div>

                <div className={styles.itemPrice}>{(item.price * item.buyQuantity).toFixed(2)} {specsEnum.currency}</div>

                <div className={styles.removeItem} onClick={removeItemHandler}>X</div>

            </div>
        </NavLink>

    )


}
export default CartItem