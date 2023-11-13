import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./signup.css";

export default function SignupComponent({ visible, closeModal, register }) {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
    companyName: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        secretKey: userType === "Company" ? secretKey : undefined,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create account. Please try again later.");
        }
        return res.json();
      })
      .then((data) => {
        setAlertMessage("");
        setSuccessMessage("Account created successfully");
        setIsAccountCreated(true);
      })
      .catch((error) => {
        setIsAccountCreated(false);

        if (!navigator.onLine) {
          setAlertMessage(
            "Network error. Please check your internet connection."
          );
        } else if (error.message.includes("email")) {
          setAlertMessage(
            "User with this email already exists. Please use another email."
          );
        } else {
          setAlertMessage("Failed to create account. Please try again later.");
        }

        console.error(error);
      });

    if (
      userType === "Company" &&
      secretKey !== "6eybj;l,;kp-=0-0-090979865e5322457t87{"
    ) {
      setAlertMessage("Invalid Company. Please enter the correct Secret Key.");
      setIsAccountCreated(false);
      return;
    }

    if (formData.password !== confirmPassword) {
      setAlertMessage("Password and Confirm Password do not match.");
      setIsAccountCreated(false);
      return;
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
          top: "50%",
          left: "50%",
          right: "50%",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
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
                style={{ marginLeft: "700px" }}
              >
                <span aria-hidden="true">X</span>
              </b>
            </p>
          )}
          {alertMessage && (
            <div className="alert alert-danger" role="alert">
              {alertMessage}
              <b
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlertMessage("")}
                style={{ marginLeft: "470px" }}
              >
                <span aria-hidden="true">X</span>
              </b>
            </div>
          )}
          <h1 className="heading">Signup</h1>
          <div className="larger_inputContainer">
            <div>
              Register AS
              <br />
              <input
                type="radio"
                name="Usertype"
                value="user"
                onChange={(e) => setUserType(e.target.value)}
              />
              User
              <br />
              <input
                type="radio"
                name="Usertype"
                value="Company"
                onChange={(e) => setUserType(e.target.value)}
              />
              Company
            </div>
            {userType === "Company" && (
              <div className="mb-3">
                <input
                  className="form-control larger_input"
                  type="password"
                  placeholder="Secret Key"
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-3">
              <input
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
              <input
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
              <input
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
              <input
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
              <input
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
}
