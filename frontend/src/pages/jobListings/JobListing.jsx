import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobListing.css";
import logo from "../../assets/logo.png";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem("job_id", job._id);
    navigate("apply");
  };
  return (
    <div className="each_listing">
      <div className="job_header">
        <img src={logo} className="listing_logo" alt="" />
        <div className="job_head_desc">
          <p className="job_company">{job.jobCompany}</p>
          <p className="job_location">{job.jobLocation}</p>
        </div>
      </div>
      <h4 className="job_title">{job.jobTitle}</h4>
      <div className="job_info">
        <p className="job_type">{job.jobType}</p>
        <p className="job_category">{job.jobCategory}</p>
      </div>
      <p className="job_deadline">
        Deadline: <span className="date">{job.jobDeadline}</span>
      </p>
      <div className="job_btn">
        <button className="job_btns" onClick={handleClick}>
          Apply
        </button>
        <button className="job_btns">Detail</button>
      </div>
    </div>
  );
};

const JobListing = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/jobs", {
        withCredentials: true,
      });
      console.log(response);
      setJobs(response.data);
    };
    fetchData();
    localStorage.removeItem("job_id");
  }, []);
  console.log(jobs);
  return (
    <div className="listing">
      <NavBar />
      {jobs.map((job) => {
        return <Job job={job} key={job._id} />;
      })}
    </div>
  );
};

export default JobListing;
