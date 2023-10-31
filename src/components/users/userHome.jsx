import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userData: "",
  });

  const logout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  // Function to delete the user
  const deleteUser = () => {
    const userId = userData.userData._id; // Assuming _id is the user's ID

    fetch(`http://localhost:5000/deleteUser/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          // User deleted successfully, perform logout or any other action
          logout();
        } else {
          // Handle error, e.g., display an error message
          console.error("Error deleting user:", data.error);
        }
      });
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("http://localhost:5000/userData", {
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
          setUserData({
            userData: data.data,
          });
        }
      });
  }, [navigate]);

  return (
    <div>
      <div>
        <i
          className="fa-solid fa-user-pen"
          onClick={() => navigate("/updateUser", { state: userData })}
        ></i>
        {userData.userData.fname} {userData.userData.lname}
        <p>Name</p>
        <h4>{userData.userData.fname}</h4>
      </div>
      <div>
        <p>Email</p>
        <h4>{userData.userData.email}</h4>
      </div>
      <br />
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
      <button className="btn btn-danger" onClick={deleteUser}>
        Delete My Account
      </button>
    </div>
  );
}
