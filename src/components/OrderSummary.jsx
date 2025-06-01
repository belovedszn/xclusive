import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ cart, getProducts }) => {
  const navigate = useNavigate();

  let productPrice = 0;
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    const product = getProducts(cartItem.productId);
    if (!product) return;

    const productPriceNumber = parseFloat(product.price.replace("$", "")) || 0;

    productPrice += productPriceNumber * cartItem.quantity;
    cartQuantity += cartItem.quantity;
  });

  const totalBeforeShipping = productPrice;
  const shipping = totalBeforeShipping * 0.03; // 3% shipping fee
  const total = totalBeforeShipping + shipping;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className="coupon-box">
        <input type="text" placeholder="Coupon Code" />
        <button>Apply Coupon</button>
      </div>
      <div className="cart-subtotal">
        <div className="sub-heading">Cart Total</div>
        <div className="total-box">
          <div>Subtotal:</div>
          <div>${totalBeforeShipping.toFixed(2)}</div>
        </div>
        <div className="total-box">
          <div>Shipping:</div>
          <div>${shipping.toFixed(2)}</div>
        </div>
        <div className="last-total-box">
          <div>Total:</div>
          <div>${total.toFixed(2)}</div>
        </div>
        <div className="proceed-btn">
          <button className="checkout" onClick={handleCheckout}>
            Proceed to checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
