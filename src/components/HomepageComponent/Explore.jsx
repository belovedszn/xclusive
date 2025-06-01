import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { productsApi } from "../../backend/api.js";

function Explore() {
  const [isProduct, setIsProduct] = useState([]);
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    fetch("/api/explore")
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
    <div className="new-product-box">
      <div className="first-box">
        <div className="block"></div>
        <div>Our Products</div>
      </div>
      <div className="second-box">
        <div className="first">
          <div>Explore Our Products</div>
        </div>
      </div>
      <div className="third-box">
        <div className="container">
          <div className="slider-wrapper">
            <div className="product-gri js-explore" id="autoWidth">
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
      <div className="view-all">
        <Link
          to={`/all`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="btn"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}

export default Explore;
