/*import { useEffect, useState } from "react";
import { cart } from "../utils/cart.js";
//import { getProducts } from "../data/product.js";
import { products } from "../data/product.js";
import "../styling/cart.css";

const Payment = () => {
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    calculatePayment();
  }, []);

  const calculatePayment = () => {
    let productPrice = 0;
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      //const product = getProducts(cartItem.productId);
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) return;

      const productPriceNumber =
        parseFloat(product.price.replace("$", "")) || 0;
      productPrice += productPriceNumber * cartItem.quantity;
      cartQuantity += cartItem.quantity;
    });

    const totalBeforeShipping = productPrice;
    const shipping = totalBeforeShipping * 0.003; // 3% shipping
    const total = totalBeforeShipping + shipping;

    setPaymentSummary({
      subtotal: totalBeforeShipping.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
    });
  };

  const handleCheckout = () => {
   // window.location.href = "checkout.html";
   navigate("/checkout")
  };

  if (!paymentSummary) return <div>Loading payment details...</div>;

  return (
    <div className="payment-container">
      <div className="final-container">
        <div className="coupon-box">
          <input type="text" placeholder="Coupon Code" />
          <button>Apply Coupon</button>
        </div>
        <div className="cart-subtotal">
          <div className="sub-heading">Cart Total</div>
          <div className="total-box">
            <div>Subtotal:</div>
            <div>${paymentSummary.subtotal}</div>
          </div>
          <div className="total-box">
            <div>Shipping:</div>
            <div>${paymentSummary.shipping}</div>
          </div>
          <div className="last-total-box">
            <div>Total:</div>
            <div>${paymentSummary.total}</div>
          </div>
          <div className="proceed-btn">
            <button className="checkout" onClick={handleCheckout}>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 



import { useEffect, useState } from "react";
import { cart } from "../utils/cart.js";
import { products } from "../data/product.js";
import { useNavigate } from "react-router-dom";
import "../styling/cart.css";

const Payment = () => {
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    calculatePayment();
  }, []);

  const calculatePayment = () => {
    let productPrice = 0;
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) return;

      const productPriceNumber = parseFloat(product.price.replace("$", "")) || 0;
      productPrice += productPriceNumber * cartItem.quantity;
      cartQuantity += cartItem.quantity;
    });

    const totalBeforeShipping = productPrice;
    const shipping = totalBeforeShipping * 0.003;
    const total = totalBeforeShipping + shipping;

    setPaymentSummary({
      subtotal: totalBeforeShipping.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
    });

    setIsCartEmpty(cartQuantity === 0); // check if cart is empty
  };

  const handleCheckout = () => {
    if (!isCartEmpty) {
      navigate("/checkout");
    }
  };

  if (!paymentSummary) return <div>Loading payment details...</div>;

  return (
    <div className="payment-container">
      <div className="final-container">
        <div className="coupon-box">
          <input type="text" placeholder="Coupon Code" />
          <button>Apply Coupon</button>
        </div>
        <div className="cart-subtotal">
          <div className="sub-heading">Cart Total</div>
          <div className="total-box">
            <div>Subtotal:</div>
            <div>${paymentSummary.subtotal}</div>
          </div>
          <div className="total-box">
            <div>Shipping:</div>
            <div>${paymentSummary.shipping}</div>
          </div>
          <div className="last-total-box">
            <div>Total:</div>
            <div>${paymentSummary.total}</div>
          </div>
          <div className="proceed-btn">
            <button
              className="checkout"
              onClick={handleCheckout}
              disabled={isCartEmpty}
              style={{
                cursor: isCartEmpty ? "not-allowed" : "pointer",
                opacity: isCartEmpty ? 0.5 : 1,
              }}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; */

