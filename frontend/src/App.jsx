import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Signup from "./pages/signUp/Signup";
import Login from "./pages/logIn/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import JobListing from "./pages/jobListings/JobListing";
import Contact from "./pages/contactUs/Contact";
import MyProfile from "./pages/myProfile/MyProfile";
import PostJob from "./pages/postJob/PostJob";
import JobApplication from "./pages/jobApplication/JobApplication";
import Apply from "./pages/apply/Apply";
import EditProfile from "./components/editProfile/EditProfile";
import JobDetails from "./components/jobDetails/JobDetails";
import ApplicationDetails from "./components/applicationDetails/ApplicationDetails";
import MyPost from "./pages/myPost/MyPost";
import MyApplicant from "./pages/myApplicant/MyApplicant";
import EditPost from "./pages/editPost/EditPost";
import EditApplication from "./pages/editApplication/EditApplication";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/joblisting" element={<JobListing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/postjob" element={<PostJob />} />
      <Route path="/jobapplication" element={<JobApplication />} />
      <Route path="/joblisting/apply" element={<Apply />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/joblisting/details" element={<JobDetails />} />
      <Route path="/jobapplication/details" element={<ApplicationDetails />} />
      <Route path="/mypost" element={<MyPost />} />
      <Route path="/myapplicant" element={<MyApplicant />} />
      <Route path="/mypost/edit" element={<EditPost />} />
      <Route path="/jobapplication/edit" element={<EditApplication />} />
    </Routes>
  );
}

export default App;
