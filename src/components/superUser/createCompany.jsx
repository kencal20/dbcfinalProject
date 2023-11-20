import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Input from "../elements/input"
export default function CreateNewCompany({ visible, closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name) {
      errors.name = "Company Name is required";
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
      const companyData = {
        fname: formData.name,
        email: formData.email,
        password: formData.password,
        userType: "Company",
      };

      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      })
        .then((response) => {
          if (response.status === 201) {
            setSuccessMessage("Company created successfully");
            setErrorMessage("");
            setFormData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            });

            setTimeout(() => {
              setSuccessMessage("");
              closeModal();
            }, 2000);
          } else {
            setErrorMessage("Error creating Company");
            setSuccessMessage("");
            console.error("Error creating Company");
          }
        })
        .catch((error) => {
          setErrorMessage("Network error");
          setSuccessMessage("");
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
          <Input
          id="largeInput"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Company Name"
            onChange={handleChange}
          />
          {formErrors.name && (
            <p className="error-message">{formErrors.name}</p>
          )}
        </div>
        <div>
          <Input
          id="largeInput"
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
          <Input
          id="largeInput"
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
          <Input
          id="largeInput"
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
          Create Company
        </button>
      </form>
    </Modal>
  );
}
