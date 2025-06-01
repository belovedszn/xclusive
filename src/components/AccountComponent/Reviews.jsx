import React from "react";
import "../../styling/account.css";
import { Link } from "react-router-dom";

function Reviews() {
  return (
    <div className="main">
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/reviews">My Reviews</Link>
      </div>
    </div>
  );
}

export default Reviews;