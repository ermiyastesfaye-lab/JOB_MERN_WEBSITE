import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./navBar.css";

const NavBar = () => {
  return (
    <div className="nav">
      <img src={logo} className="nav_logo" alt="" />
      <nav>
        <ul className="dash_nav">
          <li>
            <div className="each_nav">
              <i className="fa-solid fa-house"></i>
              <Link className="link" to="/dashboard">
                Dashboard
              </Link>
            </div>
          </li>
          <li>
            <div className="each_nav">
              <i className="fa-solid fa-rectangle-list"></i>
              <Link className="link" to="/joblisting">
                Job Listings
              </Link>
            </div>
          </li>
          <li>
            <div className="each_nav">
              <i className="fa-regular fa-square-plus"></i>
              <Link className="link" to="/postjob">
                Post job
              </Link>
            </div>
          </li>
          <li>
            <div className="each_nav">
              <i className="fa-solid fa-envelope"></i>
              <Link className="link" to="/jobapplication">
                My Application
              </Link>
            </div>
          </li>
          <li>
            <div className="each_nav">
              <i className="fa-solid fa-user"></i>
              <Link className="link" to="/profile">
                My profile
              </Link>
            </div>
          </li>
          <li>
            <div className="each_nav">
              <i className="fa-solid fa-message"></i>
              <Link className="link" to="/contact">
                Contact Us
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
