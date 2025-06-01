/*import { useState, useEffect } from 'react';
import { products } from "../../data/flash-sale.js";
import { cart, addToCart, saveCart } from "../../utils/cart.js";

const FlashSale = () => {
  const [productsHTML, setProductsHTML] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(
    // Initialize from localStorage
    JSON.parse(localStorage.getItem("Xcart"))?.reduce((total, item) => total + item.quantity, 0) || 0
  );

  useEffect(() => {
    // Generate product HTML
    const generatedHTML = products.map((product) => {
      const isInCart = cart.some(item => item.productId === product.id);
      
      return (
        <div className="product-box" key={product.id}>
          <div className="product-card">
            <div className="image-wrapper">
              <span className="discount">{product.discount}</span>
              <img 
                src={product.image} 
                className="img-wrap" 
                onClick={() => handleProductClick(product.id)}
              />
              <div className="action-icons">
                <i className="bi bi-heart hearty"></i>
                <i className="bi bi-eye hide"></i>
              </div>
            </div>
            <div className="overlay">
              <button 
                className={`buy-btn addCart ${isInCart ? 'added' : ''}`}
                onClick={() => handleAddToCart(product.id)}
                disabled={isInCart}
              >
                {isInCart ? "Added" : "Add To Cart"}
              </button>
            </div>
          </div>
          <div className="product-details">
            <h3 className="product-title">{product.item}</h3>
            <div className="price">
              <span className="discounted-price">{product.price}</span>
              <span className="original-price">{product.slashPrice}</span>
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
    });

    setProductsHTML(generatedHTML);
  }, [cartQuantity]); // Re-render when cartQuantity changes

  const handleAddToCart = (productId) => {
    addToCart(productId);
    saveCart();
    // Update cartQuantity state to trigger re-render
    setCartQuantity(cart.reduce((total, item) => total + item.quantity, 0));
  };

  const handleProductClick = (productId) => {
    localStorage.setItem("selectedProduct", productId);
    window.location.href = "/product"; // Update route if using React Router
  };

  return (
    <div className="product-grid js-flash-sale" id="autoWidth">
      {productsHTML}
    </div>
  );
};

export default FlashSale; */

// update code 2.0

/*

import { useState, useEffect } from 'react';
import { products } from "../../data/flash-sale.js";
import { cart, addToCart, calculateCartQuantity } from "../../utils/cart.js";

const FlashSale = () => {
  const [productsHTML, setProductsHTML] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(calculateCartQuantity());

  useEffect(() => {
    // Generate product HTML
    const generatedHTML = products.map((product) => {
      const isInCart = cart.some(item => item.productId === product.id);
      
      return (
        <div className="product-box" key={product.id}>
          <div className="product-card">
            <div className="image-wrapper">
              <span className="discount">{product.discount}</span>
              <img 
                src={product.image} 
                className="img-wrap" 
                onClick={() => handleProductClick(product.id)}
                alt={product.item}
              />
              <div className="action-icons">
                <i className="bi bi-heart hearty"></i>
                <i className="bi bi-eye hide"></i>
              </div>
            </div>
            <div className="overlay">
              <button 
                className={`buy-btn addCart ${isInCart ? 'added' : ''}`}
                onClick={() => handleAddToCart(product.id)}
                disabled={isInCart}
              >
                {isInCart ? "Added" : "Add To Cart"}
              </button>
            </div>
          </div>
          <div className="product-details">
            <h3 className="product-title">{product.item}</h3>
            <div className="price">
              <span className="discounted-price">{product.price}</span>
              <span className="original-price">{product.slashPrice}</span>
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
    });

    setProductsHTML(generatedHTML);
  }, [cartQuantity]);

  const handleAddToCart = (productId) => {
    addToCart(productId);
    // Update cart quantity state to trigger re-render
    setCartQuantity(calculateCartQuantity());
  };

  const handleProductClick = (productId) => {
    localStorage.setItem("selectedProduct", productId);
    window.location.href = "/product";
  };

  return (
    <div className="product-grid js-flash-sale" id="autoWidth">
      {productsHTML}
    </div>
  );
};

export default FlashSale; */

