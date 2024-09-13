import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./postJob.css";

const PostJob = () => {
  const [cookie] = useCookies(["user_id"]);
  const userId = cookie.user_id;
  const [job, setJob] = useState({
    jobCreator: userId,
    jobTitle: "",
    jobCategory: "",
    jobCompany: "",
    jobLocation: "",
    jobType: "",
    jobDescription: "",
    jobQualification: "",
    jobSalary: "",
    jobDeadline: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/jobs", job, {
        withCredentials: true,
      });
      console.log(response);
      alert("Job posting successfull!");
      navigate("/joblisting");
    } catch (err) {
      alert("Job posting failed!");
      console.log("message: ", err);
    }
  };
  return (
    <div className="postJob">
      <NavBar />
      <Link className="my_post" to="/mypost">
        My Posts
      </Link>
      <form className="job_form" action="" onSubmit={handleSubmit}>
        <div>
          <p className="category">About Company</p>
          <div className="aboutCompany">
            <div className="abtCompany">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={job.jobTitle}
                onChange={handleChange}
                placeholder="Job title"
              />
            </div>
            <div className="abtCompany">
              <label htmlFor="jobCompany">Job Company</label>
              <input
                type="text"
                id="jobCompany"
                name="jobCompany"
                value={job.jobCompany}
                onChange={handleChange}
                placeholder="Job company"
              />
            </div>
            <div className="abtCompany">
              <label htmlFor="jobLocation">Job Location</label>
              <input
                type="text"
                id="jobLocation"
                name="jobLocation"
                value={job.jobLocation}
                onChange={handleChange}
                placeholder="Job location"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="category">Job Detail</p>
          <div className="job_detail">
            <div className="job_info">
              <div className="each_info">
                <label htmlFor="jobCategory">Job Category</label>
                <input
                  type="text"
                  id="jobCategory"
                  name="jobCategory"
                  value={job.jobCategory}
                  onChange={handleChange}
                  placeholder="Job category"
                />
              </div>
              <div className="each_info">
                <label htmlFor="jobDescription">Job Description</label>
                <textarea
                  type="text"
                  id="jobDescription"
                  name="jobDescription"
                  value={job.jobDescription}
                  onChange={handleChange}
                  placeholder="Job description"
                />
              </div>
            </div>
            <div className="job_info">
              <div className="each_info">
                <label htmlFor="jobType">Job Type</label>
                <input
                  type="text"
                  id="jobType"
                  name="jobType"
                  value={job.jobType}
                  onChange={handleChange}
                  placeholder="Job type"
                />
              </div>
              <div className="each_info">
                <label htmlFor="jobQualification">Job Qualification</label>
                <textarea
                  type="text"
                  id="jobQualification"
                  name="jobQualification"
                  value={job.jobQualification}
                  onChange={handleChange}
                  placeholder="Job qualification"
                />
              </div>
            </div>
            <div className="job_info">
              <div className="each_info">
                <label htmlFor="jobSalary">Job Salary</label>
                <input
                  type="text"
                  id="jobSalary"
                  name="jobSalary"
                  value={job.jobSalary}
                  onChange={handleChange}
                  placeholder="Salary"
                />
              </div>
              <div className="each_info">
                <label htmlFor="jobDeadline">Job Deadline</label>
                <input
                  type="date"
                  id="jobDeadline"
                  name="jobDeadline"
                  value={job.jobDeadline}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="contact-btn" type="submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostJob;
