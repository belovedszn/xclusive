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
import CartEmptyState from "./state/CartEmptyState.jsx";

const Cart = () => {
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setCartItems([...getCart()]);
    });
    return unsubscribe;
  }, []);

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleIncreaseQuantity = (productId) => {
    updateCartQuantity(productId, "increase");
  };

  const handleDecreaseQuantity = (productId) => {
    updateCartQuantity(productId, "decrease");
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

  const renderEmptyState = () => <CartEmptyState />;

  /* const renderEmptyState = () => {
    <div className="empty">
      <i className="bi bi-cart"></i>
      <div className="first">Your cart is empty</div>
      <div className="second">Add something to make me happy</div>
    </div>;
  }; */

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
        <CartEmptyState />
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

          <Payment cartItems={cartItems} />
        </>
      )}
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

       <div className="jsEmpty">
        {cartItems.length === 0 && renderEmptyState()}
      </div>
 */
