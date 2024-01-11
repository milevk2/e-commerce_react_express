import { createContext, useContext, useEffect, useState } from 'react';
import { update } from './services/userService.js';
import { LoggerContext } from './LoggerContext.jsx';

const CartContext = createContext();

const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0)
  const [isNotification, setIsNotification] = useState(false);
  const [isToken, setIsToken] = useState('');
  const { userId } = useContext(LoggerContext);

  useEffect(() => {

    if (cartItems.length > 0) {

      let temp_totalPrice = 0;
      let temp_cartCounter = 0;

      for (let item of cartItems) {

        temp_totalPrice += (item.price * item.buyQuantity);
        temp_cartCounter += item.buyQuantity;
      }

      setCartCounter(temp_cartCounter);
      setTotalPrice(temp_totalPrice);
    }

    if (userId) updateCartDb();

  }, [cartItems])


  async function updateCartDb() {

    await update({

      _id: userId,
      cart: cartItems
    })
  }

  function resetContextState() {

    setCartItems([]);
    setCartCounter(0);
    setTotalPrice(0);
    setIsNotification(false);
  }

  const addItem = (item) => {

    setIsNotification(true);
    setTimeout(() => { setIsNotification(false) }, 50);
    setCartCounter(x => x + 1);
    setTotalPrice(total => total + item.price);

    for (let currItem of cartItems) {

      if (item._id === currItem._id) {

        currItem.buyQuantity += 1;
        setCartItems(items => [...items]);
        return;
      }
    }
    setCartItems(items => [...items, item]);
  };


  const removeItem = (itemId) => {

    if (cartItems.length <= 1) return resetContextState(); 

    for (let i = 0; i < cartItems.length; i++) {

      if (cartItems[i]._id === itemId) {

        cartItems.splice(i, 1);
        setCartItems([...cartItems]);
        return;
      }
    }
  }

  //   const removeItem = (itemId) => {
  //to be done

  //   }

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      cartCounter,
      setCartCounter,
      totalPrice,
      setTotalPrice,
      addItem,
      removeItem,
      isNotification,
      setIsNotification,
      resetContextState,
      setIsToken
    }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
