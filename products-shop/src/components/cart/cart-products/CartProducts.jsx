import { useContext } from 'react';
import styles from './CartProducts.module.css'
import { CartContext } from '../../../CartContext.jsx';
import CartItem from './cart-item/CartItem.jsx';

const CartProducts = () => {

    const { cartItems, cartCounter, totalPrice, resetContextState } = useContext(CartContext);

    return (
        <>
            {cartCounter > 0 && <div className={styles.cartProducts}>

                {cartItems.map(item => <CartItem key={item._id} item={item} />)}

                <div className={styles.total}>Total: {totalPrice.toFixed(2)} BGN</div>
                <button className={styles.clearCart} onClick={() => {
                    resetContextState();
                }
                }>Delete items</button>
            </div>}
        </>
    )
}

export default CartProducts;