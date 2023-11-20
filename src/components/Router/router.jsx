import React from "react";
import { Route, Routes } from "react-router-dom";
import CompanyHome from "../company/companyHome";
import UpdateUser from "../users/updateUser";
import UpdateCompany from "../company/updateCompany";
import UserHome from "../users/userHome";
import SuperUserData from "../superUser/superUserHome";
import SuperUserLogin from "../superUser/superUserLogin";
import NotFound from "../pages/notfound";
import Homepage from "../pages/homepage";
import LoginComponent from "../login_component";

// import Users from '../users';
export default function Router() {
  return (
    <div>
  
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/companyHome" element={<CompanyHome />} />
        <Route path="/updateUser" element={<UpdateUser />} />
        <Route path="/updateCompany" element={<UpdateCompany />} />
        <Route path="/userHome" element={<UserHome />} />
        <Route path="/superUser" element={<SuperUserData />} />
        <Route path="/superUser/login" element={<SuperUserLogin />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
