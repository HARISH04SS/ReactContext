import React, { useEffect } from 'react';
import { useCart } from './cartContext';
import productData from './product.json';

const Cart = () => {
  const { items, totalQuantity, totalAmount, addItemToCart, incrementItemQuantity, decrementItemQuantity } = useCart();

  useEffect(() => {
    if (items.length === 0) {
      productData.products.forEach(product => addItemToCart(product));
    }
  }, [addItemToCart, items.length]);

  return (
    <div className="cart">
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="item-details">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button onClick={() => decrementItemQuantity(item.id)}>-</button>
                <span>{item.quantity}</span> {/* Display the quantity, starting at 0 */}
                <button onClick={() => incrementItemQuantity(item)}>+</button>
              </div>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <p>Total Items: {totalQuantity}</p>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
