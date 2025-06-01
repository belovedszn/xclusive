/*import React, {useState, useEffect, useRef} from "react";

import iphone from "../../assets/media/iphonepro.png"

function Billboard() {

  const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const totalSlides = 5;
    const slideIntervalRef = useRef(null);
  
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
  }
  
  return (
    <div className="second-box">
      <div className="slider">
        <div className="slides">
          <div className="sec-box">
            <div className="secondbox-link">
              <div className="first-series">
                <img src="../media/1200px-Apple_gray_logo 1.png" />
                <div>iPhone 14 Series</div>
              </div>
              <div className="voucher">Up to 10% off Voucher</div>
              <span>
                <a href="">
                  Shop Now <i className="bi bi-arrow-right"></i>
                </a>
              </span>
            </div>
            <img
              src={iphone}
              className="i14pro"
            />
          </div>

          <div className="sec-box samsung">
            <div className="secondbox-link">
              <div className="first-series">
                <img src="../media/samsung lg.png" />
                <div>Flip 6 Series</div>
              </div>
              <div className="voucher">Up to 10% off Voucher</div>
              <span className="samsung-link">
                <a href="">
                  Shop Now <i className="bi bi-arrow-right"></i>
                </a>
              </span>
            </div>
            <img src={smflipsix} className="img" />
          </div>
          <div className="sec-box apple">
            <div className="secondbox-link">
              <div className="first-series">
                <img src="../media/1200px-Apple_gray_logo 1.png" />
                <div>iWatch Series 7</div>
              </div>
              <div className="voucher">Up to 10% off Voucher</div>
              <span>
                <a href="">
                  Shop Now <i className="bi bi-arrow-right"></i>
                </a>
              </span>
            </div>
            <img src="../media/Rectangle 9.png" className="img" />
          </div>
          <div className="sec-box ps5">
            <div className="secondbox-link">
              <div className="first-series">
                <img src="../media/PS5 logo (1).png" />
                <div>Game 5 Console</div>
              </div>
              <div className="voucher">Up to 10% off Voucher</div>
              <span>
                <a href="">
                  Shop Now <i className="bi bi-arrow-right"></i>
                </a>
              </span>
            </div>
            <img src="../media/ps 5.png" />
          </div>
          <div className="sec-box macbook">
            <div className="secondbox-link">
              <div className="first-series">
                <img src="../media/1200px-Apple_gray_logo 1.png" />
                <div>Macbook Pro 2022</div>
              </div>
              <div className="voucher">Up to 10% off Voucher</div>
              <span>
                <a href="">
                  Shop Now <i className="bi bi-arrow-right"></i>
                </a>
              </span>
            </div>
            <img src="../media/download 1.png" className="img mac-pro" />
          </div>
        </div>

        <div className="dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
}

export default Billboard; */

import React, { useEffect, useRef, useState } from "react";
import sliderData from "../../billboard-items";

const Billboard = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideIntervalRef = useRef(null);

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
                  <a href="">
                    Shop Now <i className="bi bi-arrow-right"></i>
                  </a>
                </span>
              </div>
              <img
                src={slide.img}
                className="img"
                alt={slide.title}
              />
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
