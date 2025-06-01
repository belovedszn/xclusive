import React from "react";
import { Link } from "react-router-dom";
import "../../styling/faq.css";

function FAQ() {
  return (
    <div id="main">
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/faq">Frequenly Asked Questions</Link>
      </div>

      
    </div>
  );
}

export default FAQ;
