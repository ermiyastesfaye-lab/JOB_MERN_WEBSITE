import React, { useState } from "react";
import NavBar from "../navBar/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
const EditProfile = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [cookie] = useCookies(["user_id"]);
  const user_id = cookie.user_id;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {};
    if (user.userName) updatedUser.userName = user.userName;
    if (user.email) updatedUser.email = user.email;
    if (user.password) updatedUser.password = user.password;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${user_id}`,
        updatedUser,
        {
          withCredentials: true,
        }
      );
      alert("Profile editing successfully!");
      navigate("/profile");
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  return (
    <div>
      <NavBar />
      <h1 className="title">Edit profile</h1>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProfile;
