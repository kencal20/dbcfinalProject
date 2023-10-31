import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanyHome() {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    companyData: "",
  });

  const logout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  const deleteCompany = () => {
    const companyId = companyData.companyData._id; // Assuming _id is the company's ID

    fetch(`http://localhost:5000/deleteCompany/${companyId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          // Company deleted successfully, perform logout or any other action
          logout();
        } else {
          // Handle error, e.g., display an error message
          console.error("Error deleting company:", data.error);
        }
      });
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("http://localhost:5000/companyData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setCompanyData({
            companyData: data.data,
          });
        }
      });
  }, [navigate]);

  return (
    <div>
      <div>
        <i
          className="fa-solid fa-user-pen"
          onClick={() => navigate("/updateCompany", { state: companyData })
          }
        ></i>
        {companyData.companyData.email}
        <p>Name</p>
        <h4>{companyData.companyData.fname}</h4>
      </div>
      <div>
        <p>Email</p>
        <h4>{companyData.companyData.email}</h4>
      </div>
      <br />
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
      <button className="btn btn-danger" onClick={deleteCompany}>
        Delete Company
      </button>
    </div>
  );
}
