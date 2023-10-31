import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuperUserPieChart from "./superUserPieChart";
import UserCompanyTable from "./userCompanyTable";
import CreateSuperUser from "./createSuperUser";
import "./superHome.css";
import CreateCompany from "./createCompany";

export default function SuperUserData() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [data01, setData01] = useState([]);
  const [superUserModalVisible, setSuperUserModalVisible] = useState(false);
  const [companyModalVisible, setCompanyModalVisible] = useState(false);

  const navigate = useNavigate();

  const fetchData = () => {
    const superUserAuthenticated = localStorage.getItem(
      "superUserAuthenticated"
    );

    if (!superUserAuthenticated) {
      navigate("/superUser/login");
      return;
    }

    fetch("http://localhost:5000/getAllData")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        setData01([
          { name: "Users", value: data.data.users.length },
          { name: "Companies", value: data.data.companies.length },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}`
    );
    if (confirmDelete) {
      fetch(`http://localhost:5000/deleteUser/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 200) {
            fetchData();
          } else {
            console.error("Error deleting user:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  const deleteCompany = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}`
    );
    if (confirmDelete) {
      fetch(`http://localhost:5000/deleteCompany/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 200) {
            fetchData();
          } else {
            console.error("Error deleting company:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error deleting company:", error);
        });
    }
  };
  const openSuperUserModal = () => {
    setSuperUserModalVisible(true);
  };

  const closeSuperUserModal = () => {
    setSuperUserModalVisible(false);
  };

  const openCompanyModal = () => {
    setCompanyModalVisible(true);
  };

  const closeCompanyModal = () => {
    setCompanyModalVisible(false);
  };


  const logout = () => {
    window.localStorage.clear();
    navigate("/superUser/login");
  };
  return (
    <div>
       
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
             <button className="btn btn-info" onClick={openSuperUserModal}>
        Create new SuperUser
      </button>
      <br />
      <CreateSuperUser visible={superUserModalVisible} closeModal={closeSuperUserModal} />

      <i className="fa-solid fa-circle-plus btn-primary" onClick={openCompanyModal}/>

      <CreateCompany visible={companyModalVisible} closeModal={closeCompanyModal} />


    
          <UserCompanyTable
            data={data}
            deleteUser={deleteUser}
            deleteCompany={deleteCompany}
            logout={logout}
          />
          <SuperUserPieChart data01={data01} />
        </div>
      )}
    </div>
  );
}
