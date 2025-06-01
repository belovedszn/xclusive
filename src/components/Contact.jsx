import React from "react";
import { Link } from "react-router-dom";
import "../styling/contact.css";

function Contact() {
  return (
    <div id="main">
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="contact-container">
        <div className="first-box">
          <div className="call">
            <div className="first">
              <div>
                <span className="icon-wrapper">
                  <i className="bi bi-telephone"></i>
                </span>
                <span>Call To Us</span>
              </div>
            </div>
            <div className="second">
              <span>We are available 24/7, 7 days a week.</span>
              <span>Phone: +2349134778794</span>
            </div>
          </div>
          <div className="write">
            <div className="first">
              <div>
                <span className="icon-wrapper">
                  <i className="bi bi-envelope"></i>
                </span>
                <span>Write To Us</span>
              </div>
            </div>
            <div className="second">
              <span>
                Fill out our form and we will contact you within 24 hours
              </span>
              <span>Email: emmanuelbeloved35@gmail.com</span>
              <span>Email: belovedmakaveli@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="second-box">
          <div className="details-area">
            <div className="credentials">
              <input type="email" placeholder="Your Name *" />
            </div>
            <div className="credentials">
              <input type="email" placeholder="Your Email *" />
            </div>
            <div className="credentials">
              <input type="number" placeholder="Your Number *" />
            </div>
          </div>
          <div className="message-box">
            <form>
              <textarea
                name="message"
                id="message"
                placeholder="Your Message..."
              ></textarea>
            </form>
          </div>
          <div className="send-message">
            <span></span>
            <button>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
