import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./login.css";

export default function LoginComponent(props) {
  const { visible, closeModal } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          window.localStorage.setItem("token", data.data);

          if (formData.userType === "user") {
            navigate("/userHome");
          } else if (formData.userType === "company") {
            navigate("/companyHome");
          }
          closeModal(); // Close the modal on successful login
        } else if (data.error === "Invalid Password") {
          setError("Invalid Password");
          setFormData({
            ...formData,
            password: "", // Clear the password field
          });
        } else {
          setError("Login Unsuccessful");
          setFormData({
            ...formData,
            password: "", // Clear the password field
          });
        }
      })
      .catch((error) => {
        setError("Network error. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setIsModalOpen(visible);
  }, [visible]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
          top: "50%",
          left: "50%",
          right: "50%",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <b
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setError("")}
            style={{ marginLeft: "580px" }}
          >
            <span aria-hidden="true">X</span>
          </b>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h1 className="heading">Login</h1>
        <div className="large_inputContainer">
          <div className="mb-3">
            <input
              type="email"
              className="form-control large_input"
              placeholder="Email"
              id="exampleInputEmail1"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control large_input"
              placeholder="Password"
              id="exampleInputPassword1"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Login as: </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
            >
              <option value="user">User</option>
              <option value="company">Company</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary large_button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Submit"}
        </button>
        <br />
      </form>
    </Modal>
  );
}
