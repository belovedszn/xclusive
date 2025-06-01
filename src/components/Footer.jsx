import React from "react";
import qr from "../assets/media/Qrcode.png";
import google from "../assets/media/google-playstore.png";
import apple from "../assets/media/download-appstore.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>Exclusive</h3>
          <p>Subscribe</p>
          <p>Get 10% off your first order</p>
          <div className="subscribe">
            <div className="inputBox">
              <input type="email" placeholder="Enter your email" />
              <i className="material-symbols-outlined bi bi-send"></i>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <p>Maryland, Lagos, Nigeria</p>
          <Link to={``} className="mailto">
            emmanuelbeloved35@gmail.com
          </Link>
          <Link to={``}>+88015-88888-9999</Link>
        </div>

        <div className="footer-section">
          <h3>Account</h3>
          <ul>
            <li>
              <Link
                to={`/account`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                My Account
              </Link>
            </li>
            <li>
              <Link
                to={`/login`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Login / Register
              </Link>
            </li>
            <li>
              <Link
                to={`/cart`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to={`/wishlist`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                to={`/all`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Shop
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Link</h3>
          <ul>
            <li>
              <Link
                to={`/privacy-policy`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to={`/privacy-policy`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Terms Of Use
              </Link>
            </li>
            <li>
              <Link
                to={`faq`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to={`/contact`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Download App</h3>
          <p>Save $3 with App New User Only</p>
          <div className="app-qr">
            <img src={qr} />
            <div className="app-stores">
              <img src={google} />
              <img src={apple} />
            </div>
          </div>
          <div className="social-media">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-linkedin"></i>
          </div>
        </div>
      </div>
      <p className="copyright">© Copyright Rimel 2022. All rights reserved</p>
    </footer>
  );
}

export default Footer;
