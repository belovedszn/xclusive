/*import { useState, useEffect } from "react";
import { cart, removeFromCart, saveCart, addToCart, updateCartQuantity } from "../utils/cart.js";
import { products } from "../data/product.js";
import Payment from "./Payment.jsx";
import "../styling/cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    refreshCartDisplay();
  }, []);

  const refreshCartDisplay = () => {
    if (cart.length === 0) {
      setCartItems(
        <div className="empty">
          <i className="bi bi-cart"></i>
          <div className="first">Your cart is empty</div>
          <div className="second">Add something to make me happy</div>
        </div>
      );
    } else {
      const items = cart.map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.productId);
        if (!product) return null;

        const unitPrice = parseFloat(product.price.replace("$", "")) || 0;
        const totalPrice = unitPrice * cartItem.quantity;

        return (
          <tr className={`cursor js-cursor-${product.id}`} key={product.id}>
            <td className="item deleteX">
              <span
                className="deleteItem js-delete"
                onClick={() => handleRemoveItem(product.id)}
              >
                <i className="bi bi-x"></i>
              </span>
              <img src={product.image} alt={product.item} />
            </td>
            <td>{product.item}</td>
            <td className="item-price">${unitPrice.toFixed(2)}</td>
            <td>
              <span className="quantity-container">
                <span className="quantity">
                  {cartItem.quantity.toString().padStart(2, "0")}
                </span>
                <span className="arrow">
                  <i
                    className="bi bi-chevron-up increaseBtn"
                    onClick={() =>
                      handleQuantityChange(product.id, cartItem.quantity + 1)
                    }
                  ></i>
                  <i
                    className="bi bi-chevron-down decreaseBtn"
                    onClick={() =>
                      handleQuantityChange(
                        product.id,
                        Math.max(1, cartItem.quantity - 1)
                      )
                    }
                  ></i>
                </span>
              </span>
            </td>
            <td className="total-price">${totalPrice.toFixed(2)}</td>
          </tr>
        );
      });

      setCartItems(items);
    }
    updateCartQuantity();
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    refreshCartDisplay();
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const item = cart.find((item) => item.productId === productId);
    if (item) {
      item.quantity = newQuantity;
      saveCart();
      refreshCartDisplay();
    }
  };

  const updateCartQuantity = () => {
    let quantity = 0;
    cart.forEach((item) => (quantity += item.quantity));

    const cartQElement = document.querySelector(".js-cartQ");
    if (cartQElement) cartQElement.innerHTML = quantity;
    saveCart();
  };

  const handleReturnToShop = () => {
    window.history.back();
  };

  return (
    <div className="main">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <span>Cart</span>
      </div>

      <table className="jsTable">
        <thead>
          <tr>
            <th>Product</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
      </table>

      <table className="js-products">
        <tbody>{cartItems}</tbody>
      </table>

      <div className="action-box">
        <button className="return-to-shop" onClick={handleReturnToShop}>
          Return To Shop
        </button>
        <button className="update" onClick={refreshCartDisplay}>
          Update Cart
        </button>
      </div>

      {/* Render the Payment component /}
      <Payment />
    </div>
  );
};

export default Cart; 

import { useState, useEffect } from "react";
import {
  cart,
  removeFromCart,
  saveCart,
  updateCartQuantity,
  subscribe as subscribeToCart,
} from "../utils/cart.js";
import { products } from "../data/product.js";
import Payment from "./Payment.jsx";
import "../styling/cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isEmpty, setIsEmpty] = useState(cart.length === 0);
  const [triggerUpdate, setTriggerUpdate] = useState(0);

  // Subscribe to cart changes
  useEffect(() => {
    const unsubscribe = subscribeToCart(() => {
      refreshCartDisplay();
    });
    refreshCartDisplay(); // Initial load
    return () => unsubscribe();
  }, [triggerUpdate]);

  const refreshCartDisplay = () => {
    if (cart.length === 0) {
      setIsEmpty(true);
      setCartItems([]);
    } else {
      const items = cart.map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.productId);
        if (!product) return null;

        const unitPrice = parseFloat(product.price.replace("$", "")) || 0;
        const totalPrice = unitPrice * cartItem.quantity;

        return (
          <tr key={product.id}>
            <td className="item deleteX">
              <span
                className="deleteItem"
                onClick={() => handleRemoveItem(product.id)}
              >
                <i className="bi bi-x"></i>
              </span>
              <img src={product.image} alt={product.item} />
            </td>
            <td>{product.item}</td>
            <td className="item-price">${unitPrice.toFixed(2)}</td>
            <td>
              <span className="quantity-container">
                <span className="quantity">
                  {cartItem.quantity.toString().padStart(2, "0")}
                </span>
                <span className="arrow">
                  <i
                    className="bi bi-chevron-up"
                    onClick={() => handleQuantityChange(product.id, cartItem.quantity + 1)}
                  ></i>
                  <i
                    className="bi bi-chevron-down"
                    onClick={() => handleQuantityChange(product.id, Math.max(1, cartItem.quantity - 1))}
                  ></i>
                </span>
              </span>
            </td>
            <td className="total-price">${totalPrice.toFixed(2)}</td>
          </tr>
        );
      });

      setCartItems(items.filter(Boolean));
      setIsEmpty(false);
    }
    updateCartQuantity();
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    setTriggerUpdate(prev => prev + 1);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const item = cart.find((item) => item.productId === productId);
    if (item) {
      item.quantity = newQuantity;
      saveCart();
      setTriggerUpdate(prev => prev + 1);
    }
  };

  const updateCartQuantity = () => {
    const quantity = cart.reduce((total, item) => total + item.quantity, 0);
    const cartQElement = document.querySelector(".js-cartQ");
    if (cartQElement) cartQElement.textContent = quantity;
    saveCart();
  };

  const handleReturnToShop = () => {
    window.history.back();
  };

  if (isEmpty) {
    return (
      <div className="main">
        <div className="empty-cart">
          <i className="bi bi-cart"></i>
          <div className="empty-message">Your cart is empty</div>
          <div className="empty-submessage">Add something to make me happy</div>
          <button 
            className="return-to-shop" 
            onClick={handleReturnToShop}
          >
            Return To Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <span>Cart</span>
      </div>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>{cartItems}</tbody>
      </table>

      <div className="cart-actions">
        <button className="return-to-shop" onClick={handleReturnToShop}>
          Return To Shop
        </button>
      </div>

      <Payment key={triggerUpdate} />
    </div>
  );
};

export default Cart; 

import { useState, useEffect } from "react";
import {
  cart,
  removeFromCart,
  saveCart,
  updateCartQuantity,
  subscribe as subscribeToCart,
} from "../utils/cart.js";
import { products } from "../data/product.js";
import Payment from "./Payment.jsx";
import "../styling/cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isEmpty, setIsEmpty] = useState(cart.length === 0);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Main effect for cart subscription and initial load
  useEffect(() => {
    const unsubscribe = subscribeToCart(() => {
      refreshCartDisplay();
    });
    refreshCartDisplay();
    return () => unsubscribe();
  }, [forceUpdate]);

  const refreshCartDisplay = () => {
    if (cart.length === 0) {
      setIsEmpty(true);
      setCartItems([]);
      return;
    }

    const items = cart.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) return null;

      const unitPrice = parseFloat(product.price.replace("$", "")) || 0;
      const totalPrice = unitPrice * cartItem.quantity;

      return (
        <tr className={`js-cursor-${product.id}`} key={product.id}>
          <td className="item deleteX">
            <span
              className="deleteItem"
              onClick={() => handleRemoveItem(product.id)}
            >
              <i className="bi bi-x"></i>
            </span>
            <img src={product.image} alt={product.item} />
          </td>
          <td>{product.item}</td>
          <td className="item-price">${unitPrice.toFixed(2)}</td>
          <td>
            <span className="quantity-container">
              <span className="quantity">
                {cartItem.quantity.toString().padStart(2, "0")}
              </span>
              <span className="arrow">
                <i
                  className="bi bi-chevron-up increaseBtn"
                  onClick={() =>
                    handleQuantityChange(product.id, cartItem.quantity + 1)
                  }
                ></i>
                <i
                  className="bi bi-chevron-down decreaseBtn"
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      Math.max(1, cartItem.quantity - 1)
                    )
                  }
                ></i>
              </span>
            </span>
          </td>
          <td className="total-price">${totalPrice.toFixed(2)}</td>
        </tr>
      );
    });

    setCartItems(items.filter(Boolean));
    setIsEmpty(false);
    updateCartQuantity();
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    setForceUpdate(prev => prev + 1);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const item = cart.find((item) => item.productId === productId);
    if (item) {
      item.quantity = newQuantity;
      saveCart();
      setForceUpdate(prev => prev + 1);
    }
  };

  const updateCartQuantity = () => {
    const quantity = cart.reduce((total, item) => total + item.quantity, 0);
    const cartQElement = document.querySelector(".js-cartQ");
    if (cartQElement) cartQElement.textContent = quantity;
    saveCart();
  };

  const handleReturnToShop = () => {
    window.history.back();
  };

  if (isEmpty) {
    return (
      <div className="main">
        <div className="empty">
          <i className="bi bi-cart"></i>
          <div className="first">Your cart is empty</div>
          <div className="second">Add something to make me happy</div>
          <button
            className="return-to-shop"
            onClick={handleReturnToShop}
            style={{ marginTop: "20px" }}
          >
            Return To Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <span>Cart</span>
      </div>

      <table className="jsTable">
        <thead>
          <tr>
            <th>Product</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
      </table>

      <table className="js-products">
        <tbody>{cartItems}</tbody>
      </table>

      <div className="action-box">
        <button className="return-to-shop" onClick={handleReturnToShop}>
          Return To Shop
        </button>
        <button className="update" onClick={() => setForceUpdate(prev => prev + 1)}>
          Update Cart
        </button>
      </div>

      <Payment key={forceUpdate} />
    </div>
  );
};

export default Cart;  

// ...

import React, { useState, useEffect } from "react";
import { cart, removeFromCart, saveCart } from "../utils/cart.js";
import { products } from "../data/product.js";
import "../styling/cart.css";
import { Link } from "react-router-dom";
import Payment from "./Payment.jsx";

const Cart = () => {
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    refreshCartDisplay(cartItems); // Always reflect the current state
    
  }, [cartItems]);

  /*  const refreshCartDisplay = () => {
    if (cart.length === 0) {
      // Empty cart state is handled in the render
    } else {
      saveCart();
    }
    updateCartQuantity();
  }; */