/*

import { useEffect, useState } from "react";
import { cart, subscribe } from "../utils/cart.js";
import { products } from "../data/product.js";
import { useNavigate } from "react-router-dom";
import "../styling/cart.css";

const Payment = () => {
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial calculation
    calculatePayment();

    // Subscribe to cart changes
    const unsubscribe = subscribe(() => {
      calculatePayment();
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  const calculatePayment = () => {
    let productPrice = 0;
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) return;

      const productPriceNumber = parseFloat(product.price.replace("$", "")) || 0;
      productPrice += productPriceNumber * cartItem.quantity;
      cartQuantity += cartItem.quantity;
    });

    const totalBeforeShipping = productPrice;
    const shipping = totalBeforeShipping * 0.03; // 3%
    const total = totalBeforeShipping + shipping;

    setPaymentSummary({
      subtotal: totalBeforeShipping.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
    });

    setIsCartEmpty(cartQuantity === 0);
  };

  const handleCheckout = () => {
    if (!isCartEmpty) {
      navigate("/checkout");
    }
  };

  if (!paymentSummary) return <div>Loading payment details...</div>;

  return (
    <div className="payment-container">
      <div className="final-container">
        <div className="coupon-box">
          <input type="text" placeholder="Coupon Code" />
          <button>Apply Coupon</button>
        </div>
        <div className="cart-subtotal">
          <div className="sub-heading">Cart Total</div>
          <div className="total-box">
            <div>Subtotal:</div>
            <div>${paymentSummary.subtotal}</div>
          </div>
          <div className="total-box">
            <div>Shipping:</div>
            <div>${paymentSummary.shipping}</div>
          </div>
          <div className="last-total-box">
            <div>Total:</div>
            <div>${paymentSummary.total}</div>
          </div>
          <div className="proceed-btn">
            <button
              className="checkout"
              onClick={handleCheckout}
              disabled={isCartEmpty}
              style={{
                cursor: isCartEmpty ? "not-allowed" : "pointer",
                opacity: isCartEmpty ? 0.5 : 1,
              }}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 

import { useEffect, useState } from "react";
import { cart, subscribe } from "../utils/cart.js";
import { products } from "../data/product.js";
import { useNavigate } from "react-router-dom";
import "../styling/cart.css";

const Payment = () => {
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();

  const calculatePayment = () => {
    let productPrice = 0;
    let quantity = 0;

    cart.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) return;

      const productPriceNumber = parseFloat(product.price.replace("$", "")) || 0;
      productPrice += productPriceNumber * cartItem.quantity;
      quantity += cartItem.quantity;
    });

    const subtotal = productPrice;
    const shipping = subtotal * 0.03;
    const total = subtotal + shipping;

    setPaymentSummary({
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
    });

    setCartQuantity(quantity);
  };

  useEffect(() => {
    calculatePayment();
    const unsubscribe = subscribe(calculatePayment);
    return () => unsubscribe();
  }, []);

  const handleCheckout = () => {
    if (cartQuantity > 0) {
      navigate("/checkout");
    }
  };

  if (cartQuantity === 0) {
    return null;
  }

  if (!paymentSummary) return <div>Loading payment details...</div>;

  return (
    <div className="payment-container">
      <div className="final-container">
        <div className="coupon-box">
          <input type="text" placeholder="Coupon Code" />
          <button>Apply Coupon</button>
        </div>
        <div className="cart-subtotal">
          <div className="sub-heading">Cart Total</div>
          <div className="total-box">
            <div>Subtotal:</div>
            <div>${paymentSummary.subtotal}</div>
          </div>
          <div className="total-box">
            <div>Shipping:</div>
            <div>${paymentSummary.shipping}</div>
          </div>
          <div className="last-total-box">
            <div>Total:</div>
            <div>${paymentSummary.total}</div>
          </div>
          <div className="proceed-btn">
            <button
              className="checkout"
              onClick={handleCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 

import { useEffect, useState } from "react";
import { cart, subscribe } from "../utils/cart.js";
import { products } from "../data/product.js";
import { useNavigate } from "react-router-dom";
import "../styling/cart.css";

const Payment = () => {
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();

  const calculatePayment = () => {
    let productPrice = 0;
    let quantity = 0;

    cart.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) return;

      const productPriceNumber = parseFloat(product.price.replace("$", "")) || 0;
      productPrice += productPriceNumber * cartItem.quantity;
      quantity += cartItem.quantity;
    });

    const subtotal = productPrice;
    const shipping = subtotal * 0.03;
    const total = subtotal + shipping;

    setPaymentSummary({
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
    });

    setCartQuantity(quantity);
  };

  useEffect(() => {
    calculatePayment();
    const unsubscribe = subscribe(calculatePayment);
    return () => unsubscribe();
  }, []);

  const handleCheckout = () => {
    if (cartQuantity > 0) {
      navigate("/checkout");
    }
  };

  if (cartQuantity === 0) {
    return null;
  }

  if (!paymentSummary) return <div>Loading payment details...</div>;

  return (
    <div className="payment-container">
      <div className="final-container">
        <div className="coupon-box">
          <input type="text" placeholder="Coupon Code" />
          <button>Apply Coupon</button>
        </div>
        <div className="cart-subtotal">
          <div className="sub-heading">Cart Total</div>
          <div className="total-box">
            <div>Subtotal:</div>
            <div>${paymentSummary.subtotal}</div>
          </div>
          <div className="total-box">
            <div>Shipping:</div>
            <div>${paymentSummary.shipping}</div>
          </div>
          <div className="last-total-box">
            <div>Total:</div>
            <div>${paymentSummary.total}</div>
          </div>
          <div className="proceed-btn">
            <button
              className="checkout"
              onClick={handleCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; */

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
