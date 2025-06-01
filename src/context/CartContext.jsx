import { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addToCart,
  removeFromCart,
  calculateCartQuantity,
  subscribe,
  saveCart,
} from "../utils/cart";

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
