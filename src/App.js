import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Contexts
import ProductContext from './contexts/ProductContext.js';
import CartContext from './contexts/CartContext.js';

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);

  const addItem = item => {
    if (!cart.find(cartItem => cartItem.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const removeItem = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  useEffect(() => {
    console.log("here");
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation />

          {/* Routes */}
          <Route exact path="/" component={Products} />

          <Route path="/cart" component={ShoppingCart} />
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
