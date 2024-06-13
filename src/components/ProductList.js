import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const productStatus = useSelector(state => state.products.status);
  const cartItems = useSelector(state => state.cart.items);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      };
      dispatch(addToCart(updatedItem));
    } else {
      const newCartItem = {
        ...product,
        quantity: 1
      };
      dispatch(addToCart(newCartItem));
    }
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div>
      <div className="navbar">
        <h2>Products</h2>
        <Link to="/cart" className="cart-button">Cart ({cartItems.length})</Link>
      </div>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <h3>{product.title}</h3>
            <h4>Price: ${product.price}</h4>
            <img src={product.image} alt={product.title} className="product-image" />
            <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">Add to Cart</button>
            {cartItems.find(item => item.id === product.id) && (
              <p>Quantity in Cart: {cartItems.find(item => item.id === product.id).quantity}</p>
            )}
          </li>
        ))}
      </ul>
      {showAlert && (
        <div className="alert" style={{ right: '50px' }}>
          Product added to cart successfully!
        </div>
      )}
    </div>
  );
};

export default ProductList;
