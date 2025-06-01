import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSlider } from "../../utils/useSlider";
import { useCart } from "../../context/CartContext";
import { productsApi } from "../../backend/api";

function Related() {
  const [isProduct, setIsProduct] = useState([]);
  const { cartItems, addToCart } = useCart();

  // Slider Refs
  const sliderRef = useRef(null);
  const scrollbarRef = useRef(null);
  const thumbRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  useSlider(sliderRef, scrollbarRef, thumbRef, prevBtnRef, nextBtnRef);

  useEffect(() => {
    fetch("/api/related")
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
    <div className="best-selling">
      <div className="first-box">
        <div className="block"></div>
        <div>Related Items</div>
      </div>
      <div className="second-box">
        <div className="first">
          <div>See Similar Items</div>
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
      <div className="third-box">
        <div className="container">
          <div className="slider-wrapper">
            <div
              className="product-grid js-related"
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
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <div className="image-wrapper">
                          <span></span>
                          <img
                            src={product.image}
                            data-product-id={product.id}
                            className="img-wrap"
                            alt={product.item}
                          />
                          <div
                            className="action-icons"
                            style={{ display: "none" }}
                          >
                            <i
                              className="bi bi-heart hearty addWish"
                              data-product-id={product.id}
                            ></i>
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
          </div>
          <div className="slider-scrollbar" ref={scrollbarRef}>
            <div className="scrollbar-track">
              <div className="scrollbar-thumb" ref={thumbRef}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Related;
