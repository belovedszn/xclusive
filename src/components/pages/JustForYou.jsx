import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { productsApi } from "../../backend/api.js";
import "../../styling/style.css"

function JustForYou() {
  const [isProduct, setIsProduct] = useState([]);
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    fetch("/api/just-for-you")
      .then((response) => response.json())
      .then((data) => setIsProduct(data.products));
  }, []);

  useEffect(() => {
    const productId = localStorage.getItem("selectedProduct");
    if (productId) {
      productsApi(productId)
        .then((product) => console.log("Fetched product:", product))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, []);

  return (
    <div className="best-selling">
      <div className="first-box" style={{ justifyContent: "space-between" }}>
        <span style={{ alignItems: "center", display: "flex", gap: "20px" }}>
          <div className="block"></div>
          <div>Just For You</div>
        </span>
        <div
          className="see-all"
          style={{ backgroundColor: "transparent", border: "1px solid #ddd" }}
        >
          <Link
            to={`/all`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="btn"
            style={{ fontSize: "16px", color: "white" }}
          >
            See All
          </Link>
        </div>
      </div>

      <div className="third-box">
        <div className="container">
          <div className="slider-wrapper">
            <div className="product-grids just-for-you" id="autoWidth">
              {isProduct.map((product) => {
                const isInCart = cartItems.some(
                  (item) => item.productId === product.id
                );
                return (
                  <div className="product-box" key={product.id}>
                    <div className="product-card">
                      <Link to={`/product/${product.id}`}>
                        <div className="image-wrapper">
                          <span></span>
                          <img
                            src={product.image}
                            alt={product.item}
                            className="img-wrap"
                          />
                          <div
                            className="action-icons"
                            style={{ display: "none" }}
                          >
                            <i className="bi bi-heart hearty addWish"></i>
                            <i className="bi bi-eye hide"></i>
                          </div>
                        </div>
                      </Link>
                      <div className="overlay ">
                        <button
                          className={`buy-btn addCart ${
                            isInCart ? "added" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product.id);
                          }}
                          disabled={isInCart}
                        >
                          {isInCart ? "Added" : "Add To Cart"}
                        </button>
                      </div>
                    </div>
                    <div className="product-details">
                      <h3 className="product-title">{product.item}</h3>
                      <div className="price">
                        <span className="discounted-price">
                          {product.price}
                        </span>
                        <span className="original-price">
                          {product.slashPrice}
                        </span>
                      </div>
                      <div className="rating">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                        <i className="bi bi-star"></i> (65)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JustForYou;
