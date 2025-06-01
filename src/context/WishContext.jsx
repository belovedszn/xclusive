import { createContext, useContext, useEffect, useState } from "react";
import {
  wishlist,
  addToWishlist as addToWishlistUtil,
  removeFromWishlist as removeFromWishlistUtil,
  calculateWishlistQuantity,
  subscribeToWishlist,
  saveWishlist,
  //notifyWishSubscribers,
} from "../utils/wish";

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
