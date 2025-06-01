import React from "react";
import deliveryIcon from "../../assets/media/icon-delivery.png";
import customerIcon from "../../assets/media/Icon-customer.png";
import secureIcon from "../../assets/media/Icon-secure.png";

function LastBox() {
  return (
    <div className="last-box">
      <div className="icon-container">
        <div className="icon-box">
          <div className="inner-one">
            <div className="inner-two">
              <img src={deliveryIcon} />
            </div>
          </div>
          <div className="icon-content">
            <h3>free and fast delivery</h3>
            <p>free delivery for all orders above $100</p>
          </div>
        </div>
        <div className="icon-box">
          <div className="inner-one">
            <div className="inner-two">
              <img src={customerIcon} />
            </div>
          </div>
          <div className="icon-content">
            <h3>24/7 customer service</h3>
            <p>friendly 24/7 customer service</p>
          </div>
        </div>
        <div className="icon-box">
          <div className="inner-one">
            <div className="inner-two">
              <img src={secureIcon} />
            </div>
          </div>
          <div className="icon-content">
            <h3>money back guarantee</h3>
            <p>we return money within 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastBox;
