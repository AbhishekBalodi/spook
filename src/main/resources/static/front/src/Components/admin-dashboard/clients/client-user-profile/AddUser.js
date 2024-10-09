import React, { useState } from 'react';
import AccessTypeList from './admin-add-client-script.js';
import ".add-user.css";

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    email: '',
    mobile: '',
    password: '',
    primaryUser: false,
    noWelcomeEmail: false,
    setPasswordEmail: false,
    userPermissions: {
      projects: true,
      task: true,
      documents: true,
      invoices: true,
      files: true,
      emailProjects: true,
      emailTask: true,
      emailDocuments: true,
      emailInvoices: true,
      emailFiles: true,
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePermissionsChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      userPermissions: {
        ...prevData.userPermissions,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Logic to handle form submission here
  };

  return (
    <div className="container">
      <form id="addUserForm" onSubmit={handleSubmit}>
        <h2>Add New User</h2>

        <div className="row">
          <div className="column">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label htmlFor="designation">Designation *</label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label htmlFor="mobile">Mobile *</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <label>
            <input
              type="checkbox"
              name="primaryUser"
              checked={formData.primaryUser}
              onChange={handleInputChange}
            />
            Primary User
          </label>
          <label>
            <input
              type="checkbox"
              name="noWelcomeEmail"
              checked={formData.noWelcomeEmail}
              onChange={handleInputChange}
            />
            Do not send Welcome Email
          </label>
          <label>
            <input
              type="checkbox"
              name="setPasswordEmail"
              checked={formData.setPasswordEmail}
              onChange={handleInputChange}
            />
            Send Set Password Email
          </label>
        </div>

        <div className="row">
          <div className="column permissions">
            <h3>Permissions</h3>
            <label className="status-switch">
              <span>Projects</span>
              <input
                type="checkbox"
                name="projects"
                checked={formData.userPermissions.projects}
                onChange={handlePermissionsChange}
              />
            </label>
            <label className="status-switch">
              <span>Task</span>
              <input
                type="checkbox"
                name="task"
                checked={formData.userPermissions.task}
                onChange={handlePermissionsChange}
              />
            </label>
            {/* Add more permissions as needed */}
          </div>
          <div className="column email-notifications">
            <h3>Email Notifications</h3>
            <label className="status-switch">
              <span>Projects</span>
              <input
                type="checkbox"
                name="emailProjects"
                checked={formData.userPermissions.emailProjects}
                onChange={handlePermissionsChange}
              />
            </label>
            <label className="status-switch">
              <span>Task</span>
              <input
                type="checkbox"
                name="emailTask"
                checked={formData.userPermissions.emailTask}
                onChange={handlePermissionsChange}
              />
            </label>
            {/* Add more notifications as needed */}
          </div>
        </div>

        <div className="row-button">
          <button type="submit">Save</button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <div id="confirmationPopup1" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => console.log('Close Modal')}>&times;</span>
          <p id="successMessage">Team member added successfully!</p>
          <button onClick={() => console.log('Close Modal')}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;