/*
  const refreshCartDisplay = () => {
    setCartItems([...cart]); // Create new array to trigger re-render
    saveCart();
    updateCartQuantity();
  }; //

  const refreshCartDisplay = (items) => {
    saveCart(); // save current cart
    updateCartQuantity(items);
  };
  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCart);
    cart.length = 0;
    cart.push(...updatedCart);
    saveCart();
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    cart.length = 0;
    cart.push(...updatedCart);
    saveCart();

    updateCartQuantity()

  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.productId === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    cart.length = 0;
    cart.push(...updatedCart);
    saveCart();
  };

  /*

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    setCartItems([...cart]); // Create new array to trigger re-render
    saveCart();
  };

  const handleIncreaseQuantity = (productId) => {
    const cartItem = cart.find((item) => item.productId === productId);
    if (cartItem) {
      cartItem.quantity++;
      setCartItems([...cart]);
      saveCart();
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const cartItem = cart.find((item) => item.productId === productId);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
      setCartItems([...cart]);
      saveCart();
    }
  }; */

/* const updateCartQuantity = () => {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
   // saveCart();
  }; */

/*  const updateCartQuantity = (items) => {
    let cartQuantity = 0;
    items.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    // saveCart(); // Not needed here
  }; /

  const updateCartQuantity = (items) => {
    let cartQuantity = 0;
    items.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    saveCart()
  };

  const updateTotalPrice = (productId, quantity) => {
    const matchingProduct = products.find(
      (product) => product.id === productId
    );
    if (matchingProduct) {
      const priceString = matchingProduct.price.replace("$", "");
      const pricePerUnit = parseFloat(priceString) || 0;
      return (pricePerUnit * quantity).toFixed(2);
    }
    return "0.00";
  };

  const handleReturnToShop = (e) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <div className="main">
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/cart">Cart</Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty">
          <i className="bi bi-cart"></i>
          <div className="first">Your cart is empty</div>
          <div className="second">Add something to make me happy</div>
        </div>
      ) : (
        <>
          <table className="jsTable">
            <thead>
              <tr>
                <th>Product</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
          </table>

          <table className="js-products">
            <tbody>
              {cartItems.map((cartItem) => {
                const matchingProduct = products.find(
                  (product) => product.id === cartItem.productId
                );
                if (!matchingProduct) return null;

                return (
                  <tr
                    key={matchingProduct.id}
                    className={`cursor js-cursor-${matchingProduct.id}`}
                  >
                    <td className="item deleteX">
                      <span
                        className="deleteItem js-delete"
                        onClick={() => handleRemoveItem(matchingProduct.id)}
                      >
                        <i className="bi bi-x"></i>
                      </span>
                      <img
                        src={matchingProduct.image}
                        alt={matchingProduct.item}
                      />
                    </td>
                    <td>{matchingProduct.item}</td>
                    <td
                      className="item-price"
                      data-price={matchingProduct.price}
                    >
                      {matchingProduct.price}
                    </td>
                    <td>
                      <span className="quantity-container">
                        <span
                          className="quantity"
                          data-product-id={matchingProduct.id}
                        >
                          {cartItem.quantity.toString().padStart(2, "0")}
                        </span>
                        <span className="arrow">
                          <i
                            className="bi bi-chevron-up increaseBtn"
                            onClick={() =>
                              handleIncreaseQuantity(matchingProduct.id)
                            }
                          ></i>
                          <i
                            className="bi bi-chevron-down decreaseBtn"
                            onClick={() =>
                              handleDecreaseQuantity(matchingProduct.id)
                            }
                          ></i>
                        </span>
                      </span>
                    </td>
                    <td
                      className="total-price"
                      id={`total-price-${matchingProduct.id}`}
                    >
                      ${updateTotalPrice(matchingProduct.id, cartItem.quantity)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="action-box">
            <a className="return-to-shop" onClick={handleReturnToShop}>
              Return To Shop
            </a>
            <a href="#" className="update">
              Update Cart
            </a>
          </div>
        </>
      )}

      <Payment cartItems={cartItems} />
    </div>
  );
};

export default Cart; */

