import React from "react";
import { Link } from "react-router-dom";
import "../../styling/faq.css";

function PrivacyPolicy() {
  return (
    <div className="main">
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
    </div>
  );
}

export default PrivacyPolicy;