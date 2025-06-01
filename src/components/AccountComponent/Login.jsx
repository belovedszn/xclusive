import React from "react";
import "../../styling/signup.css";
import { Link } from "react-router-dom";
import portrait from "../../assets/media/dl-beatsnoop.png";

function Login() {
  return (
    <div className="main">
      <div className="link-redirection">
        <Link to="/" className="first">
          Home
        </Link>
        <div>/</div>
        <Link to="/logout">Login</Link>
      </div>

      <div className="sign-up-container">
        <div className="sign-up-box">
          <div className="image-box">
            <img src={portrait} alt="" />
          </div>
          <div className="sign-up-details">
            <div className="title">Log in to Xclusive</div>
            <span>Enter your details below</span>
            <div className="signup">
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

              <div className="login-btn">
                <button className="create-acct">Login</button>
                <Link className="forget-password">Forget Password?</Link>
              </div>
            </div>
            <span>
              <Link to={`/signup`} style={{ color: "black" }}>
              Doesn't have an account?, create an account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
