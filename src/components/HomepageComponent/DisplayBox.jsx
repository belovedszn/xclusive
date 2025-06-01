import React, { useEffect, useRef, useState } from "react";
import boomBoxByJBL from "../../assets/media/JBL-BOOMBOX.png";
import { useDisplayTimer } from "../../utils/useTimer";
import sliderData from "../../data/display-board";
import "../../styling/displayBox.css";
import { productsApi } from "../../backend/api";
import { Link } from "react-router-dom";

function DisplayBox() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideIntervalRef = useRef(null);
  const timeLeft = useDisplayTimer();
  const [isProduct, setIsProduct] = useState([]);

  const totalSlides = sliderData.length;

  const autoSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const resetInterval = () => {
    clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(autoSlide, 3000);
  };

  const currentSlide = (index) => {
    setSlideIndex(index);
    resetInterval();
  };

  useEffect(() => {
    slideIntervalRef.current = setInterval(autoSlide, 3000);
    return () => clearInterval(slideIntervalRef.current);
  }, []);

  useEffect(() => {
    fetch("/api/display-board")
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
    <div className="display-box">
      <div
        className="displayBox-slider"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          className="displayBox-slides"
          style={{
            transform: `translateX(-${slideIndex * 100}%)`,
            display: "flex",
          }}
        >
          {sliderData.map((slide, index) => (
            <div className="jbl-box" key={index}>
              <div className="jbl-content">
                <div className="p">Categories</div>
                <div className="h3">{slide.title}</div>
                <div className="countdown">
                  <div className="time">
                    <span id="days">{timeLeft.days}</span>
                    <p>Days</p>
                  </div>
                  <div className="time">
                    <span id="hours">{timeLeft.hours}</span>
                    <p>Hours</p>
                  </div>
                  <div className="time">
                    <span id="minutes">{timeLeft.minutes}</span>
                    <p>Minutes</p>
                  </div>
                  <div className="time">
                    <span id="seconds" className="seconds">
                      {timeLeft.seconds}
                    </span>
                    <p>Seconds</p>
                  </div>
                </div>
                <Link className="btn" to={`/product/${slide.id}`}>
                  Buy Now!
                </Link>
              </div>
              <img src={slide.img} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayBox;
