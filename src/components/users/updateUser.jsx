import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./updateUser.css";

export default function UpdateUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.userData) {
      const { fname, lname } = location.state.userData;
      setFname(fname || "");
      setLname(lname || "");
    }
  }, [location]);

  const updateData = () => {
    console.log(location);
    fetch("http://localhost:5000/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        id: location.state.userData._id,
        fname,
        lname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setUpdateSuccess(true);
          navigate("/userHome");
        }
      });
  };

  return (
    <div className="update_form">
      <h2 className="header">Update Account</h2>
      <div className="larger_inputContainer">
        <input
          className="larger_input"
          type="text"
          placeholder="First Name"
          name="fname"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          required
        />
        <input
          className="larger_input"
          type="text"
          placeholder="Last Name"
          name="lname"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          required
        />
        <input
          className="larger_input"
          type="text"
          placeholder="Email"
          name="email"
          value={location.state.userData.email}
          disabled
        />
     
        <br />
        <br />
        <button onClick={updateData} className="btn btn-success">
          Submit
        </button>
      </div>
      {updateSuccess && (
        <div className="alert alert-success" role="alert">
          Update successful! Your credentials have been updated.
        </div>
      )}
    </div>
  );
}
