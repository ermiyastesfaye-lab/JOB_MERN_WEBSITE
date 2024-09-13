import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";
import front_img from "../../assets/front_img.png";
import logo from "../../assets/logo.png";

const Landing = () => {
  return (
    <div className="landing">
      <div className="land_header">
        <img src={logo} className="landing_logo" alt="" />
        <nav>
          <ul className="land_nav">
            <li>
              <Link className="link one" to="/login">
                <button>Login</button>
              </Link>
            </li>
            <li>
              <Link className="link two" to="/signup">
                <button>Register</button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="land_main">
        <div className="land_main_info">
          <p className="land_heading">EASY WAY TO GET YOUR DREAM JOB</p>
          <p className="land_desc">
            Let's work together to secure your dream job, which is offered by
            various companies and includes different positions, creating
            opportunities for a better life.
          </p>
          <Link to="/signup">
            <button>Get Started</button>
          </Link>
        </div>
        <div className="land_main_img">
          <img src={front_img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