// update 3.0

/*
import { useState, useEffect } from 'react';
import { products } from "../../data/flash-sale.js";
import { cart, addToCart, calculateCartQuantity, subscribe } from "../../utils/cart.js";

const FlashSale = () => {
  const [productsHTML, setProductsHTML] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);

  // Initialize and subscribe to cart changes
  useEffect(() => {
    // Set initial quantity
    setCartQuantity(calculateCartQuantity());
    
    // Subscribe to cart changes
    const unsubscribe = subscribe(() => {
      setCartQuantity(calculateCartQuantity());
    });
    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const generatedHTML = products.map((product) => {
      const isInCart = cart.some(item => item.productId === product.id);
      
      return (
        <div className="product-box" key={product.id}>
          <div className="product-card">
            <div className="image-wrapper">
              <span className="discount">{product.discount}</span>
              <img 
                src={product.image} 
                className="img-wrap" 
                onClick={() => handleProductClick(product.id)}
                alt={product.item}
              />
              <div className="action-icons">
                <i className="bi bi-heart hearty"></i>
                <i className="bi bi-eye hide"></i>
              </div>
            </div>
            <div className="overlay">
              <button 
                className={`buy-btn addCart ${isInCart ? 'added' : ''}`}
                onClick={() => handleAddToCart(product.id)}
                disabled={isInCart}
              >
                {isInCart ? "Added" : "Add To Cart"}
              </button>
            </div>
          </div>
          <div className="product-details">
            <h3 className="product-title">{product.item}</h3>
            <div className="price">
              <span className="discounted-price">{product.price}</span>
              <span className="original-price">{product.slashPrice}</span>
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
    });

    setProductsHTML(generatedHTML);
  }, [cartQuantity]);

  const handleAddToCart = (productId) => {
    addToCart(productId);
    // No need to manually update here - the subscription will handle it
  };

  const handleProductClick = (productId) => {
    localStorage.setItem("selectedProduct", productId);
    window.location.href = "/product";
  };

  return (
    <div className="product-grid js-flash-sale" id="autoWidth">
      {productsHTML}
    </div>
  );
};

export default FlashSale; */

// 4.0

/*

import { useState, useEffect } from 'react';
import { products } from "../../data/flash-sale.js";
import { cart, addToCart, calculateCartQuantity, subscribe } from "../../utils/cart.js";
import { useCart } from '../../CartContext.jsx'; // Import the context

const FlashSale = () => {
  const [productsHTML, setProductsHTML] = useState([]);
  const { cartItems, cartQuantity } = useCart(); // Get cart state from context

  // Generate product HTML whenever cartItems changes
  useEffect(() => {
    const generatedHTML = products.map((product) => {
      const isInCart = cartItems.some(item => item.productId === product.id);
      
      return (
        <div className="product-box" key={product.id}>
          <div className="product-card">
            <div className="image-wrapper">
              <span className="discount">{product.discount}</span>
              <img 
                src={product.image} 
                className="img-wrap" 
                onClick={() => handleProductClick(product.id)}
                alt={product.item}
              />
              <div className="action-icons">
                <i className="bi bi-heart hearty"></i>
                <i className="bi bi-eye hide"></i>
              </div>
            </div>
            <div className="overlay">
              <button 
                className={`buy-btn addCart ${isInCart ? 'added' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product.id);
                }}
                disabled={isInCart}
              >
                {isInCart ? "Added" : "Add To Cart"}
              </button>
            </div>
          </div>
          <div className="product-details">
            <h3 className="product-title">{product.item}</h3>
            <div className="price">
              <span className="discounted-price">{product.price}</span>
              <span className="original-price">{product.slashPrice}</span>
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
    });

    setProductsHTML(generatedHTML);
  }, [cartItems]); // Re-render when cartItems changes

  const handleAddToCart = (productId) => {
    addToCart(productId);
    // The CartContext subscription will automatically update the UI
  };

  const handleProductClick = (productId) => {
    localStorage.setItem("selectedProduct", productId);
    window.location.href = "/product";
  };

  return (
    <div className="product-grid js-flash-sale" id="autoWidth">
      {productsHTML}
    </div>
  );
};

export default FlashSale; */

