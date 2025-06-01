/*import { createContext, useContext, useEffect, useState } from "react";
import {
  wishlist,
  addToWishlist,
  removeFromWishlist,
  calculateWishlistQuantity,
  subscribeToWishlist,
  saveWishlist,
} from "./utils/wish";

const WishContext = createContext();

export function WishProvider({ children }) {
  const [wishState, setWishState] = useState({
    items: [...wishlist],
    quantity: calculateWishlistQuantity(),
  });

  // Initialize and subscribe to wish changes
  useEffect(() => {
    const updateWishState = () => {
      setWishState({
        items: [...wishlist],
        quantity: calculateWishlistQuantity(),
      });
    };

    updateWishState(); // Initial update

    // Subscribe to future changes
    const unsubscribe = subscribeToWishlist(updateWishState);
    return () => unsubscribe();
  }, []);

  const handleAddToWish = (productId) => {
    addToWishlist(productId);
  };

  const handleRemoveFromWish = (productId) => {
    removeFromWishlist(productId);
  };

  return (
    <WishContext.Provider
      value={{
        wishItems: wishState.items,
        wishQuantity: wishState.quantity,
        addToWishlist: handleAddToWish,
        removeFromWishlist: handleRemoveFromWish,
      }}
    >
      {children}
    </WishContext.Provider>
  );
}

export function useWish() {
  const context = useContext(WishContext);
  if (!context) {
    throw new Error("useWish must be used within a WishProvider");
  }
  return context;
} 

  import { createContext, useContext, useEffect, useState } from "react";
  import {
    wishlist,
    subscribeToWishlist,
    calculateWishlistQuantity,
  } from "./utils/wish";
  
  const WishContext = createContext();
  
  export function WishProvider({ children }) {
    const [wishState, setWishState] = useState({
      items: [...wishlist],
      quantity: calculateWishlistQuantity(),
    });
  
    useEffect(() => {
      const unsubscribe = subscribeToWishlist(() => {
        // Create new array references to force re-render
        setWishState({
          items: [...wishlist],
          quantity: calculateWishlistQuantity(),
        });
      });
  
      return () => unsubscribe();
    }, []);
  
    const addToWishlist = (productId) => {
      const exists = wishlist.some(item => item.productId === productId);
      if (!exists) {
        wishlist.push({ productId, quantity: 1 });
        saveWishlist();
        notifyWishSubscribers();
      }
    };
  
    const removeFromWishlist = (productId) => {
      const index = wishlist.findIndex(item => item.productId === productId);
      if (index !== -1) {
        wishlist.splice(index, 1);
        saveWishlist();
        notifyWishSubscribers();
      }
    };
  
    return (
      <WishContext.Provider
        value={{
          wishItems: wishState.items,
          wishlistQuantity: wishState.quantity,
          addToWishlist,
          removeFromWishlist,
        }}
      >
        {children}
      </WishContext.Provider>
    );
  }
  
  export function useWish() {
    const context = useContext(WishContext);
    if (!context) {
      throw new Error("useWish must be used within a WishProvider");
    }
    return context;
  } */

import { createContext, useContext, useEffect, useState } from "react";
import {
  wishlist,
  addToWishlist as addToWishlistUtil,
  removeFromWishlist as removeFromWishlistUtil,
  calculateWishlistQuantity,
  subscribeToWishlist,
  saveWishlist,
  //notifyWishSubscribers,
} from "./utils/wish";

const WishContext = createContext();

export function WishProvider({ children }) {
  const [wishState, setWishState] = useState({
    items: [...wishlist],
    quantity: calculateWishlistQuantity(),
  });

  const addToWishlist = (productId) => {
    addToWishlistUtil(productId);
    saveWishlist();
  //  notifyWishSubscribers();
  };

  const removeFromWishlist = (productId) => {
    removeFromWishlistUtil(productId);
    saveWishlist();
  //  notifyWishSubscribers();
  };

  useEffect(() => {
    const unsubscribe = subscribeToWishlist(() => {
      setWishState({
        items: [...wishlist],
        quantity: calculateWishlistQuantity(),
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <WishContext.Provider
      value={{
        wishItems: wishState.items,
        wishlistQuantity: wishState.quantity,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishContext.Provider>
  );
}

export function useWish() {
  const context = useContext(WishContext);
  if (!context) {
    throw new Error("useWish must be used within a WishProvider");
  }
  return context;
}
