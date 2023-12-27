// src/components/Home.js
import React, { useState } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
const Home = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
      // Check if the product is already in the cart
      const existingItem = cartItems.find(item => item.id === product.id);
  
      if (existingItem) {
        // If the product is already in the cart, update the quantity
        setCartItems(prevCart => prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        // If the product is not in the cart, add it with quantity 1
        setCartItems(prevCart => [...prevCart, { ...product, quantity: 1 }]);
      }
    };
  return (
    <div>
        <ProductList addToCart={addToCart} cartItems={cartItems}/>
      <Cart cartItems={cartItems} />
    </div>
  );
};

export default Home;
