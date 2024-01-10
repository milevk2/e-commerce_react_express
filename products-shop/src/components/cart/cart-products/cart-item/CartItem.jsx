import { useContext } from 'react'
import styles from './CartItem.module.css'
import { LanguageContext } from '../../../../LanguageContext.jsx'
import { NavLink } from 'react-router-dom';

const CartItem = ({item}) => {

    const {specsEnum} = useContext(LanguageContext);

    return (

        <NavLink to={`/products/${item._id}`} className={styles.link}>
        <div className={styles.cartRow}>

            <div ><img src={item.image} className={styles.itemImage}/></div>

            <div className={styles.itemName}>{item.name}</div>

           <div className={styles.itemName}>Quantity: {`${item.buyQuantity}x${item.price}`}</div>

            <div className={styles.itemPrice}>{(item.price * item.buyQuantity).toFixed(2)} {specsEnum.currency}</div>

        </div>
        </NavLink>

    )


}
export default CartItem