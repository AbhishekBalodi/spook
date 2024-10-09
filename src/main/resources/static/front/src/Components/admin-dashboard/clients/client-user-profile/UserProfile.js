import React, { useState, useEffect } from 'react';
import AccessTypeList from './admin-client-list-script.js';

import "./userProfile.css";

const UserProfile = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data (replace with actual API call)
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    // Replace this with your data fetching logic
    const fetchedUsers = [
      {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        mobile: '1234567890',
        lastLogin: '2023-01-01',
        status: true,
      },
      {
        fullName: 'Jane Smith',
        email: 'jane.smith@example.com',
        mobile: '0987654321',
        lastLogin: '2023-01-05',
        status: false,
      },
    ];
    setUsers(fetchedUsers);
  };

  const handleAddUser = () => {
    // Logic to add a new user
    console.log('Add New User clicked');
  };

  const toggleStatus = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].status = !updatedUsers[index].status;
    setUsers(updatedUsers);
  };

  return (
    <div className="container">
      <div className="header-row">
        <h2>User Profile</h2>
        <button className="add-user-btn" onClick={handleAddUser}>+ Add New User</button>
      </div>

      <table id="userTable" className="display">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Last Login</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.lastLogin}</td>
              <td>
                <div className="status-switch">
                  <input
                    type="checkbox"
                    checked={user.status}
                    onChange={() => toggleStatus(index)}
                  />
                </div>
              </td>
              <td>
                <button className="action-btn">Edit</button> | <button className="action-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
