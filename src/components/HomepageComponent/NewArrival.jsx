import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsApi } from "../../backend/api";
import sliderData from "../../data/new-arrival";

function NewArrival() {
  const [isProduct, setIsProduct] = useState([]);

  useEffect(() => {
    fetch("/api/new-arrival")
      .then((response) => response.json())
      .then((data) => setIsProduct(data.products));
  }, []);

  useEffect(() => {
    const productId = localStorage.getItem("selectedProduct");
    if (productId) {
      productsApi(productId)
        .then((product) => console.log("Fetched product:", product))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, []);

  return (
    <div className="featured-box">
      <div className="first-box">
        <div className="block"></div>
        <div>Featured</div>
      </div>
      <div className="second-box">
        <div className="first">
          <div>New Arrival</div>
        </div>
      </div>
      
        <div className="third-box">
          <div className="photoArray">
            <div>
              <div className="layer">
                <h3>PlayStation 5</h3>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <Link className="btn" to={`/product/`}>
                Shop Now
              </Link>
              </div>
            </div>

            <div></div>
            <div>
              <div className="layer">
                <h3>Women's Collection</h3>
                <p>Featured women collections that give you another vibe.</p>
                <a href="">Shop Now</a>
              </div>
            </div>
            <div>
              <div className="layer">
                <h3>Speakers</h3>
                <p>Amazon wireless speakers.</p>
                <a href="">Shop Now</a>
              </div>
            </div>
            <div>
              <div className="layer">
                <h3>Cologne</h3>
                <p>GUCCI INTENSE OUD ESP Perfume.</p>
                <a href="">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
    
    </div>
  );
}

export default NewArrival;
