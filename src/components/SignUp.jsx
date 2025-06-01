import React from "react";
import { Link } from "react-router-dom";
import "../styling/signup.css";
import portrait from "../assets/media/dl-beatsnoop.png";

function SignUp() {
  return (
    <div id="main">
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/signup">Sign Up</Link>
      </div>

      <div className="sign-up-container">
        <div className="sign-up-box">
          <div className="image-box">
            <img src={portrait} alt="" />
          </div>
          <div className="sign-up-details">
            <div className="title">Create an account</div>
            <span>Enter your details below</span>
            <div className="signup">
              <label htmlFor="email">
                <input type="text" name="" id="" placeholder="Name" />
              </label>
              <label htmlFor="mail">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Email or Phone Number"
                />
              </label>
              <label htmlFor="num">
                <input type="number" name="" id="" placeholder="Password" />
              </label>

              <div className="btn">
                <button className="create-acct">Create Account</button>
                <button className="signup-with-google">Sign up with Google</button>
              </div>
            </div>
            <span>
              Already have an account?
              <Link to={`/login`} style={{ color: "black" }}>
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
