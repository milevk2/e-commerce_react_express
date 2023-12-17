import { createContext, useState } from 'react';

const CartContext = createContext();


const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const addItem = (item) => {
   setCartItems(items => [...items, item])
  };


  const deleteItems = () => {

    setCartItems([]);

  }

//   const removeItem = (itemId) => {


//   }

  return (
    <CartContext.Provider value={{ cartItems, addItem, deleteItems }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
