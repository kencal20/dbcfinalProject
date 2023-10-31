import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";

export default function SignupComponent() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType === "Company" && secretKey !== "6eybj;l,;kp-=0-0-090979865e5322457t87{") {
      alert("Invalid Company. Please enter the correct Secret Key.");
      return;
    }

    if (formData.password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
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
        setIsAccountCreated(true);
        setAlertMessage("Account Creation Successful");
        
      })
      .catch((error) => {
        setIsAccountCreated(false);
        setAlertMessage("Account Creation failure");
      });
  };

  return (
    <div>
      <form className="signup_form" onSubmit={handleSubmit}>
        <h1 className="heading">Signup</h1>
        {isAccountCreated && (
          <div className="alert alert-success" role="alert">
            {alertMessage}
          </div>
        )}
        <div className="larger_inputContainer">
        <div>
          Register AS
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
        <div className="own_account">
          <Link to="/login">Already have an account? Log in</Link>
        </div>
      </form>
    </div>
  );
}
