import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import { Link } from "react-router-dom";
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
  }, [application.jobId]);
  return (
    <div className="each_listing">
      <div className="job_header">
        <img src={logo} className="listing_logo" alt="" />
        <div className="job_head_desc">
          <p className="job_company">{application.applicantName}</p>
          <p className="job_location">{application.applicantEmail}</p>
        </div>
      </div>
      <h4 className="job_title">{application.applicantPhoneNumber}</h4>
      <p className="job_deadline">
        <p>{jobs.jobSalary}</p>
      </p>
      <div className="job_btn">
        <Link to="details">
          <button className="job_btns">Letter</button>
        </Link>
        <Link to="details">
          <button className="job_btns">Resume</button>
        </Link>
      </div>
    </div>
  );
};
const MyApplicant = () => {
  let [applications, setApplication] = useState([]);
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
        applications = response.data.filter(
          (application) => application.jobId === localStorage.getItem("job_id")
        );
        setApplication(applications);
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

export default MyApplicant;
