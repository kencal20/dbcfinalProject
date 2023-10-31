import React, { useState, useEffect } from "react";
import Modal from "react-modal";

export default function CreateSuperUser({ visible, closeModal }) {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsModalOpen(visible);
  }, [visible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fname) {
      errors.fname = "First Name is required";
    }

    if (!formData.lname) {
      errors.lname = "Last Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Create an object with the form data
      const superUserData = {
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        password: formData.password,
        // Other data you want to include
      };

      // Send a POST request to your backend API
      fetch("http://localhost:5000/createSuperUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(superUserData),
      })
        .then((response) => {
          if (response.status === 201) {
            // SuperUser created successfully
            setSuccessMessage("SuperUser created successfully");
            setErrorMessage(""); // Clear any previous error messages
            console.log("SuperUser created successfully");

            // Optionally, clear the form fields or close the modal
            setFormData({
              fname: "",
              lname: "",
              email: "",
              password: "",
              confirmPassword: "",
            });

            // Close the modal after a delay (you can adjust the delay time)
            setTimeout(() => {
              setSuccessMessage("");
              closeModal();
            }, 2000);
          } else {
            // Handle errors here
            setErrorMessage("Error creating SuperUser");
            setSuccessMessage(""); // Clear any previous success messages
            console.error("Error creating SuperUser");
          }
        })
        .catch((error) => {
          // Handle network errors
          setErrorMessage("Network error");
          setSuccessMessage(""); // Clear any previous success messages
          console.error("Network error:", error);
        });
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "600px",
          height: "600px",
          transition: "right 0.3s ease",
          right: isModalOpen ? 0 : "-600px",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
      {successMessage && (
        <p className="success-message" style={{ color: "green" }}>
          {successMessage}
        </p>
      )}
        {errorMessage && (
        <p className="error-message" style={{ color: "red" }}>
          {errorMessage}
        </p>
      )}
        <div>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            placeholder="First Name"
            onChange={handleChange}
          />
          {formErrors.fname && (
            <p className="error-message">{formErrors.fname}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            placeholder="Last Name"
            onChange={handleChange}
          />
          {formErrors.lname && (
            <p className="error-message">{formErrors.lname}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
          />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm password"
            onChange={handleChange}
          />
          {formErrors.confirmPassword && (
            <p className="error-message">{formErrors.confirmPassword}</p>
          )}
        </div>
        <br />
        <button className="btn btn-success" type="submit">
          Create Super User
        </button>
      </form>
    </Modal>
  );
}
