import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function LoginComponent() {
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
        } else if (data.error === "Invalid Password") {
          setError("Invalid Password");
        } else {
          setError("Login Unsuccessful");
        }
      })
      .catch((error) => {
        setError("Network error. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="whole_page">
      <div className="random">
        <h4>Welcome To this Job portal page</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          culpa corporis fugiat iste praesentium esse doloremque quas cumque
        </p>
      </div>
      <form className="login_form" onSubmit={handleSubmit}>
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

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className="btn btn-primary large_button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Submit"}
        </button>
        <br />
        <div className="no_account">
          <Link to="/register">Don't have an account? Signup</Link>
        </div>
      </form>
    </div>
  );
}
