import { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0)
  const [isNotification, setIsNotification] = useState(false);

  function resetContextState() {

    setCartItems([]);
    setCartCounter(0);
    setTotalPrice(0);
    setIsNotification(false);

  }

  const addItem = (item) => {
    setIsNotification(true);
    setTimeout(() => { setIsNotification(false) },50);
    setCartItems(items => [...items, item]);
    setCartCounter(x => x + 1);
    setTotalPrice(total => total + item.price);

  };

  const deleteItems = () => {

    setCartItems([]);
    setCartCounter(0);
    setTotalPrice(0);
  }

  //   const removeItem = (itemId) => {
      //to be done

  //   }

  return (
    <CartContext.Provider value={{ cartItems, cartCounter, totalPrice, addItem, isNotification, setIsNotification, deleteItems, resetContextState }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
