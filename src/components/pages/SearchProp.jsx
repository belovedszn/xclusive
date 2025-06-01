import React from "react";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { addToCart } from "../../utils/cart";
import "../../styling/search.css";
import { Link } from "react-router-dom";

function SearchProp(props) {
  const { cartItems, cartQuantity } = useCart();
  const productId = props.id;

  const isInCart = cartItems.some((item) => item.productId === productId);

  const handleAddToCart = () => {
    addToCart(productId);
  };

  

  return (
    <div className="search-box">
      <div className="search-product-card">
        <Link to={`/product/${props.id}`}>
          <div className="search-image-wrapper">
            <img src={props.image} className="search-img-wrap" alt={props.item} />
            <div className="action-icons" style={{ display: "none" }}>
              <i className="bi bi-heart hearty addWish"></i>
              <i className="bi bi-eye hide"></i>
            </div>
          </div>
        </Link>
        <div className="search-overlay">
          <button
            className={`search-buy-btn addCart ${isInCart ? "added" : ""}`}
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart ? "Added" : "Add To Cart"}
          </button>
        </div>
      </div>
      <div className="search-product-details">
        <h3 className="search-product-title">{props.item}</h3>
        <div className="search-price">
          <span className="search-discounted-price">{props.price}</span>
          <span className="search-original-price">{props.slashPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default SearchProp;