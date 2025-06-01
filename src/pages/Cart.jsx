/*import React, { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateCartItem,
  getCartQuantity,
} from "../utils/cart";
import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import { getProducts } from "../data/product";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (productId) => {
    const updated = removeFromCart(productId);
    setCart(updated);
  };

  const changeQty = (productId, delta) => {
    const updated = updateCartItem(productId, delta);
    setCart(updated);
  };

  const getProduct = (id) => products.find((p) => p.id === id);

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => {
      const product = getProduct(item.productId);
      const price = parseFloat(product.price.replace("$", "")) || 0;
      return sum + item.quantity * price;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal * 0.03;
  const total = subtotal + shipping;

  return (
    <div className="main p-4 max-w-6xl mx-auto">
      <div className="link-redirection text-sm text-gray-500 mb-4">
        <Link to="/" className="first text-blue-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Cart</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty text-center py-20 text-gray-400">
          <i className="bi bi-cart text-4xl"></i>
          <div className="first text-xl font-semibold mt-4">
            Your cart is empty
          </div>
          <div className="second text-sm">Add something to make me happy</div>
        </div>
      ) : (
        <>
          <table className="w-full text-left mb-6">
            <thead>
              <tr className="border-b">
                <th className="py-2">Product</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const product = getProduct(item.productId);
                const price = parseFloat(product.price.replace("$", "")) || 0;
                const totalPrice = (price * item.quantity).toFixed(2);

                return (
                  <tr key={product.id} className="border-b">
                    <td className="py-2 flex items-center gap-3">
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="text-red-500"
                      >
                        <i className="bi bi-x"></i>
                      </button>
                      <img
                        src={product.image}
                        alt={product.item}
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td>{product.item}</td>
                    <td>{product.price}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => changeQty(product.id, 1)}
                          className="px-2"
                        >
                          ▲
                        </button>
                        <span>{String(item.quantity).padStart(2, "0")}</span>
                        <button
                          onClick={() => changeQty(product.id, -1)}
                          className="px-2"
                        >
                          ▼
                        </button>
                      </div>
                    </td>
                    <td>${totalPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="action-box flex justify-between mb-6">
            <Link to="/" className="text-blue-500">
              Return To Shop
            </Link>
            <button
              onClick={() => setCart(getCart())}
              className="text-blue-500"
            >
              Update Cart
            </button>
          </div>

          <div className="final-container bg-gray-100 p-4 rounded shadow">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping (3%):</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="orderBtn mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Place Order
            </button>
          </div>
        </>
      )}
      {cart.length > 0 && (
        <div className="final-container JScontainer">
          <OrderSummary cart={cart} getProducts={getProducts} />
        </div>
      )}
    </div>
  );
};

export default CartPage;


import React, { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../utils/cart";
import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import { getProducts } from "../data/product";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const updateCart = () => {
      setCart([...getCart()]);
    };

    updateCart();

    // Optional: Listen for storage changes from other tabs/windows
    const handleStorageChange = () => updateCart();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setCart([...getCart()]);
  };

  const changeQty = (productId, delta) => {
    updateCartQuantity(productId, delta);
    setCart([...getCart()]);
  };

  const getProduct = (id) => {
    const allProducts = getProducts();
    return allProducts.find((p) => p.id === id);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => {
      const product = getProduct(item.productId);
      const price = parseFloat(product?.price?.replace("$", "")) || 0;
      return sum + item.quantity * price;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal * 0.03;
  const total = subtotal + shipping;

  return (
    <div className="main p-4 max-w-6xl mx-auto">
      <div className="link-redirection text-sm text-gray-500 mb-4">
        <Link to="/" className="first text-blue-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Cart</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty text-center py-20 text-gray-400">
          <i className="bi bi-cart text-4xl"></i>
          <div className="first text-xl font-semibold mt-4">
            Your cart is empty
          </div>
          <div className="second text-sm">Add something to make me happy</div>
        </div>
      ) : (
        <>
          <table className="w-full text-left mb-6">
            <thead>
              <tr className="border-b">
                <th className="py-2">Product</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const product = getProduct(item.productId);
                const price = parseFloat(product?.price?.replace("$", "")) || 0;
                const totalPrice = (price * item.quantity).toFixed(2);

                return (
                  <tr key={product.id} className="border-b">
                    <td className="py-2 flex items-center gap-3">
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="text-red-500"
                      >
                        <i className="bi bi-x"></i>
                      </button>
                      <img
                        src={product.image}
                        alt={product.item}
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td>{product.item}</td>
                    <td>{product.price}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => changeQty(product.id, 1)}
                          className="px-2"
                        >
                          ▲
                        </button>
                        <span>{String(item.quantity).padStart(2, "0")}</span>
                        <button
                          onClick={() => changeQty(product.id, -1)}
                          className="px-2"
                        >
                          ▼
                        </button>
                      </div>
                    </td>
                    <td>${totalPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="action-box flex justify-between mb-6">
            <Link to="/" className="text-blue-500">
              Return To Shop
            </Link>
            <button
              onClick={() => setCart([...getCart()])}
              className="text-blue-500"
            >
              Update Cart
            </button>
          </div>

          <div className="final-container bg-gray-100 p-4 rounded shadow">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping (3%):</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="orderBtn mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Place Order
            </button>
          </div>
        </>
      )}

      {cart.length > 0 && (
        <div className="final-container JScontainer">
          <OrderSummary cart={cart} getProducts={getProducts} />
        </div>
      )}
    </div>
  );
};

export default CartPage;


import React, { useState, useEffect } from 'react';
import { getProducts } from '../data/product';  // Ensure the correct path to your products file
import { saveCart } from '../utils/cart';  // If you're using this for cart logic
//import './Cart.css';  // Adjust to your actual CSS

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  
  // UseEffect to load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('XclusiveCart')) || [];
    setCartItems(storedCart);
    calculateSubtotal(storedCart);
  }, []);
  
  // Function to calculate the subtotal
  const calculateSubtotal = (cartItems) => {
    const newSubtotal = cartItems.reduce((total, item) => {
      const product = getProducts(item.productId);
      if (product) {
        const price = parseFloat(product.price.replace('$', '').replace(',', ''));
        return total + (price * item.quantity);
      }
      return total;
    }, 0);
    setSubtotal(newSubtotal);
  };

  // Handle item quantity update
  const updateQuantity = (productId, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity: quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('XclusiveCart', JSON.stringify(updatedCart));
    calculateSubtotal(updatedCart);
  };

  // Handle remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('XclusiveCart', JSON.stringify(updatedCart));
    calculateSubtotal(updatedCart);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty">
          <i className="bi bi-cart"></i>
          <div className="first">Your cart is empty</div>
          <div className="second">Add something to make me happy</div>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => {
            const product = getProducts(item.productId);
            if (!product) return null;  // Avoid rendering if no matching product

            return (
              <div className="cart-item" key={item.productId}>
                <img src={product.image} alt={product.item} />
                <div>{product.item}</div>
                <div>{product.price}</div>
                <div>
                  <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                </div>
                <div>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div>Subtotal: ${subtotal.toFixed(2)}</div>
          <div>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;


import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCartQuantity } from "../utils/cart";
import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import { getProducts } from "../data/product";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (productId) => {
    const updated = removeFromCart(productId);
    setCart(updated);
  };

  const changeQty = (productId, delta) => {
    const updated = updateCartQuantity(productId, delta);
    setCart(updated);
  };

  //const getProduct = (id) => getProducts().find((p) => p.id === id);
  const getProduct = (id) => {
    const products = getProducts() || []; // Ensure products is an array
    return products.find((p) => p.id === id);
  };
  

 /* const calculateSubtotal = () => {
    return cart.reduce((sum, item) => {
      const product = getProduct(item.productId);
      const price = parseFloat(product.price.replace("$", "")) || 0;
      return sum + item.quantity * price;
    }, 0);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => {
      const product = getProduct(item.productId);
      
      if (!product) {
        console.warn(`Product with ID ${item.productId} not found.`);
        return sum;
      }
      
      const price = parseFloat(product.price.replace("$", "")) || 0;
      return sum + item.quantity * price;
    }, 0);
  };
  

  const subtotal = calculateSubtotal();
  const shipping = subtotal * 0.03;
  const total = subtotal + shipping;

  return (
    <div className="main p-4 max-w-6xl mx-auto">
      <div className="link-redirection text-sm text-gray-500 mb-4">
        <Link to="/" className="first text-blue-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Cart</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty text-center py-20 text-gray-400">
          <i className="bi bi-cart text-4xl"></i>
          <div className="first text-xl font-semibold mt-4">
            Your cart is empty
          </div>
          <div className="second text-sm">Add something to make me happy</div>
        </div>
      ) : (
        <>
          <table className="w-full text-left mb-6">
            <thead>
              <tr className="border-b">
                <th className="py-2">Product</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const product = getProduct(item.productId);
                const price = parseFloat(product.price.replace("$", "")) || 0;
                const totalPrice = (price * item.quantity).toFixed(2);

                return (
                  <tr key={product.id} className="border-b">
                    <td className="py-2 flex items-center gap-3">
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="text-red-500"
                      >
                        <i className="bi bi-x"></i>
                      </button>
                      <img
                        src={product.image}
                        alt={product.item}
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td>{product.item}</td>
                    <td>{product.price}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => changeQty(product.id, 1)}
                          className="px-2"
                        >
                          ▲
                        </button>
                        <span>{String(item.quantity).padStart(2, "0")}</span>
                        <button
                          onClick={() => changeQty(product.id, -1)}
                          className="px-2"
                        >
                          ▼
                        </button>
                      </div>
                    </td>
                    <td>${totalPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="action-box flex justify-between mb-6">
            <Link to="/" className="text-blue-500">
              Return To Shop
            </Link>
            <button
              onClick={() => setCart(getCart())}
              className="text-blue-500"
            >
              Update Cart
            </button>
          </div>

          <div className="final-container bg-gray-100 p-4 rounded shadow">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping (3%):</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="orderBtn mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Place Order
            </button>
          </div>
        </>
      )}
      {cart.length > 0 && (
        <div className="final-container JScontainer">
          <OrderSummary cart={cart} getProducts={getProducts} />
        </div>
      )}
    </div>
  );
};

export default CartPage;


import { useState, useEffect } from 'react';
import { cart, removeFromCart, saveCart } from "../utils/cart.js";
import { products } from "../data/product.js";
import { orderPayment } from "./Payment.jsx";
//import { wish, saveWish } from "./wish.js";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishQuantity, setWishQuantity] = useState(0);
  const [paymentHTML, setPaymentHTML] = useState('');

  useEffect(() => {
    refreshCartDisplay();
    updateWishList();
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
        const product = products.find(p => p.id === cartItem.productId);
        if (!product) return null;
        
        const unitPrice = parseFloat(product.price.replace("$", "")) || 0;
        const totalPrice = unitPrice * cartItem.quantity;

        return (
          <tr className={`cursor js-cursor-${product.id}`} key={product.id}>
            <td className="item deleteX">
              <span 
                className="deleteItem js-delete" 
                data-product-id={product.id}
                onClick={() => handleRemoveItem(product.id)}
              >
                <i className="bi bi-x"></i>
              </span>
              <img src={product.image} alt={product.item} />
            </td>
            <td>{product.item}</td>
            <td className="item-price" data-price={product.price}>{product.price}</td>
            <td>
              <span className="quantity-container">
                <span className="quantity" data-product-id={product.id}>
                  {cartItem.quantity.toString().padStart(2, "0")}
                </span>
                <span className="arrow">
                  <i 
                    className="bi bi-chevron-up increaseBtn" 
                    data-product-id={product.id}
                    onClick={() => handleQuantityChange(product.id, cartItem.quantity + 1)}
                  ></i>
                  <i 
                    className="bi bi-chevron-down decreaseBtn" 
                    data-product-id={product.id}
                    onClick={() => handleQuantityChange(product.id, Math.max(1, cartItem.quantity - 1))}
                  ></i>
                </span>
              </span>
            </td>
            <td className="total-price" id={`total-price-${product.id}`}>
              ${totalPrice.toFixed(2)}
            </td>
          </tr>
        );
      });

      setCartItems(items);
    }
    updateCartQuantity();
    orderPayment().then(html => setPaymentHTML(html));
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    refreshCartDisplay();
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const item = cart.find(item => item.productId === productId);
    if (item) {
      item.quantity = newQuantity;
      saveCart();
      refreshCartDisplay();
    }
  };

  const updateCartQuantity = () => {
    let quantity = 0;
    cart.forEach(item => quantity += item.quantity);
    document.querySelector(".js-cartQ").innerHTML = quantity;
    saveCart();
  };

  const updateWishList = () => {
    let quantity = 0;
    wish.forEach(item => quantity += item.quantity);
    setWishQuantity(quantity);
    saveWish();
  };

  const handleReturnToShop = () => {
    window.history.back();
  };

  return (
    <div className="main">
      <div className="link-redirection">
        <a href="../html/index.html" className="first">Home</a>
        <div>/</div>
        <a href="">Cart</a>
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
        <a className="return-to-shop" onClick={handleReturnToShop}>Return To Shop</a>
        <a href="#" className="update">Update Cart</a>
      </div>

      <div className="final-container JScontainer" dangerouslySetInnerHTML={{ __html: paymentHTML }} />
    </div>
  );
};

export default MyCart;
*/

