import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./signup.css";
import Input from "./elements/input";

const SignupComponent = ({ visible, closeModal }) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [userType, setUserType] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setIsModalOpen(visible);
  }, [visible]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        password: formData.password,
        userType,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Failed to create an account. Please try again later."
          );
        }
        return res.json();
      })
      .then((data) => {
        const errors = [];

        if (formData.password !== confirmPassword) {
          errors.push("Password and Confirm Password do not match.");
        }

        if (!navigator.onLine) {
          errors.push("Network error. Please check your internet connection.");
        } else if (data.error) {
          // Check specifically for the email error
          if (data.error.includes("email") || data.error.includes("exist")) {
            errors.push("User with this email already exists.");
          } else {
            errors.push(data.error);
          }
        }

        if (errors.length > 0) {
          setErrorMessages(errors);
          setIsAccountCreated(false);
        } else {
          setSuccessMessage("Account created successfully");
          setIsAccountCreated(true);
        }
      })
      .catch((error) => {
        setIsAccountCreated(false);
        setErrorMessages([]);
        console.error(error);
      });
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
          right: isModalOpen ? 0 : "-600px"
        },
      }}
    >
      <div>
        <form onSubmit={handleSubmit}>
          {successMessage && (
            <p className="success-message alert alert-success">
              {successMessage}
              <b
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setSuccessMessage("")}
                style={{ marginLeft: "600px" }}
              >
                <span aria-hidden="true">X</span>
              </b>
            </p>
          )}
          {errorMessages.length > 0 && (
            <div className="alert alert-danger" role="alert">
              <ul>
                {errorMessages.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
              <b
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setErrorMessages([])}
                style={{ marginLeft: "430px" }}
              >
                <span aria-hidden="true">X</span>
              </b>
            </div>
          )}

          <div className="larger_inputContainer">
            <div>
              <h1>Register As</h1>
              <input
                type="radio"
                name="Usertype"
                value="user"
                onChange={(e) => setUserType(e.target.value)}
              />
              User
              <input
                type="radio"
                name="Usertype"
                value="Company"
                onChange={(e) => setUserType(e.target.value)}
              />
              Company
            </div>
            <div className="mb-3">
              <Input
                id="largeInput"
                className="form-control larger_input"
                type="text"
                placeholder="First Name"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <Input
                id="largeInput"
                className="form-control larger_input"
                type="text"
                placeholder="Last Name"
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <Input
                id="largeInput"
                className="form-control larger_input"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <Input
                id="largeInput"
                className="form-control larger_input"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <Input
                id="largeInput"
                className="form-control larger_input"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary button">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default SignupComponent;