//....
/*
import { useEffect, useState } from 'react';
import { products } from "../../data/flash-sale.js";
import { useCart } from "../../CartContext.jsx";

const FlashSale = () => {
  const [productsHTML, setProductsHTML] = useState([]);
  const { items: cartItems, quantity: cartQuantity, handleAddToCart } = useCart();

  useEffect(() => {
    const generatedHTML = products.map((product) => {
      const isInCart = cartItems.some(item => item.productId === product.id);
      
      return (
        <div className="product-box" key={product.id}>
          <div className="product-card">
            <div className="image-wrapper">
              <span className="discount">{product.discount}</span>
              <img 
                src={product.image} 
                className="img-wrap" 
                onClick={() => handleProductClick(product.id)}
                alt={product.item}
              />
              <div className="action-icons">
                <i className="bi bi-heart hearty"></i>
                <i className="bi bi-eye hide"></i>
              </div>
            </div>
            <div className="overlay">
              <button 
                className={`buy-btn addCart ${isInCart ? 'added' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product.id);
                }}
                disabled={isInCart}
              >
                {isInCart ? "Added" : "Add To Cart"}
              </button>
            </div>
          </div>
          <div className="product-details">
            <h3 className="product-title">{product.item}</h3>
            <div className="price">
              <span className="discounted-price">{product.price}</span>
              <span className="original-price">{product.slashPrice}</span>
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
    });

    setProductsHTML(generatedHTML);
  }, [cartItems]); // Re-render when cart items change

  const handleProductClick = (productId) => {
    localStorage.setItem("selectedProduct", productId);
    window.location.href = "/product";
  };

  return (
    <div className="product-grid js-flash-sale" id="autoWidth">
      {productsHTML}
    </div>
  );
};

export default FlashSale; 

import { useEffect, useState } from "react";
//import { products } from "../../data/flash-sale.js";
import { useCart } from "../../CartContext";

import { data, Link } from "react-router-dom";
import { productsApi } from "../../backend/api.js";

const FlashSale = () => {
  const [productsHTML, setProductsHTML] = useState([]);
  const { cartItems, cartQuantity, addToCart } = useCart();
  const [isProduct, setIsProduct] = useState([]);

  /* useEffect(() => {
    fetch("/api/products")
      .then(response => response.json())
      .then(data => setIsProduct(data.products));
  }, []); 

  useEffect(() => {
    fetch("/api/flash-sale")
      .then((response) => response.json())
      .then((data) => setIsProduct(data.products));
  }, []);

  useEffect(() => {
    const productId = localStorage.getItem("selectedProduct");

    if (productId) {
      productsApi(productId)
        .then((product) => {
          // You can set this to a state if needed
          console.log("Fetched product:", product);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, []);

  useEffect(() => {
    const generatedHTML = isProduct.map((product) => {
      const isInCart = cartItems.some((item) => item.productId === product.id);

      //  let productsElement = product

      return (
        <div className="product-box" key={product.id}>
          <div className="product-card">
            <Link to={`/product/${product.id}`}>
              <div className="image-wrapper">
                <span className="discount">{product.discount}</span>
                <img
                  src={product.image}
                  className="img-wrap"
                  // onClick={() => handleProductClick(product.id)}
                  alt={product.item}
                />
                <div className="action-icons">
                  <i className="bi bi-heart hearty"></i>
                  <i className="bi bi-eye hide"></i>
                </div>
              </div>
            </Link>
            <div className="overlay">
              <button
                className={`buy-btn addCart ${isInCart ? "added" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product.id);
                }}
                disabled={isInCart}
              >
                {isInCart ? "Added" : "Add To Cart"}
              </button>
            </div>
          </div>

          <div className="product-details">
            <h3 className="product-title">{product.item}</h3>
            <div className="price">
              <span className="discounted-price">{product.price}</span>
              <span className="original-price">{product.slashPrice}</span>
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
    });

    setProductsHTML(generatedHTML);
  }, [cartItems, addToCart, isProduct]);

  /* const handleProductClick = (productId) => {
    localStorage.setItem("selectedProduct", productId);
    window.location.href = "/product";
  }; 

  return (
    
    <div className="product-grid js-flash-sale" id="autoWidth">
      {productsHTML}
    </div>
  );
};

export default FlashSale; */

