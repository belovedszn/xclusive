/*import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("Xcart")) || []);

  const saveCart = () => {
    localStorage.setItem("Xcart", JSON.stringify(cart));
  };

  const addToCart = (productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { productId, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = () => {
    const quantity = cart.reduce((total, item) => total + item.quantity, 0);
    const cartQElement = document.querySelector(".js-cartQ");
    if (cartQElement) {
      cartQElement.innerHTML = quantity;
    }
    saveCart();
  };

  useEffect(() => {
    saveCart();
    updateCartQuantity();
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, saveCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};*/

// update code 2.0

/*

import { createContext, useContext, useEffect, useState } from 'react';
import { cart, calculateCartQuantity, subscribe } from './utils/cart';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Initialize cart state
    setCartQuantity(calculateCartQuantity());
    setCartItems([...cart]);

    // Subscribe to cart changes
    const unsubscribe = subscribe(() => {
      setCartQuantity(calculateCartQuantity());
      setCartItems([...cart]);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    cartQuantity,
    cartItems,
    // Add other cart-related functions if needed
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}*/

// updated code 3.0

/*

import { createContext, useContext, useEffect, useState } from 'react';
import { cart, addToCart, calculateCartQuantity, subscribe } from './utils/cart';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartState, setCartState] = useState({
    items: [...cart],
    quantity: calculateCartQuantity()
  });

  useEffect(() => {
    // Initialize cart
    updateCartState();
    
    // Subscribe to changes
    const unsubscribe = subscribe(updateCartState);
    return unsubscribe;
  }, []);

  const updateCartState = () => {
    setCartState({
      items: [...cart],
      quantity: calculateCartQuantity()
    });
  };

  const handleAddToCart = (productId) => {
    addToCart(productId);
    // No need to manually update - subscription will handle it
  };

  return (
    <CartContext.Provider value={{ ...cartState, handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} */

import { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addToCart,
  removeFromCart,
  calculateCartQuantity,
  subscribe,
  saveCart,
} from "./utils/cart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartState, setCartState] = useState({
    items: [...getCart()],
    quantity: calculateCartQuantity(),
  });

  // Initialize and subscribe to cart changes
  useEffect(() => {
    const updateCartState = () => {
      setCartState({
        items: [...getCart()],
        quantity: calculateCartQuantity(),
      });
    };

    updateCartState(); // Initial update

    // Subscribe to future changes
    const unsubscribe = subscribe(updateCartState);
    return () => unsubscribe();
  }, []);

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState.items,
        cartQuantity: cartState.quantity,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
