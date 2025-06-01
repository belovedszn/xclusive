import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Layout from "./components/Layout";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import About from "./components/About";
import SignUp from "./components/SignUp";
import Search from "./components/Search";
import Account from "./components/AccountComponent/ManageAccount";
import Orders from "./components/AccountComponent/Orders";
import Cancels from "./components/AccountComponent/Cancels";
import Reviews from "./components/AccountComponent/Reviews";
import Login from "./components/AccountComponent/Login";
import Checkout from "./components/Checkout";
import Product from "./components/HomepageComponent/Product";
import Sales from "./components/Sales";
import SeeAll from "./components/HomepageComponent/SeeAll";
import NotFound from "./components/NotFound";
import PrivacyPolicy from "./components/AccountComponent/PrivacyPolicy";
import FAQ from "./components/AccountComponent/FAQ";

// backend area (keep off!)
import { server } from "./backend/server";
server();

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />

        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />

        <Route path="wishlist" element={<Wishlist />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />

        <Route path="account" element={<Account />} />
        <Route path="orders" element={<Orders />} />
        <Route path="cancels" element={<Cancels />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="login" element={<Login />} />
        <Route path="all" element={<SeeAll />} />

        <Route path="/product" element={<Sales />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
