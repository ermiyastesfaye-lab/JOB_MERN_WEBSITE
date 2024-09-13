import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import logo from "../../assets/logo.png";

const Application = ({ application }) => {
  const [jobs, setJob] = useState([]);

  useEffect(() => {
    const fetchData = async (application) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/jobs/${application.jobId}`,
          { withCredentials: true }
        );
        setJob(response.data);
      } catch (err) {
        console.log("error: ", err);
      }
    };
    fetchData(application);
    localStorage.removeItem("application_id");
  }, [application.jobId]);

  const navigate = useNavigate();

  const handleEdit = () => {
    localStorage.setItem("application_id", application._id);
    navigate("edit");
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/applications/${application._id}`,
        { withCredentials: true }
      );
      alert("Application Deleted successfully!");
      fetchData();
      navigate("/joblisting");
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  return (
    <div className="each_listing">
      <div className="job_header">
        <img src={logo} className="listing_logo" alt="" />
        <div className="job_head_desc">
          <p className="job_company">{jobs.jobCompany}</p>
          <p className="job_location">{application.applicationDate}</p>
        </div>
      </div>
      <h4 className="job_title">{jobs.jobTitle}</h4>
      <div className="job_info">
        <p className="job_type">{jobs.jobType}</p>
      </div>
      <p className="job_deadline">
        <p>{jobs.jobSalary}</p>
      </p>
      <div className="job_btn">
        <button className="job_btns" onClick={handleEdit}>
          Edit
        </button>
        <button className="job_btns" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

const JobApplication = () => {
  const [applications, setApplication] = useState([]);
  const [cookie] = useCookies(["user_id"]);
  const user_id = cookie.user_id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/applications",
          {
            withCredentials: true,
          }
        );
        setApplication(response.data);
      } catch (err) {
        console.log("error: ", err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="listing">
      <NavBar />
      {applications.map((application) => {
        return application.applicant === user_id ? (
          <Application application={application} key={application._id} />
        ) : null;
      })}
    </div>
  );
};

export default JobApplication;
