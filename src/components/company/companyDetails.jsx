import React, { useState, useEffect } from "react";
import CompanyHome from "../company/companyHome";

export default function CompanyDetails() {
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

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
          setCompanyData(data.data);
        }
      });
  }, []);

  return (
    <div>
      <CompanyHome companyData={companyData} />
    </div>
  );
}
