import React from "react";

function CartEmptyState() {
  return (
    <div className="jsEmpty">
      <div className="empty">
        <i className="bi bi-cart"></i>
        <div className="first">Your cart is empty</div>
        <div className="second">Add something to make me happy</div>
      </div>
    </div>
  );
}

export default CartEmptyState;
