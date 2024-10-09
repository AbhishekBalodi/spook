import React, { useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import './addClient.css';
import './client-details-script';

const AddClient = () => {
  const [clientDetails, setClientDetails] = useState({
    clientName: '',
    contactPerson: '',
    designation: '',
    email: '',
    mobile: '',
    website: '',
    includeGst: 'true',
    gst: '',
    address: '',
    state: '',
    city: '',
    zipCode: '',
    country: '',
    currency: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic for submitting the client details
    setSuccessMessage('Client details updated successfully!');
  };

  const closePopup = () => {
    setSuccessMessage('');
  };

  return (
    <div className="client-details-container">
      <h4>Client Profile</h4><br />
      <form className="client-profile-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="clientName">Company Name <span className="required">*</span></label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              placeholder="Company Name"
              value={clientDetails.clientName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactPerson">Contact Person <span className="required">*</span></label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              placeholder="Contact Person Name"
              value={clientDetails.contactPerson}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* More form groups for other fields */}
        {/* Example for address */}
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="address">Address <span className="required">*</span></label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Complete Address"
              value={clientDetails.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="save-btn">Update</button>
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

export default AddClient;
