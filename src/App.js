import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route exact path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
     
    </div>
    </BrowserRouter>
  );
}

export default App;


