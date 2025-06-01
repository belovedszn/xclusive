import React from "react";
import CellPhone from "../../assets/media/Category-CellPhone.png";
import Computer from "../../assets/media/Category-Computer.png";
import SmartWatch from "../../assets/media/Category-SmartWatch.png";
import Camera from "../../assets/media/Category-Camera.png";
import Headphone from "../../assets/media/Category-Headphone.png";
import Gamepad from "../../assets/media/Category-Gamepad.png";
function SelectCategory() {
  return (
    <div className="category-page">
      <div className="first-box">
        <div className="block"></div>
        <div>Categories</div>
      </div>
      <div className="second-box">
        <div className="first">
          <div>Browse By Category</div>
        </div>
      </div>
      <div className="third-box">
        <div className="container">
          <div className="slider-wrapper">
            <div className="category-grid js-category" id="autoWidth">
              <div className="product-box">
                <div className="category-card">
                  <div className="image-wrapper">
                    <img src={CellPhone} />
                    <div>Phone</div>
                  </div>
                </div>
              </div>
              <div className="product-box">
                <div className="category-card">
                  <div className="image-wrapper">
                    <img src={Computer} />
                    <div>Computer</div>
                  </div>
                </div>
              </div>
              <div className="product-box">
                <div className="category-card">
                  <div className="image-wrapper">
                    <img src={SmartWatch} />
                    <div>Smartwatch</div>
                  </div>
                </div>
              </div>
              <div className="product-box">
                <div className="category-card">
                  <div className="image-wrapper">
                    <img src={Camera} />
                    <div>Camera</div>
                  </div>
                </div>
              </div>
              <div className="product-box">
                <div className="category-card">
                  <div className="image-wrapper">
                    <img src={Headphone} />
                    <div>Headphone</div>
                  </div>
                </div>
              </div>
              <div className="product-box">
                <div className="category-card">
                  <div className="image-wrapper">
                    <img src={Gamepad} />
                    <div>Gamepad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectCategory;
