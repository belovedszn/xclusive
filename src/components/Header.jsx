import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Xclusive.png";
//import Profile from "./Profile";
import Wishlist from "./Wishlist";
import { useCart } from "../context/CartContext";
import { useWish } from "../context/WishContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const [dropdown, setDropdown] = useState(false);
  const { cartQuantity } = useCart();
  const { wishlistQuantity } = useWish();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleProfile() {
    setDropdown(function (prev) {
      return !prev;
    });
  }

  function handleSearch() {
    if (search.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  }

  return (
    <section>
      <div className="top">
        <div className="empty"></div>
        <div>
          summer sale
          <span> for all swim suits with free express delivery - </span> Off
          50%!
          <Link style={{ borderBottom: "1px solid #e2d9d9" }} to={`/all`}>
            ShopNow
          </Link>
        </div>
        <div className="top-category">
          English <i className="bi bi-chevron-down"></i>
        </div>
      </div>

      <nav className="navbar">
        <div className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div className="navbar-brand">
          <Link to="">
            <img src={logo} className="logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="contact">Contact</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="signup">Sign Up</Link>
          </li>
        </ul>
        <div className="right-nav">
          <div className="search-container">
            <input
              type="text"
              id="searchInput"
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>
              <i className="bi bi-search"></i>
            </button>
          </div>
          <Link to="wishlist" className="cartQ bigHeart">
            <i className="bi bi-heart heart"></i>
            {wishlistQuantity > 0 && (
              <div className="cartQ-item js-wishQ">{wishlistQuantity}</div>
            )}
          </Link>
          <Link to="cart" className="cartQ">
            <i className="bi bi-cart3"></i>
            <div className="cartQ-item js-cartQ">{cartQuantity}</div>
          </Link>

          <div
            className="person profile-icon"
            id="profileIcon"
            onClick={handleProfile}
          >
            <i className="bi bi-person-fill"></i>
          </div>

          <div
            className={`profile-dropdown ${dropdown ? "active" : ""}`}
            onClick={handleProfile}
          >
            <Link to="account">
              <i className="bi bi-person"></i> Manage My Account
            </Link>
            <Link to="orders">
              <i className="bi bi-bag"></i> My Order
            </Link>
            <Link to="cancels">
              <i className="bi bi-x-circle"></i> My Cancellations
            </Link>
            <Link to="reviews">
              <i className="bi bi-star"></i> My Reviews
            </Link>
            <Link to="login">
              <i className="bi bi-box-arrow-right"></i> Logout
            </Link>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Header;

/**
 * <Link to="profile">
            <div class="person profile-icon" id="profileIcon" onClick={handleProfile}>
              <i class="bi bi-person-fill"></i>
            </div>

            <div class="profile-dropdown" id="profileDropdown">
              <a href="#">
                <i class="bi bi-person"></i> Manage My Account
              </a>
              <a href="#">
                <i class="bi bi-bag"></i> My Order
              </a>
              <a href="#">
                <i class="bi bi-x-circle"></i> My Cancellations
              </a>
              <a href="#">
                <i class="bi bi-star"></i> My Reviews
              </a>
              <a href="#">
                <i class="bi bi-box-arrow-right"></i> Logout
              </a>
            </div>
          </Link>
 */
