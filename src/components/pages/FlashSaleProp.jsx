/*import React from 'react'

function FlashSaleProp(props) {
    const discount = props.discount
    const image = props.image;
    const item = props.item
    const price = props.price;
    const slashPrice = props.slashPrice

  return (
    <div className="product-box">
                <div className="product-card">
                  <div className="image-wrapper">
                    <span className="discount">{discount}</span>
                    <img src={image} className="img-wrap" />
                    <div className="action-icons">
                      <i className="bi bi-heart hearty addWish"></i>
                      <i className="bi bi-eye hide"></i>
                    </div>
                  </div>
                  <div className="overlay ">
                    <button className="buy-btn addCart">Add To Cart</button>
                  </div>
                </div>
                <div className="product-details">
                  <h3 className="product-title">{item}</h3>
                  <div className="price">
                    <span className="discounted-price">{price}</span>
                    <span className="original-price">{slashPrice}</span>
                  </div>
                  <div className="rating">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                    <i className="bi bi-star"></i> (65)
                  </div>
                </div>
              </div>
  )
}

export default FlashSaleProp */

// updated code 2.0

import React from 'react';
import { useCart } from '../../context/CartContext';
import { addToCart } from '../../utils/cart';

function FlashSaleProp(props) {
  const { cartItems, cartQuantity } = useCart();
  const productId = props.id; 

  const isInCart = cartItems.some(item => item.productId === productId);

  const handleAddToCart = () => {
    addToCart(productId);
    // No need to manually update state - the subscription in CartContext will handle it
  };

  return (
    <div className="product-box">
      <div className="product-card">
        <div className="image-wrapper">
          <span className="discount">{props.discount}</span>
          <img src={props.image} className="img-wrap" alt={props.item} />
          <div className="action-icons">
            <i className="bi bi-heart hearty addWish"></i>
            <i className="bi bi-eye hide"></i>
          </div>
        </div>
        <div className="overlay">
          <button 
            className={`buy-btn addCart ${isInCart ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart ? "Added" : "Add To Cart"}
          </button>
        </div>
      </div>
      <div className="product-details">
        <h3 className="product-title">{props.item}</h3>
        <div className="price">
          <span className="discounted-price">{props.price}</span>
          <span className="original-price">{props.slashPrice}</span>
        </div>
        <div className="rating">
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-half"></i>
          <i className="bi bi-star"></i> (65)
        </div>
      </div>
    </div>
  );
}

export default FlashSaleProp;