import { useEffect, useState, useRef } from "react";
import { useCart } from "../../CartContext";
import { Link } from "react-router-dom";
import { productsApi } from "../../backend/api.js";
import { useCountdown } from "../../utils/useTimer.js";
import { useSlider } from "../../utils/useSlider.js";

const FlashSale = () => {
  const [isProduct, setIsProduct] = useState([]);
  const { cartItems, addToCart } = useCart();
  const timeLeft = useCountdown();

  // Slider Refs
  const sliderRef = useRef(null);
  const scrollbarRef = useRef(null);
  const thumbRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  useSlider(sliderRef, scrollbarRef, thumbRef, prevBtnRef, nextBtnRef);

  useEffect(() => {
    fetch("/api/flash-sale")
      .then((response) => response.json())
      .then((data) => setIsProduct(data.products));
  }, []);

  useEffect(() => {
    const productId = localStorage.getItem("selectedProduct");
    if (productId) {
      productsApi(productId)
        .then((product) => console.log("Fetched product:", product))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, []);

  return (
    <div className="second-page">
      {/* Header Section */}
      <div className="first-box">
        <div className="block"></div>
        <div>Today's</div>
      </div>

      {/* Title & Countdown + Arrows */}
      <div className="second-box">
        <div className="first">
          <div>Flash Sales</div>
          <div className="countdown">
            <div className="time">
              <p>Days</p>
              <span>{timeLeft.days}</span>
            </div>
            <div className="time">
              <p>Hours</p>
              <span>{timeLeft.hours}</span>
            </div>
            <div className="time">
              <p>Minutes</p>
              <span>{timeLeft.minutes}</span>
            </div>
            <div className="time">
              <p>Seconds</p>
              <span>{timeLeft.seconds}</span>
            </div>
          </div>
        </div>
        <div className="arrow">
          <i
            className="bi bi-arrow-left arrows prev slide-btn"
            id="prev-slide"
            ref={prevBtnRef}
          ></i>
          <i
            className="bi bi-arrow-right arrows next slide-btn"
            id="next-slide"
            ref={nextBtnRef}
          ></i>
        </div>
      </div>

      {/* Product Slider */}
      <div className="third-box">
        <div className="container">
          <div className="slider-wrapper">
            <div
              className="product-grid js-flash-sale"
              id="autoWidth"
              ref={sliderRef}
            >
              {isProduct.map((product) => {
                const isInCart = cartItems.some(
                  (item) => item.productId === product.id
                );

                return (
                  <div className="product-box" key={product.id}>
                    <div className="product-card">
                      <Link to={`/product/${product.id}`}>
                        <div className="image-wrapper">
                          <span className="discount">{product.discount}</span>
                          <img
                            src={product.image}
                            className="img-wrap"
                            alt={product.item}
                          />
                          <div className="action-icons" style={{display: "none"}}>
                            <i className="bi bi-heart hearty"></i>
                            <i className="bi bi-eye hide"></i>
                          </div>
                        </div>
                      </Link>
                      <div className="overlay">
                        <button
                          className={`buy-btn addCart ${
                            isInCart ? "added" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product.id);
                          }}
                          disabled={isInCart}
                        >
                          {isInCart ? "Added" : "Add To Cart"}
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
              })}
            </div>

            {/* Custom Scrollbar */}
            <div className="slider-scrollbar" ref={scrollbarRef}>
              <div className="scrollbar-track">
                <div className="scrollbar-thumb" ref={thumbRef}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View All Button */}
      <div className="view-all">
        <button>View All Products</button>
      </div>
    </div>
  );
};

export default FlashSale;
