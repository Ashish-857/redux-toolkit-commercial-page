import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../features/cartSlice';
import { Link } from 'react-router-dom';
import './Cart.css'; 

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateCartQuantity({ id, quantity }));
    }
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div className="cart-container"> 
      <h2>Shopping Cart</h2>
      <Link to="/products" className="cart-button">Back to Products</Link>
      <div className='calculate'>
        <p>Total Quantity: {calculateTotalQuantity()}</p>
        <p>Total Amount: ${calculateTotalAmount().toFixed(2)}</p>
      </div>
      <ul className="cart-items"> 
        {cartItems.map(item => (
          <li key={item.id} className="cart-item"> 
            <div className="cart-item-details"> 
              <h3>{item.title}</h3>
              <h4>Price: ${item.price}</h4>
              <img src={item.image} alt={item.title} className="product-image" /> 
              <div className="cart-item-quantity"> 
                <p>Quantity:</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  min="1"
                  className="cart-item-quantity-input"
                />
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))} className="cart-button">Remove</button> 
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
