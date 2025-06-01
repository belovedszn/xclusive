/*import React from "react";
import { useState, useEffect } from 'react';
import { cart, removeFromCart, saveCart } from "../utils/wish.js";
import { products } from "../data/product.js";

function Wishlist() {
  return (
    <div class="main">
      <div class="wishlist-container">
        <div class="js-checkout-item"></div>
        <a class="js-move-all-to-cart">Move All To Cart</a>
      </div>
      <div class="third-box">
        <div class="container">
          <div class="slider-wrapper">
            <div class="product-grid js-wishlist" id="autoWidth">
              <div class="product-box">
                <div class="product-card">
                  <div class="image-wrapper">
                    <span class="discoun-t"></span>
                    <img src class="img-wrap" />
                    <div class="action-icons">
                      <i class="bi bi-trash js-delete"></i>
                    </div>
                  </div>
                  <div class="overlay">
                    <button class="buy-btn addCart">Add To Cart</button>
                  </div>
                </div>

                <div class="product-details">
                  <h3 class="product-title"></h3>
                  <div class="price">
                    <span class="discounted-price"></span>
                    <span class="original-price"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="jsEmpty"></div>
    </div>
  );
}

export default Wishlist; */

import React, { useEffect, useState } from "react";
import {
  wishlist,
  removeFromWishlist,
  calculateWishlistQuantity,
  subscribeToWishlist,
  saveWishlist,
} from "../utils/wish.js";
import { addToCart, saveCart, cart } from "../utils/cart.js";
import { products } from "../data/product.js";
import "../styling/wishlist.css";

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

  const renderEmptyState = () => (
    <div className="emptybox">
      <div className="emptywish">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-bag-heart"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"
          />
        </svg>
        <div className="first">Your wishlist is empty</div>
        <div className="second">Save Now, Buy Later!</div>
      </div>
    </div>
  );

  return (
    <div className="main">
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
    </div>
  );
}

export default Wishlist;
