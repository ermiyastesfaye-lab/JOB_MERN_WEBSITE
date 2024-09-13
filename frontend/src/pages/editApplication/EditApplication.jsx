import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../apply/apply.css";
const EditApplication = () => {
  const [apply, setApply] = useState({
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
    const updatedApplication = {};

    if (apply.applicantName)
      updatedApplication.applicantName = apply.applicantName;
    if (apply.applicantEmail)
      updatedApplication.applicantEmail = apply.applicantEmail;
    if (apply.applicantPhoneNumber)
      updatedApplication.applicantPhoneNumber = apply.applicantPhoneNumber;
    if (apply.applicantResume)
      updatedApplication.applicantResume = apply.applicantResume;
    if (apply.applicantCoverLetter)
      updatedApplication.applicantCoverLetter = apply.applicantCoverLetter;
    const formData = new FormData();
    for (const key in updatedApplication) {
      formData.append(key, updatedApplication[key]);
    }
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const application_id = localStorage.getItem("application_id");
    try {
      const response = await axios.put(
        `http://localhost:5000/api/applications/${application_id}`,
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
      alert("Application updated successfully");
      navigate("/jobapplication");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };
  return (
    <div className="apply">
      <NavBar />
      <p className="titlea">Edit Application</p>
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

export default EditApplication;
