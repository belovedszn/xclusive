import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishProvider } from "./context/WishContext";
//import Test from "./Test";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CartProvider>
    <WishProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WishProvider>
  </CartProvider>
);
