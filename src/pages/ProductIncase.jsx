/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsApi } from "../../backend/api";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    productsApi(id)
      .then((data) => {
        console.log("Fetched data:", data);
        setProduct(data); // directly set product
      })
      .catch((err) => {
        console.error("Product fetch error:", err);
        setError(err);
      });
  }, [id]);

  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Loading product...</div>;

  return (
        <div class="product-container viewProduct">
      <h2>{product.item}</h2>
      <img src={product.image} alt={product.item} />
      <p>Price: {product.price}</p>
      <p>Slash Price: {product.slashPrice}</p>
     
    </div>
  );
};

export default Product;


// 2.0

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsApi } from "../../backend/api";
import {} from "../../styling/product.css";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    productsApi(id)
      .then((data) => {
        console.log("Fetched data:", data);
        setProduct(data);
      })
      .catch((err) => {
        console.error("Product fetch error:", err);
        setError(err);
      });
  }, [id]);

  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Loading product...</div>;

  const galleryImages = product.galleryImages || [];
  const colors = product.colors || [];
  const sizes = product.sizes || [];

  return (
    <div className="main">
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
              className="mainImage"
              id="mainImage"
              alt={product.item}
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
                    <label className={`color ${color}`} key={idx}>
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
                {(sizes.length > 0 ? sizes : ["XS", "S", "M", "L", "XL"]).map(
                  (size, idx) => (
                    <button
                      key={idx}
                      className={`size ${size === "M" ? "active" : ""}`}
                    >
                      {size}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="quan-act">
              <div className="quantity">
                <button className="minus">-</button>
                <input type="text" id="quantity" defaultValue="1" />
                <button className="plus">+</button>
              </div>

              <div className="action-buttons">
                <button
                  className="buy-now addCart"
                  data-product-id={product.id}
                >
                  Buy Now
                </button>
                <button className="wishlist">
                  <i
                    className="bi bi-heart hearty addWish"
                    data-product-id={product.id}
                  ></i>
                </button>
              </div>
            </div>

            <div className="last-item">
              <div className="delivery">
                <img src="../media/icon-delivery (1).png" alt="Delivery" />
                <div className="item">
                  <span className="first">Free Delivery</span>
                  <span>Enter your postal code for Delivery Availability</span>
                </div>
              </div>
              <div className="return">
                <img src="../media/Icon-return.png" alt="Return" />
                <div className="item">
                  <span className="first">Return Delivery</span>
                  <span>Free 30 Days Delivery Returns. Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product; */

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productsApi } from "../../backend/api";
import { products } from "../../data/related";
import "../../styling/product.css";
import returnIcon from "../../assets/media/Icon-return.png";
import deliveryIcon from "../../assets/media/icon-delivery (1).png";
import {
  addToCart,
  updateCartQuantity,
  cart,
  subscribe as subscribeToCart,
  removeFromCart
} from "../../utils/cart.js";
import {
  toggleWish,
  wishlist as wish,
  saveWishlist,
  calculateWishlistQuantity,
} from "../../utils/wish.js";
import { useWish } from "../../WishContext.jsx";
import { addToWishlist, removeFromWishlist } from "../../utils/wish";
//import { productsApi } from "../../backend/api";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { wishItems, addToWishlist } = useWish();
  const [isProduct, setIsProduct] = useState([]);

  useEffect(() => {
   /* if (product) {
      const cartItem = cart.find(item => item.productId === product.id);
      // Set initial quantity to cart quantity or 1 if not in cart
      setQuantity(cartItem ? cartItem.quantity : 1);
      
      // Check wishlist status
      const isItemInWishlist = wish.some(item => item.productId === product.id);
      setIsFavourite(isItemInWishlist);
    } */
    if (product) {
      const cartItem = cart.find(item => item.productId === product.id);
      // Set initial quantity to cart quantity or 1 if not in cart
      setQuantity(cartItem ? cartItem.quantity : 1);
      
      // Check wishlist status
      const isItemInWishlist = wish.some(item => item.productId === product.id);
      setIsFavourite(isItemInWishlist);
    }
  }, [product]);

  let favourite = isFavourite ? "bi-heart-fill" : "bi-heart";

  function handleFavorite() {
    if (!product) return;

    setIsFavourite((prev) => {
      const newStatus = !prev;
      toggleWish(product.id);
      saveWishlist(); // Use the correct function name
      return newStatus;
    });
  }

  function handleIncreaseQuantity() {
    if (!product) return;
    
    const cartItem = cart.find(item => item.productId === product.id);
    
    if (cartItem) {
      // Item is in cart - increase quantity
      updateCartQuantity(product.id, "increase");
    } else {
      // Item not in cart - add it with quantity 1
      addToCart(product.id, 1);
    }
  }
  
  function handleDecreaseQuantity() {
    if (!product) return;
    
    const cartItem = cart.find(item => item.productId === product.id);
    
    if (!cartItem) return; // Do nothing if item not in cart
    
    if (cartItem.quantity > 1) {
      // Decrease quantity if more than 1
      updateCartQuantity(product.id, "decrease");
    } else {
      // Remove if quantity would go to 0
      removeFromCart(product.id);
    }
  }
  
  function handleBuyNow() {
    if (!product) return;
    
    const cartItem = cart.find(item => item.productId === product.id);
    
    if (!cartItem) {
      // If not in cart, add it with current quantity (or 1 if quantity is 0)
      addToCart(product.id, Math.max(1, quantity));
    }
    
    navigate("/cart");
  }
  
  function handleAddToCart() {
    if (!product) return;
    
    const cartItem = cart.find(item => item.productId === product.id);
    
    if (!cartItem) {
      // If not in cart, add it with current quantity (or 1 if quantity is 0)
      addToCart(product.id, Math.max(1, quantity));
    }
    // Optional: show a notification here
  }

  /*
  function handleIncreaseQuantity() {
    if (!product) return;
    updateCartQuantity(product.id, "increase");
    // The quantity will update via the cart subscription
  }
  
  function handleDecreaseQuantity() {
    if (!product) return;
    const cartItem = cart.find(item => item.productId === product.id);
    
    if (cartItem && cartItem.quantity > 1) {
      updateCartQuantity(product.id, "decrease");
    } else {
      // Remove if quantity would go to 0
      removeFromCart(product.id);
    }
    // The quantity will update via the cart subscription
  }

  // Subscribe to cart changes to update quantity display
  useEffect(() => {
    const unsubscribe = subscribeToCart(() => {
      if (product) {
        const cartItem = cart.find(item => item.productId === product.id);
        setQuantity(cartItem ? cartItem.quantity : 1);
      }
    });
    
    return () => unsubscribe();
  }, [product]);

  let favourite = isFavourite ? "bi-heart-fill" : "bi-heart";

  function handleFavorite() {
    if (!product) return;

    setIsFavourite((prev) => {
      const newStatus = !prev;
      toggleWish(product.id);
      saveWishlist(); // Use the correct function name
      return newStatus;
    });
  }

  /* Initialize favorite status
  useEffect(() => {
    if (product) {
      const cartItem = cart.find(item => item.productId === product.id);
      setQuantity(cartItem ? cartItem.quantity : 1);

      const isItemInWishlist = wish.some(
        (item) => item.productId === product.id
      );
      setIsFavourite(isItemInWishlist);
    }
  }, [product]);

  let favourite = isFavourite ? "bi-heart-fill" : "bi-heart";

  function handleFavorite() {
    if (!product) return;

    setIsFavourite((prev) => {
      const newStatus = !prev;
      toggleWish(product.id);
      saveWishlist(); // Use the correct function name
      return newStatus;
    });
  }

  function handleIncreaseQuantity() {
    if (!product) return;
    updateCartQuantity(product.id, "increase");
    // The quantity will update via the cart subscription
  }
  
  function handleDecreaseQuantity() {
    if (!product) return;
    const cartItem = cart.find(item => item.productId === product.id);
    
    if (cartItem && cartItem.quantity > 1) {
      updateCartQuantity(product.id, "decrease");
    } else {
      // Remove if quantity would go to 0
      removeFromCart(product.id);
    }
    // The quantity will update via the cart subscription
  }

  useEffect(() => {
    const unsubscribe = subscribeToCart(() => {
      if (product) {
        const cartItem = cart.find(item => item.productId === product.id);
        setQuantity(cartItem ? cartItem.quantity : 1);
      }
    });
    
    return () => unsubscribe();
  }, [product]); */ //

 /* function handleIncreaseQuantity() {
    // Update quantity state
    setQuantity(prev => prev + 1);
    
    // Update cart
    const updatedCart = cart.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    saveCart(updatedCart); // if you have a saveCart function to localStorage
  }
  
  function handleDecreaseQuantity() {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
  
      // Update cart
      const updatedCart = cart.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCart(updatedCart);
      saveCart(updatedCart);
    } else {
      // Optional: if quantity is 1 and user clicks "-", remove item completely
      const updatedCart = cart.filter(item => item.id !== product.id);
      setCart(updatedCart);
      saveCart(updatedCart);
    }
  } 
  

  function handleBuyNow() {
    if (!product) return;
    addToCart(product.id, quantity);
    navigate("/cart"); // Redirect to cart page
  }

  function handleAddToCart() {
    if (!product) return;
    addToCart(product.id, quantity);
    // Optional: show a notification here
  } 

    function handleBuyNow() {
      if (!product) return;
      
      // Check if item is already in cart
      const cartItem = cart.find(item => item.productId === product.id);
      if (!cartItem) {
        // If not in cart, add it with quantity 1
        addToCart(product.id, 1);
      }
      navigate("/cart");
    }
    
    function handleAddToCart() {
      if (!product) return;
      
      // Check if item is already in cart
      const cartItem = cart.find(item => item.productId === product.id);
      if (!cartItem) {
        // If not in cart, add it with quantity 1
        addToCart(product.id, 1);
      }
      // Optional: show a notification here
    } */
   
      useEffect(() => {
        const unsubscribe = subscribeToCart(() => {
          if (product) {
            const cartItem = cart.find(item => item.productId === product.id);
            // Always update quantity based on cart, or set to 1 if not in cart
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
  if (!product) return <h2>Loading product...</h2>;

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
            <p className="price">${product.price}</p>
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
                <button
                  className="minus"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <input type="text" id="quantity" value={quantity} readOnly />
                <button
                  className="plus"
                  onClick={handleIncreaseQuantity}
                >
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

      <div className="best-selling">
        <div className="first-box">
          <div className="block"></div>
          <div>Related Items</div>
        </div>
        <div className="second-box">
          <div className="first">
            <div></div>
          </div>
        </div>
        <div className="third-box">
          <div className="container">
            <div className="slider-wrapper">
              <div className="product-grid js-related" id="autoWidth">
                {products.map((prod, idx) => (
                  <div className="product-box" key={idx}>
                    <div className="product-card">
                      <div className="image-wrapper">
                        <span></span>
                        <img
                          src={prod.image}
                          data-product-id={prod.id}
                          className="img-wrap"
                          alt={prod.item}
                        />
                        <div
                          className="action-icons"
                          style={{ display: "none" }}
                        >
                          <i
                            className="bi bi-heart hearty addWish"
                            data-product-id={prod.id}
                          ></i>
                          <i className="bi bi-eye hide"></i>
                        </div>
                      </div>
                      <div className="overlay">
                        <button
                          className="buy-btn addCart"
                          data-product-id={prod.id}
                          onClick={() => {
                            addToCart(prod.id, 1);
                            // Optional: show a notification
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                    <div className="product-details">
                      <h3 className="product-title">{prod.item}</h3>
                      <div className="price">
                        <span className="discounted-price">{prod.price}</span>
                        <span className="original-price">
                          {prod.slashPrice}
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