// new...

import React, { useState, useEffect } from "react";
import {
  getCart,
  removeFromCart,
  saveCart,
  subscribe,
  calculateCartQuantity,
  updateCartQuantity,
  cart,
} from "../utils/cart.js";
import { products } from "../data/product.js";
import "../styling/cart.css";
import { Link } from "react-router-dom";
import Payment from "./Payment.jsx";

const Cart = () => {
  const [cartItems, setCartItems] = useState(cart);
  //const [cartItems, setCartItems] = useState(getCart());

  /* Subscribe to cart changes
  useEffect(() => {
    const unsubscribe = subscribe(() => {
     // setCartItems([...cart]);
     setCartItems([...JSON.parse(localStorage.getItem("Xcart") || "[]")]);
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);  */

  /*
  useEffect(() => {
    const unsubscribe = subscribe(() => {
     // setCartItems([...cart]); // Sync with updated cart state
     setCartItems(cart())
    });
    return unsubscribe; // Cleanup on unmount
  }, []); */

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setCartItems([...getCart()]); // Update cart items when they change
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  // Handle removing an item from cart
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    // setCartItems([...JSON.parse(localStorage.getItem("Xcarty") || "[]")]);
  };

  // Handle increasing quantity
  const handleIncreaseQuantity = (productId) => {
    updateCartQuantity(productId, "increase");
  };

  // Handle decreasing quantity
  const handleDecreaseQuantity = (productId) => {
    updateCartQuantity(productId, "decrease");
  };

  // Calculate total price for a product
  const updateTotalPrice = (productId, quantity) => {
    const matchingProduct = products.find(
      (product) => product.id === productId
    );
    if (matchingProduct) {
      const priceString = matchingProduct.price.replace("$", "");
      const pricePerUnit = parseFloat(priceString) || 0;
      return (pricePerUnit * quantity).toFixed(2);
    }
    return "0.00";
  };

  const handleReturnToShop = (e) => {
    e.preventDefault();
    window.history.back();
  };

  const renderEmptyState = () => {
    <div className="empty">
      <i className="bi bi-cart"></i>
      <div className="first">Your cart is empty</div>
      <div className="second">Add something to make me happy</div>
    </div>;
  };

  return (
    <div className="main">
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/cart">Cart</Link>
      </div>

      <table className="jsTable">
        <thead>
          <tr>
            <th>Product</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
      </table>

      <table className="js-products">
        <tbody>
          {cartItems.map((cartItem) => {
            const matchingProduct = products.find(
              (product) => product.id === cartItem.productId
            );
            if (!matchingProduct) return null;

            return (
              <tr
                key={matchingProduct.id}
                className={`cursor js-cursor-${matchingProduct.id}`}
              >
                <td className="item deleteX">
                  <span
                    className="deleteItem js-delete"
                    onClick={() => handleRemoveItem(matchingProduct.id)}
                  >
                    <i className="bi bi-x"></i>
                  </span>
                  <img src={matchingProduct.image} alt={matchingProduct.item} />
                </td>
                <td>{matchingProduct.item}</td>
                <td className="item-price" data-price={matchingProduct.price}>
                  {matchingProduct.price}
                </td>
                <td>
                  <span className="quantity-container">
                    <span
                      className="quantity"
                      data-product-id={matchingProduct.id}
                    >
                      {cartItem.quantity.toString().padStart(2, "0")}
                    </span>
                    <span className="arrow">
                      <i
                        className="bi bi-chevron-up increaseBtn"
                        onClick={() =>
                          handleIncreaseQuantity(matchingProduct.id)
                        }
                      ></i>
                      <i
                        className="bi bi-chevron-down decreaseBtn"
                        onClick={() =>
                          handleDecreaseQuantity(matchingProduct.id)
                        }
                      ></i>
                    </span>
                  </span>
                </td>
                <td
                  className="total-price"
                  id={`total-price-${matchingProduct.id}`}
                >
                  ${updateTotalPrice(matchingProduct.id, cartItem.quantity)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="action-box">
        <a className="return-to-shop" onClick={handleReturnToShop}>
          Return To Shop
        </a>
        <a href="#" className="update">
          Update Cart
        </a>
      </div>

      <div className="jsEmpty">
        {cartItems.length === 0 && renderEmptyState()}
      </div>

      <Payment cartItems={cartItems} />
    </div>
  );
};

export default Cart;

/**
 * (
        <div className="empty">
          <i className="bi bi-cart"></i>
          <div className="first">Your cart is empty</div>
          <div className="second">Add something to make me happy</div>
        </div>
      )
 */
