import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import axios from "axios";
import "../jobListings/jobListing.css";
import logo from "../../assets/logo.png";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem("job_id", job._id);
    navigate("/myapplicant");
  };
  const handleEdit = () => {
    localStorage.setItem("job_id", job._id);
    navigate("edit");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/jobs/${job._id}`,
        {
          withCredentials: true,
        }
      );
      alert("Job Deleted successfully!");
      navigate("/postjob");
    } catch (err) {
      console.log("Error: ", err);
    }
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
        <button className="job_btns" onClick={handleEdit}>
          Edit
        </button>
        <button className="job_btns" onClick={handleClick}>
          Applicants
        </button>
      </div>
      <div className="job_btn">
        <button className="job_btns" onClick={handleDelete}>
          Delete
        </button>
        <button className="job_btns">Details</button>
      </div>
    </div>
  );
};

const MyPost = () => {
  let [jobs, setJobs] = useState([]);
  const [cookie] = useCookies("user_id");
  const userId = cookie.user_id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/api/jobs`, {
        withCredentials: true,
      });
      setJobs(response.data);
    };
    fetchData();
    localStorage.removeItem("job_id");
  }, []);
  jobs = jobs.filter((job) => job.jobCreator === userId);
  return (
    <div className="listing">
      <NavBar />
      {jobs.map((job) => {
        return <Job job={job} key={job._id} />;
      })}
    </div>
  );
};

export default MyPost;
