import React from 'react';
import { CartProvider } from './cartContext';
import Cart from './cart';
import './App.css';
function App() {
  return (
    <CartProvider>
      <div className="App">
        <h1>Shopping Cart</h1>
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
