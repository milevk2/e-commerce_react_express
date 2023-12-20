import { useContext } from 'react'
import styles from './CartItem.module.css'
import { LanguageContext } from '../../../../LanguageContext.jsx'

const CartItem = ({item}) => {

    const {specsEnum} = useContext(LanguageContext);

    return (

        <div className={styles.cartRow}>

            <div ><img src={item.image} className={styles.itemImage}/></div>

            <div className={styles.itemName}>{item.name}</div>

            <div className={styles.itemPrice}>{item.price} {specsEnum.currency}</div>

        </div>


    )


}
export default CartItem