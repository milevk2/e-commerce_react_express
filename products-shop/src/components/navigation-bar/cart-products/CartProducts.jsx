import { useContext, useEffect, useState } from 'react';
import styles from './CartProducts.module.css'
import { CartContext } from '../../../CartContext.jsx';
import CartItem from './cart-item/CartItem.jsx';



const CartProducts = ({ cartCounter, setCartCounter }) => {

    const { cartItems, deleteItems } = useContext(CartContext);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        
        setTotal( cartItems.reduce((acc, curr)=>{

            acc += curr.price;

            return acc;

        },0))
        
    },[cartCounter])

    return (

        <>
            {cartCounter > 0 && <div className={styles.cartProducts}>

                {cartItems.map(item => <CartItem key={item._id} item={item} />)}

                <div className={styles.total}>Total: {total.toFixed(2)} bgn</div>
                <button className={styles.clearCart} onClick={() => {
                    setCartCounter(0);
                    deleteItems();
                }
                }>Delete items</button>

            </div>}
        </>
    )
}

export default CartProducts;