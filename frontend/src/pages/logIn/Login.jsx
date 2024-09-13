import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../api/auth";
import front_img from "../../assets/front_img.png";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await logIn(user);
      navigate("/dashboard");
      alert("Logged in successfully");
    } catch (err) {
      console.log("Error logging in: ", err);
      alert("Login failed. Please try again");
    }
  };
  return (
    <div className="signup">
      <div className="login_main">
        <h1 className="title">Log In</h1>
        <form className="signup_form" action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            value={user.userName}
            placeholder="User name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <button type="submit">Log In</button>
          <p>
            Don't have an account?{" "}
            <Link className="signup_login" to="/signUp">
              Signup
            </Link>
          </p>
        </form>
      </div>
      <div className="login_logo">
        <img src={front_img} className="logo" alt="" />
      </div>
    </div>
  );
};

export default Login;
