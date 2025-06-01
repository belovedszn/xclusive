import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productsApi } from "../../backend/api";
import "../../styling/product.css";
import returnIcon from "../../assets/media/Icon-return.png";
import deliveryIcon from "../../assets/media/icon-delivery.png";
import {
  addToCart,
  updateCartQuantity,
  getCart,
  subscribe as subscribeToCart,
  removeFromCart,
  cart,
} from "../../utils/cart.js";
import {
  toggleWish,
  wishlist as wish,
  saveWishlist,
  calculateWishlistQuantity,
} from "../../utils/wish.js";
import { useWish } from "../../context/WishContext.jsx";
import Related from "./Related.jsx";
import { ThreeDot } from "react-loading-indicators";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { wishItems, wishlistQuantity, addToWishlist, removeFromWishlist } =
    useWish();
  const [isProduct, setIsProduct] = useState([]);
  const loadPage = useRef(null);

  useEffect(() => {
    if (product) {
      const cartItem = cart.find((item) => item.productId === product.id);
      setQuantity(cartItem ? cartItem.quantity : 0);
      const isItemInWishlist = wish.some(
        (item) => item.productId === product.id
      );
    }
  }, [product]);

  const isFavourite = wishItems.some((item) => item.productId === product?.id);
  const favourite = isFavourite ? "bi-heart-fill" : "bi-heart";

  function handleFavorite() {
    if (!product) return;

    const isFavourite = wishItems.some((item) => item.productId === product.id);
    if (isFavourite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  }

  function handleIncreaseQuantity() {
    if (!product) return;

    const cartItem = cart.find((item) => item.productId === product.id);

    if (cartItem) {
      updateCartQuantity(product.id, "increase");
    } else {
      addToCart(product.id, 1);
    }
  }

  function handleDecreaseQuantity() {
    if (!product) return;
    const cartItem = cart.find((item) => item.productId === product.id);

    if (!cartItem) return;
    if (cartItem.quantity > 0) {
      updateCartQuantity(product.id, "decrease");
    } else {
      removeFromCart(product.id);
    }
  }

  function handleBuyNow() {
    if (!product) return;

    const cartItem = cart.find((item) => item.productId === product.id);

    if (!cartItem) {
      addToCart(product.id, Math.max(1, quantity));
    }
    navigate("/cart");
  }

  function handleAddToCart() {
    if (!product) return;

    const cartItem = cart.find((item) => item.productId === product.id);

    if (!cartItem) {
      addToCart(product.id, Math.max(1, quantity));
    }
    // Optional: show a notification here
  }

  useEffect(() => {
    const unsubscribe = subscribeToCart(() => {
      if (product) {
        const cartItem = cart.find((item) => item.productId === product.id);

        setQuantity(cartItem ? cartItem.quantity : 1);
      }
    });

    return () => unsubscribe();
  }, [product]);

  useEffect(() => {
    productsApi(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [id]);

  if (error) return <div>Error: {error.message}</div>;
  if (!product)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThreeDot
          color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]}
          size="large"
        />
      </div>
    );

  const galleryImages = product.galleryImages || [];
  const colors = product.colors || [];
  const sizes = product.sizes || [];

  return (
    <div className="main">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <span>View Product</span>
        <span> / </span>
        <span>{product?.item}</span>
      </div>
      <div className="product-container viewProduct">
        <div className="product-details">
          <div className="image-gallery">
            {galleryImages.map((img, index) => (
              <div className="sideimg-box" key={index}>
                <img
                  src={img}
                  className={`thumbnail img-${index + 1}`}
                  data-transform={`rotate(${30 * (index + 1)}deg)`}
                  alt={`Thumbnail ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="main-image">
            <img
              src={product.image}
              alt={product.item}
              className="mainImage"
              id="mainImage"
            />
          </div>

          <div className="details">
            <h2>{product.item}</h2>
            <div className="reviews">
              <span>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star"></i>
              </span>
              <span>(65 Reviews)</span>
              <span className="stock-status">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <p className="price">{product.price}</p>
            <p className="description">
              {product.description || "No description available"}
            </p>
            <div className="options">
              <div className="colours">
                <span>Colours:</span>
                {colors.length > 0 ? (
                  colors.map((color, idx) => (
                    <label key={idx} className={`color ${color}`}>
                      <input
                        type="radio"
                        name="color"
                        defaultChecked={idx === 0}
                      />
                    </label>
                  ))
                ) : (
                  <>
                    <label className="color red">
                      <input type="radio" name="color" defaultChecked />
                    </label>
                    <label className="color blue">
                      <input type="radio" name="color" />
                    </label>
                  </>
                )}
              </div>
              <div className="sizes">
                <span>Size:</span>
                {sizes.length > 0 ? (
                  sizes.map((size, idx) => (
                    <button
                      key={idx}
                      className={`size ${idx === 2 ? "active" : ""}`}
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  <>
                    <button className="size">XS</button>
                    <button className="size">S</button>
                    <button className="size active">M</button>
                    <button className="size">L</button>
                    <button className="size">XL</button>
                  </>
                )}
              </div>
            </div>
            <div className="quan-act">
              <div className="quantity">
                <button className="minus" onClick={handleDecreaseQuantity}>
                  -
                </button>
                <input type="text" id="quantity" value={quantity} readOnly />
                <button className="plus" onClick={handleIncreaseQuantity}>
                  +
                </button>
              </div>
              <div className="action-buttons">
                <button
                  className="buy-now addCart"
                  data-product-id={product.id}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
                <button className="wishlist">
                  <i
                    className={`hearty addWish ${favourite}`}
                    data-product-id={product.id}
                    onClick={handleFavorite}
                  ></i>
                </button>
              </div>
            </div>
            <div className="last-item">
              <div className="delivery">
                <img src={deliveryIcon} alt="delivery" />
                <div className="item">
                  <span className="first">Free Delivery</span>
                  <span>Enter your postal code for Delivery Availability</span>
                </div>
              </div>
              <div className="return">
                <img src={returnIcon} alt="return" />
                <div className="item">
                  <span className="first">Return Delivery</span>
                  <span>Free 30 Days Delivery Returns. Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items Section */}

      <Related />
    </div>
  );
};

export default Product;
