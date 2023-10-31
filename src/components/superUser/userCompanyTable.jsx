// UserCompanyTable.js
import React from "react";

function UserCompanyTable({ data, deleteUser, deleteCompany, logout }) {
  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.data.users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>
                {user.fname} {user.lname}
              </td>
              <td>{user.email}</td>
              <td>{user.userType}</td>
              <td
                className="btn btn-danger"
                onClick={() => deleteUser(user._id, `${user.fname} ${user.lname}`)}
              >
                Delete
              </td>
            </tr>
          ))}
          {data.data.companies.map((company) => (
            <tr key={company._id}>
              <td>{company._id}</td>
              <td>
                {company.fname} {company.lname}
              </td>
              <td>{company.email}</td>
              <td>{company.userType}</td>
              <td
                className="btn btn-danger"
                onClick={() => deleteCompany(company._id, `${company.email}`)}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>TOTAL COMPANIES: {data.data.companies.length}</p>
      <p>TOTAL USERS: {data.data.users.length}</p>
      <p>
        TOTAL ACCOUNTS: {parseInt(data.data.users.length) + parseInt(data.data.companies.length)}
      </p>
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default UserCompanyTable;
