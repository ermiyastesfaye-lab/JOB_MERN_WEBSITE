import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./apply.css";

const Apply = () => {
  const [cookie] = useCookies(["user_id"]);
  const user_id = cookie.user_id;
  const job_id = localStorage.getItem("job_id");
  const [apply, setApply] = useState({
    applicant: user_id,
    jobId: job_id,
    applicantName: "",
    applicantEmail: "",
    applicantPhoneNumber: "",
    applicantResume: null,
    applicantCoverLetter: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setApply({
      ...apply,
      [name]: name === "applicantResume" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in apply) {
      formData.append(key, apply[key]);
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/applications",
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
      alert("Applied successfully");
      navigate("/jobapplication");
    } catch (err) {
      console.log(err);
      alert("Application failed");
    }
  };
  return (
    <div className="apply">
      <NavBar />
      <p className="titlea">Apply</p>
      <form className="apply_form" action="" onSubmit={handleSubmit}>
        <div>
          <div className="apply_category">
            <input
              type="text"
              name="applicantName"
              value={apply.applicantName}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="applicantEmail"
              value={apply.applicantEmail}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="apply_category">
            <input
              type="text"
              name="applicantPhoneNumber"
              value={apply.applicantPhoneNumber}
              onChange={handleChange}
              placeholder="Phone number"
            />
            <input
              type="file"
              name="applicantResume"
              onChange={handleChange}
              placeholder="CV"
            />
          </div>
        </div>
        <textarea
          name="applicantCoverLetter"
          id=""
          value={apply.applicantCoverLetter}
          onChange={handleChange}
          placeholder="Cover letter"
        ></textarea>
        <br />
        <button className="contact-btn" type="submit">
          Apply
        </button>
      </form>
    </div>
  );
};

export default Apply;
