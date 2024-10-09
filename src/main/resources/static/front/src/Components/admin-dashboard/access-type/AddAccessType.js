import React, { useState } from 'react';
import './add-access-type.css'; // Assuming the CSS is in the same directory
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';



const AddAccessType = () => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({
    companyClientMaster: true,
    companyClientView: true,
    companyClientCreate: true,
    companyClientEdit: true,
    companyClientDelete: true,
    // Add other permissions here
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handlePermissionChange = (event) => {
    const { name, checked } = event.target;
    setPermissions({ ...permissions, [name]: checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulating form submission for simplicity
    setSuccessMessage('Access type has been successfully created!');
    // Handle form submission logic here
  };

  const closePopup = () => {
    setSuccessMessage('');
  };

  return (
    <div className="page-container">
      <div className="header">
        <h1>Add New Access Type</h1>
        <button className="access-list-btn" onClick={() => alert('Access List Clicked')}>Access List</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roleName">Access Name <span className="required">*</span></label>
          <input
            type="text"
            id="roleName"
            name="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
        </div>
        
        <div className="section">
          <h3>Clients</h3>
          <div className="grid-container">
            <div className="card">
              <div className="permissions">
                <label className="status-switch">
                  <span><h4>Client Profile</h4></span>
                  <input
                    type="checkbox"
                    id="companyClientMaster"
                    name="companyClientMaster"
                    checked={permissions.companyClientMaster}
                    onChange={handlePermissionChange}
                  />
                </label>
              </div>
              <p>Set appropriate permissions for this role</p>
              <div className="permissions">
                {['View', 'Create', 'Edit', 'Delete'].map((action) => (
                  <label key={action} className="status-switch">
                    <span>{action}</span>
                    <input
                      type="checkbox"
                      id={`companyClient${action}`}
                      name={`companyClient${action}`}
                      checked={permissions[`companyClient${action}`]}
                      onChange={handlePermissionChange}
                    />
                  </label>
                ))}
              </div>
            </div>
            {/* Repeat cards for other sections (Team, Projects, Tasks, etc.) */}
          </div>
        </div>

        <div className="buttons">
          <button type="button" className="cancel-btn" onClick={() => alert('Cancelled')}>Cancel</button>
          <button type="submit" className="save-btn">Save</button>
        </div>
      </form>

      {successMessage && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>&times;</span>
            <p>{successMessage}</p>
            <button className="ok-btn" onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAccessType;