//....



import { useState, useEffect } from 'react';
import { cart, removeFromCart, saveCart } from "../utils/cart.js";
import { products } from "../data/product.js";
import Payment from "./Payment.jsx"; 
import "../styling/cart.css";
import { Link } from "react-router-dom";
//import { wish, saveWish } from "./wish.js";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
 // const [wishQuantity, setWishQuantity] = useState(0);

  useEffect(() => {
    refreshCartDisplay();
   // updateWishList();
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
        const product = products.find(p => p.id === cartItem.productId);
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
                    onClick={() => handleQuantityChange(product.id, cartItem.quantity + 1)}
                  ></i>
                  <i 
                    className="bi bi-chevron-down decreaseBtn"
                    onClick={() => handleQuantityChange(product.id, Math.max(1, cartItem.quantity - 1))}
                  ></i>
                </span>
              </span>
            </td>
            <td className="total-price">
              ${totalPrice.toFixed(2)}
            </td>
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
    const item = cart.find(item => item.productId === productId);
    if (item) {
      item.quantity = newQuantity;
      saveCart();
      refreshCartDisplay();
    }
  };

  const updateCartQuantity = () => {
    let quantity = 0;
    cart.forEach(item => quantity += item.quantity);
    // Update cart icon in navbar
    const cartQElement = document.querySelector(".js-cartQ");
    if (cartQElement) cartQElement.innerHTML = quantity;
    saveCart();
  };

 /* const updateWishList = () => {
    let quantity = 0;
    wish.forEach(item => quantity += item.quantity);
    setWishQuantity(quantity);
    saveWish();
  };  */

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

      {/* Render the Payment component */}
      <Payment />
    </div>
  );
};

