import React, { useEffect, useRef, useState } from "react";
import sliderData from "../../data/billboard-items";
import { Link } from "react-router-dom";
import { productsApi } from "../../backend/api.js";

const Billboard = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideIntervalRef = useRef(null);
  const [isProduct, setIsProduct] = useState([]);

  const totalSlides = sliderData.length;

  const autoSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const resetInterval = () => {
    clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(autoSlide, 7000);
  };

  const currentSlide = (index) => {
    setSlideIndex(index);
    resetInterval();
  };

  useEffect(() => {
    slideIntervalRef.current = setInterval(autoSlide, 7000);
    return () => clearInterval(slideIntervalRef.current);
  }, []);

  useEffect(() => {
    fetch("/api/billboard")
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
    <div className="second-box">
      <div className="slider">
        <div
          className="slides"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {sliderData.map((slide, index) => (
            <div className={`sec-box ${slide.class}`} key={index}>
              <div className="secondbox-link">
                <div className="first-series">
                  <img src={slide.logo} alt={slide.title} />
                  <div>{slide.title}</div>
                </div>
                <div className="voucher">Up to 10% off Voucher</div>
                <span>
                  <Link to={`/product/${slide.id}`}>
                    Shop Now <i className="bi bi-arrow-right"></i>
                  </Link>
                </span>
              </div>
              <img src={slide.img} className="img" alt={slide.title} />
            </div>
          ))}
        </div>

        <div className="dots">
          {sliderData.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === slideIndex ? "active" : ""}`}
              onClick={() => currentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Billboard;
