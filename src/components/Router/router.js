import React from 'react'
import { Route, Routes } from "react-router-dom";
import LoginComponent from '../login_component';
import SignupComponent from '../signup_component';
// import UserDetails from '../users/userDetails';
import CompanyHome from '../company/companyHome';
import UpdateUser from '../users/updateUser';
import UpdateCompany from '../company/updateCompany';
import UserHome from '../users/userHome';
import SuperUserData from '../superUser/superUserHome';
import SuperUserLogin from '../superUser/superUserLogin'
import NotFound from '../notFound';
// import Users from '../users';
export default function Router() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginComponent />} />
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/register' element={<SignupComponent />} />
        {/* <Route path='/userDetails' element={<UserDetails />} /> */}
        <Route path='/companyHome' element={<CompanyHome />} />
        <Route path='/updateUser' element={<UpdateUser />} />
        <Route path='/updateCompany' element={<UpdateCompany />} />
        <Route path='/userHome' element={<UserHome />} />
        <Route path='/superUser' element={<SuperUserData/>}/>
        <Route path='/superUser/login' element={<SuperUserLogin/>}/>
          <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}