export default Cart; 

/*

import { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import { products } from "../data/product";
import { Link } from "react-router-dom";
import Payment from "./Payment";

const Cart = () => {
  const { cartItems, cartQuantity, removeFromCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  // Calculate prices whenever cart items change
  useEffect(() => {
    calculatePrices();
  }, [cartItems]);

  const calculatePrices = () => {
    let calculatedSubtotal = 0;

    cartItems.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        const price = parseFloat(product.price.replace("$", "")) || 0;
        calculatedSubtotal += price * item.quantity;
      }
    });

    const calculatedShipping = calculatedSubtotal * 0.03; // 3% shipping
    const calculatedTotal = calculatedSubtotal + calculatedShipping;

    setSubtotal(calculatedSubtotal);
    setShipping(calculatedShipping);
    setTotal(calculatedTotal);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const item = cartItems.find((item) => item.productId === productId);
    if (item) {
      item.quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1
      calculatePrices();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="main p-4 max-w-6xl mx-auto">
        <div className="link-redirection text-sm text-gray-500 mb-4">
          <Link to="/" className="text-blue-500">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Cart</span>
        </div>

        <div className="empty text-center py-20 text-gray-400">
          <i className="bi bi-cart text-4xl"></i>
          <div className="first text-xl font-semibold mt-4">
            Your cart is empty
          </div>
          <div className="second text-sm">Add something to make me happy</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main p-4 max-w-6xl mx-auto">
      <div className="link-redirection text-sm text-gray-500 mb-4">
        <Link to="/" className="text-blue-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Cart</span>
      </div>

      <table className="w-full text-left mb-6">
        <thead>
          <tr className="border-b">
            <th className="py-2">Product</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;

            const price = parseFloat(product.price.replace("$", "")) || 0;
            const itemTotal = (price * item.quantity).toFixed(2);

            return (
              <tr key={item.productId} className="border-b">
                <td className="py-2 flex items-center gap-3">
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-500"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                  <img
                    src={product.image}
                    alt={product.item}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td>{product.item}</td>
                <td>${price.toFixed(2)}</td>
                <td>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                      className="px-2"
                    >
                      ▼
                    </button>
                    <span>{String(item.quantity).padStart(2, "0")}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                      className="px-2"
                    >
                      ▲
                    </button>
                  </div>
                </td>
                <td>${itemTotal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="action-box flex justify-between mb-6">
        <Link to="/" className="text-blue-500">
          Return To Shop
        </Link>
        <button onClick={calculatePrices} className="text-blue-500">
          Update Cart
        </button>
      </div>

      <div className="final-container bg-gray-100 p-4 rounded shadow">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping (3%):</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="orderBtn mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Place Order
        </button>
      </div>

      <Payment />
    </div>
  );
};

export default Cart;*/