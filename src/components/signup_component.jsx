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

    if (
      userType === "Company" &&
      secretKey !== "6eybj;l,;kp-=0-0-090979865e5322457t87{"
    ) {
      setAlertMessage("Invalid Company. Please enter the correct Secret Key.");
      setSuccessMessage("");

      setIsAccountCreated(false);
      return;
    }

    if (formData.password !== confirmPassword) {
      setAlertMessage("Password and Confirm Password do not match.");
      setSuccessMessage("");

      setIsAccountCreated(false);
      return;
    }

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
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setSuccessMessage("Account created successfully");
        setAlertMessage("");
        setIsAccountCreated(true);
      })
      .catch((error) => {
        setIsAccountCreated(false);
        console.error(error); // Log the error to the console for debugging

    
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
          margin: "0px",
        },
      }}
    >
      <div>
        <form onSubmit={handleSubmit}>
          {isAccountCreated && (
            <p
              className="success-message alert alert-success"
              style={{ color: "green" }}
            >
              {successMessage}
              <b
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setSuccessMessage("")}
                style={{ marginLeft: "300px" }}
              >
                <span aria-hidden="true">X</span>
              </b>
            </p>
          )}
          <br />

          {alertMessage && (
            <div className="alert alert-danger" role="alert">
              {alertMessage}

              <b
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlertMessage("")}
                style={{ marginLeft: "200px" }}
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

            {userType === "Company" ? (
              <div className="mb-3">
                <input
                  className="form-control larger_input"
                  type="password"
                  placeholder="Secret Key"
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                />
              </div>
            ) : null}

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
