import React, { useEffect, useState } from "react";
import { getCart } from "../utils/cart.js";
import { products } from "../data/product.js";
import { useNavigate } from "react-router-dom";

const Payment = ({ cartItems }) => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    totalBeforeShipping: 0,
    shipping: 0,
    total: 0,
  });

  useEffect(() => {
    calculateOrderPayment();
  }, [cartItems]);

  const calculateOrderPayment = () => {
    let productPrice = 0;
    let quantity = 0;

    cartItems.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) return;

      const productPriceNumber =
        parseFloat(product.price.replace("$", "")) || 0;
      productPrice += productPriceNumber * cartItem.quantity;
      quantity += cartItem.quantity;
    });

    const shipping = productPrice * 0.03; // 3% shipping fee
    const total = productPrice + shipping;

    setPaymentDetails({
      totalBeforeShipping: productPrice,
      shipping,
      total,
    });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="final-container JScontainer">
      <div className="coupon-box">
        <input type="text" placeholder="Coupon Code" />
        <button>Apply Coupon</button>
      </div>
      <div className="cart-subtotal">
        <div className="sub-heading">Cart Total</div>
        <div className="total-box">
          <div>Subtotal:</div>
          <div>${paymentDetails.totalBeforeShipping.toFixed(2)}</div>
        </div>
        <div className="total-box">
          <div>Shipping:</div>
          <div>${paymentDetails.shipping.toFixed(2)}</div>
        </div>
        <div className="last-total-box">
          <div>Total:</div>
          <div>${paymentDetails.total.toFixed(2)}</div>
        </div>
        <div className="proceed-btn">
          <button className="checkout" onClick={handleCheckout}>
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
