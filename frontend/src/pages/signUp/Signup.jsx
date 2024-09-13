import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth";
import front_img from "../../assets/front_img.png";
import "./signup.css";

const Signup = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signUp(user);
      alert("Signed up successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("Signup failed! Please try again");
      console.log("Error Signing up: ", err);
    }
  };
  return (
    <div className="signup">
      <div className="signup_logo">
        <img src={front_img} className="logo" alt="" />
      </div>
      <div className="signup_main">
        <h1 className="title">Sign Up</h1>
        <form className="signup_form" action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            value={user.userName}
            autoComplete="off"
            onChange={handleChange}
            placeholder="User name"
          />{" "}
          <input
            type="text"
            name="email"
            value={user.email}
            autoComplete="off"
            onChange={handleChange}
            placeholder="Email"
          />{" "}
          <input
            type="text"
            name="password"
            value={user.password}
            autoComplete="off"
            onChange={handleChange}
            placeholder="Password"
          />{" "}
          <input
            type="text"
            name="confirmPassword"
            placeholder="Confirm password"
          />
          <button type="submit">Sign Up</button>
          <p>
            Already have an account?{" "}
            <Link className="signup_login" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
