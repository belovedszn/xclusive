import React, { useEffect, useState } from "react";
import {
  wishlist,
  removeFromWishlist,
  calculateWishlistQuantity,
  subscribeToWishlist,
  saveWishlist,
} from "../utils/wish.js";
import { addToCart, saveCart, getCart, cart } from "../utils/cart.js";
import { products } from "../data/product.js";
import "../styling/wishlist.css";
import WishEmptyState from "./state/WishEmptyState.jsx";
import { Link } from "react-router-dom";
import JustForYou from "./pages/JustForYou.jsx";

function Wishlist() {
  const [wishItems, setWishItems] = useState([...wishlist]);
  const [cartQty, setCartQty] = useState(0);
  const [wishQty, setWishQty] = useState(calculateWishlistQuantity());

  useEffect(() => {
    const unsubscribe = subscribeToWishlist(() => {
      setWishItems([...wishlist]);
      setWishQty(calculateWishlistQuantity());
    });

    updateCartQuantity();
    return unsubscribe;
  }, []);

  function updateCartQuantity() {
    let quantity = 0;
    cart.forEach((item) => {
      quantity += item.quantity;
    });
    setCartQty(quantity);
    saveCart();
  }

  function handleAddToCart(productId) {
    addToCart(productId);
    updateCartQuantity();
  }

  function handleRemove(productId) {
    removeFromWishlist(productId);
  }

  function handleMoveAllToCart() {
    wishItems.forEach((item) => {
      addToCart(item.productId);
    });
    wishlist.splice(0, wishlist.length); // Clear wishlist
    saveWishlist();
    setWishItems([]);
    updateCartQuantity();
  }

  const renderEmptyState = () => <WishEmptyState />;

  return (
    <div className="main" style={{padding: "100px"}}>
      <div className="wishlist-container">
        <div className="js-checkout-item">Wishlist ({wishQty})</div>
        {wishItems.length > 0 && (
          <button className="js-move-all-to-cart" onClick={handleMoveAllToCart}>
            Move All To Cart
          </button>
        )}
      </div>

      <div className="third-box">
        <div className="container">
          <div className="slider-wrapper">
            <div className="product-grid js-wishlist" id="autoWidth">
              {wishItems.map(({ productId }) => {
                const product = products.find((p) => p.id === productId);
                const inCart = cart.some(
                  (item) => item.productId === productId
                );

                if (!product) return null;

                return (
                  <div
                    className={`product-box js-product-box-${product.id}`}
                    key={product.id}
                  >
                    <div className="product-card">
                      <Link to={`/product/${product.id}`}>
                        <div className="image-wrapper">
                          <span className="discoun-t"></span>
                          <img
                            src={product.image}
                            alt={product.item}
                            className="img-wrap"
                          />
                          <div className="action-icons">
                            <i
                              className="bi bi-trash js-delete"
                              onClick={() => handleRemove(product.id)}
                            ></i>
                          </div>
                        </div>
                      </Link>
                      <div className="overlay">
                        <button
                          className="buy-btn addCart"
                          onClick={() => handleAddToCart(product.id)}
                          disabled={inCart}
                        >
                          {inCart ? "Added" : "Add To Cart"}
                        </button>
                      </div>
                    </div>
                    <div className="product-details">
                      <h3 className="product-title">{product.item}</h3>
                      <div className="price">
                        <span className="discounted-price">
                          {product.price}
                        </span>
                        <span className="original-price">
                          {product.slashPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="jsEmpty">
        {wishItems.length === 0 && renderEmptyState()}
      </div>

      <JustForYou />
    </div>
  );
}

export default Wishlist;
