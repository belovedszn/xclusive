import React from "react";
import "../../styling/account.css";
import { Link } from "react-router-dom";

function Orders() {
  return (
    <div className="main">
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/orders">My Orders</Link>
      </div>
    </div>
  );
}

export default Orders;
