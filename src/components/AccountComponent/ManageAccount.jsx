import React from "react";
import "../../styling/account.css";
import { Link } from "react-router-dom";

function ManageAccount() {
  return (
    <div className="main">
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/account">My Account</Link>
      </div>
    </div>
  );
}

export default ManageAccount;
