import { useEffect, useState, useRef } from "react";
import { useCart } from "../../context/CartContext.jsx";
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
              <span className="seconds">{timeLeft.seconds}</span>
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
                          <div
                            className="action-icons"
                            style={{ display: "none" }}
                          >
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
        <Link
          className="btn"
          to={`/all`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          See All Products
        </Link>
      </div>
    </div>
  );
};

export default FlashSale;
