import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import { logOut } from "../../api/auth";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./MyProfile.css";

const MyProfile = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };

  const [cookie] = useCookies(["user_id"]);
  const user_id = cookie.user_id;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${user_id}`,
        {
          withCredentials: true,
        }
      );
      alert("Profile Deleted successfully!");
      navigate("/signup");
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  return (
    <div className="profile">
      <NavBar />
      <i class="bi bi-person-circle"></i>
      <br />
      <div className="btn">
        <Link className="edit_btn" to="/editprofile">
          <button className="edit">Edit</button>
        </Link>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <br />
      <button className="logout" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};

export default MyProfile;
