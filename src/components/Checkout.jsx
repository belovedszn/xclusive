import React from "react";
import { useCart } from "../context/CartContext"; // Adjust path if needed
import { products } from "../data/product";
import "../styling/checkout.css";
import { Link } from "react-router-dom";
import visa from "../assets/media/visa.png";
import mscard from "../assets/media/mscard.png";
import bKash from "../assets/media/bKash.png";
import payWind from "../assets/media/payWind.png";

const Checkout = () => {
  const { cartItems, cartQuantity } = useCart();

  // Helper to get product info
  const getProduct = (id) => products.find((p) => p.id === id);

  const subtotal = cartItems.reduce((acc, item) => {
    const product = getProduct(item.productId);
    const price = parseFloat(product?.price?.replace("$", "") || 0);
    return acc + price * item.quantity;
  }, 0);

  const shippingFee = subtotal * 0.03;
  const total = subtotal + shippingFee;

  return (
    <div className="main">
      {/* Breadcrumb */}
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/cart" className="first">
          myCart
        </Link>
        <div>/</div>
        <Link to="/checkout">Checkout</Link>
      </div>

      {/* Billing Details */}
      <div className="billing-container">
        <div>Billing Details</div>
      </div>

      <div className="checkout-container">
        <div className="billing-box">
          <form>
            <label htmlFor="fname">First Name*</label>
            <input type="text" id="fname" />

            <label htmlFor="lname">Last Name</label>
            <input type="text" id="lname" />

            <label htmlFor="address">Street Address*</label>
            <input type="text" id="address" />

            <label htmlFor="apt">Apartment, floor, etc. (optional)</label>
            <input type="text" id="apt" />

            <label htmlFor="city">Town/City</label>
            <input type="text" id="city" />

            <label htmlFor="phone">Phone Number*</label>
            <input type="text" id="phone" />

            <label htmlFor="email">Email Address*</label>
            <input type="text" id="email" />

            <div className="checkbox">
              <input type="checkbox" id="saveInfo" />
              <label htmlFor="saveInfo">
                Save this info for faster checkout next time
              </label>
            </div>
          </form>
        </div>

        {/* Cart Summary */}
        <div className="final-container">
          <div className="cart-subtotal">
            {cartItems.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;

              return (
                <div className="item-box" key={item.productId}>
                  <div className="first">
                    <img src={product.image} alt={product.item} />
                    <div>{product.item}</div>
                  </div>
                  <div>{product.price}</div>
                </div>
              );
            })}

            <div className="total-box">
              <div>Subtotal:</div>
              <div>${subtotal.toFixed(2)}</div>
            </div>

            <div className="total-box">
              <div>Shipping:</div>
              <div>${shippingFee.toFixed(2)}</div>
            </div>

            <div className="last-total-box">
              <div>Total:</div>
              <div>${total.toFixed(2)}</div>
            </div>

            <div className="payment radio-container">
              <div className="payment-method">
                <div className="first">
                  <label>
                    <input type="radio" name="payment" defaultChecked />
                    <span className="custom-radio"></span>
                    Bank
                  </label>
                </div>
              </div>

              <div className="payment-method">
                <img src={mscard} alt="mscard" />
                <img src={visa} alt="visa" />
                <img src={bKash} alt="bKash" />
                <img src={payWind} alt="payWind" />
              </div>
            </div>

            <div className="payment">
              <div className="payment-method">
                <div className="first">
                  <label>
                    <input type="radio" name="payment" />
                    <span className="custom-radio"></span>
                    Cash on delivery
                  </label>
                </div>
              </div>
            </div>

            <div className="coupon-box">
              <input type="text" placeholder="Coupon Code" />
              <button type="button">Apply Coupon</button>
            </div>

            <button className="orderBtn">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
