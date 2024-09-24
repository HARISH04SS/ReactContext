import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const addItemToCart = (product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems; // Do not add again if it already exists
      } else {
        return [...prevItems, { ...product, quantity: 0 }]; // Initialize quantity to 0
      }
    });
  };

  const incrementItemQuantity = (product) => {
    setItems((prevItems) => {
      return prevItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    });

    setTotalQuantity(prevQuantity => prevQuantity + 1);
    setTotalAmount(prevAmount => prevAmount + product.price);
  };

  const decrementItemQuantity = (id) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          return prevItems.filter(item => item.id !== id); // Remove item if quantity is 1
        } else {
          return prevItems.map(item =>
            item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        }
      }
      return prevItems;
    });

    // Update totalQuantity and totalAmount
    const product = items.find(item => item.id === id);
    if (product && product.quantity > 0) {
      setTotalQuantity(prevQuantity => prevQuantity - 1);
      setTotalAmount(prevAmount => prevAmount - product.price);
    }
  };

  return (
    <CartContext.Provider value={{ items, totalQuantity, totalAmount, addItemToCart, incrementItemQuantity, decrementItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
