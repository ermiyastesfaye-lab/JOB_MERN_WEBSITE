import React, { useRef } from "react";
import { useState } from "react";
import "./contact.css";
import emailjs from "@emailjs/browser";
import NavBar from "../../components/navBar/NavBar";

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    service: "",
    message: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = {};
    if (!formData.firstName.trim()) {
      validationError.firstName = "first name required";
    }
    if (!formData.lastName.trim()) {
      validationError.lastName = "last name required";
    }
    if (!formData.email.trim()) {
      validationError.email = "email required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationError.email = "email is invalid";
    }
    if (!formData.phoneNumber.trim()) {
      validationError.phoneNumber = "phone number required";
    }

    if (!formData.message.trim()) {
      validationError.message = "message required";
    }
    setError(validationError);

    if (Object.keys(validationError).length == 0) {
      emailjs
        .sendForm("service_lhj11en", "template_mhgbtyh", form.current, {
          publicKey: "mu1s0LjVC1d07DBBY",
        })
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
      alert("Form Submitted Successfully");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        service: "Select a service",
        message: "",
      });
    }
  };

  return (
    <div>
      <NavBar />
      <article id="contact">
        <div className="contact">
          <div className="your-info">
            <h2 className="contact-heading">Contact Us</h2>
            <form className="contact-form" ref={form} onSubmit={handleSubmit}>
              <div className="personal-info">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <p className="error">{error.firstName && error.firstName}</p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <p className="error">{error.lastName && error.lastName}</p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <p className="error">{error.email && error.email}</p>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <p className="error">
                    {error.phoneNumber && error.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="business-info">
                <div>
                  <textarea
                    className="contact-msg"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write Message"
                  ></textarea>
                  <p className="error">{error.message && error.message}</p>
                </div>
              </div>
              <div className="contact-btn">
                <button type="submit">Send message</button>
              </div>
            </form>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Contact;
