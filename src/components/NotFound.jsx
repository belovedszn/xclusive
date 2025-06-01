import React from "react";
import { Link } from "react-router-dom";
import "../styling/notfound.css";

function NotFound() {
  return (
    <div className="main">
      <div className="not-found">
        <h1>404 Error</h1>
        <span>Sorry, the page you were looking for was not found</span>
        <Link to="/" className="return-back-home">
          Return To Home Page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
