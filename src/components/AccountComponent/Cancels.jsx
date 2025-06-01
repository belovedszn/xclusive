import React from "react";
import "../../styling/account.css";
import { Link } from "react-router-dom";

function Cancels() {
  return (
    <div id="main">
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/cancels">Cancelled Orders</Link>
      </div>
    </div>
  );
}

export default Cancels;
