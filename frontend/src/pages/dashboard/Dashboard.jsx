import React from "react";
import NavBar from "../../components/navBar/NavBar";
import front_img from "../../assets/front_img.png";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dash">
      <NavBar />
      <div className="land_main main_dash">
        <div className="land_main_info">
          <p className="dash_heading">EASY WAY TO GET YOUR DREAM JOB</p>
          <p className="land_desc">
            Let's work together to secure your dream job, which is offered by
            various companies and includes different positions, creating
            opportunities for a better life.
          </p>
          <Link to="/jobListing">
            <button>Explore</button>
          </Link>
        </div>
        <div className="dash_main_img">
          <img src={front_img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
