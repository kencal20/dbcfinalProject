import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "./updateCompany.css";

export default function UpdateCompany() {
  const location = useLocation();
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.companyData) {
      const { fname, lname } = location.state.companyData;
      setFname(fname || "");
      setLname(lname || "");
    }
  }, [location]);

  const updateData = () => {
    fetch("http://localhost:5000/updateCompany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: location.state.companyData._id,
        fname,
        lname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setUpdateSuccess(true);
          navigate("/companyHome");
        }
      });
  };

  return (
    <div className="update_form">
      <h2 className="header">Update Company Data</h2>
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
          value={location.state.companyData.email}
          disabled
        />
        <button onClick={updateData} className="btn btn-success">
          Submit
        </button>
      </div>
      {updateSuccess && (
        <div className="alert alert-success" role="alert">
          Update successful! Company data has been updated.
        </div>
      )}
    </div>
  );
}


