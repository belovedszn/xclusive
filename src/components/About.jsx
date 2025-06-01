import React from "react";
import { Link } from "react-router-dom";
import "../styling/about.css";
import portrait from "../assets/media/portrait.png";
import shoppingBag from "../assets/media/Shopping-bag (2).png";
import sale from "../assets/media/Icon-Sale.png";
import moneyBag from "../assets/media/Icon-Moneybag.png";
import group from "../assets/media/icon-shop.png";

function About() {
  return (
    <div id="main">
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/about">About</Link>
      </div>

      <div className="about-us-container">
        <div className="about-us-box">
          <div className="details-box">
            <div className="details-title">Our Story</div>
            <div className="details-message">
              <span>
                Launced in 2015, Exclusive is South Asia's premier online
                shopping makterplace with an active presense in Bangladesh.
                Supported by wide range of tailored marketing, data and service
                solutions, Exclusive has 10,500 sallers and 300 brands and
                serves 3 millioons customers across the region.
              </span>
              <span>
                Exclusive has more than 1 Million products to offer, growing at
                a very fast. Exclusive offers a diverse assotment in categories
                ranging from consumer.
              </span>
            </div>
          </div>
          <div className="image-box">
            <img src={portrait} alt="" />
          </div>
        </div>
        <div className="last-box">
          <div className="icon-container">
            <div className="icon-box">
              <div className="inner-one">
                <div className="inner-two">
                  <img src={shoppingBag} />
                </div>
              </div>
              <div className="icon-content">
                <h3>10.5K</h3>
                <p>Active sellers on our site</p>
              </div>
            </div>
            <div className="icon-box">
              <div className="sale-one">
                <div className="sale-two">
                  <img src={sale} />
                </div>
              </div>
              <div className="icon-content">
                <h3>33K</h3>
                <p>Monthly products sale</p>
              </div>
            </div>
            <div className="icon-box">
              <div className="inner-one">
                <div className="inner-two">
                  <img src={moneyBag} />
                </div>
              </div>
              <div className="icon-content">
                <h3>45.5K</h3>
                <p>Customer active on our site</p>
              </div>
            </div>
            <div className="icon-box">
              <div className="inner-one">
                <div className="inner-two">
                  <img src={group} />
                </div>
              </div>
              <div className="icon-content">
                <h3>98K</h3>
                <p>Annual gross sale on our site</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
