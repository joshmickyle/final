import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <nav>
      <div className="nav-wrapper">
        <div className="brand-logo left">
          <Link to="/">Simplicity</Link>
        </div>
        <ul id="nav-mobile" className="right">
          <li>
            <Link to="/Productpage1">Products</Link>
          </li>
          {userInfo ? (
            <li>{userInfo.name}</li>
          ) : (
            <li>
              <Link to="/signin">Register</Link>
            </li>
          )}
          <li>
            <Link to="/">Cart</Link>
          </li>
          <li>
            <Link to="/About">About Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
