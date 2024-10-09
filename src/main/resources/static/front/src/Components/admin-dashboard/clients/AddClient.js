import React, { useState } from 'react';
import './add-clientt.css';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
const AddClient = () => {
  const [clientDetails, setClientDetails] = useState({
    clientName: '',
    contactPerson: '',
    designation: '',
    email: '',
    mobile: '',
    website: '',
    includeGst: false,
    gst: '',
    address: '',
    state: '',
    city: '',
    zipCode: '',
    country: '',
    currency: '',
  });
  
  const [errors, setErrors] = useState({
    emailError: '',
    mobileError: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic
    console.log('Form Submitted:', clientDetails);
  };

  return (
    <div className="client-list-btn-container">
      <button className="client-list-btn" onClick={() => console.log('Client List clicked')}>Client List</button>

      <div className="container">
        <h4>{clientDetails.clientId > 0 ? 'Update Client' : 'Add Client'}</h4>
        <form className="client-profile-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="clientName">Company Name *</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={clientDetails.clientName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactPerson">Contact Person *</label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={clientDetails.contactPerson}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="designation">Designation *</label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={clientDetails.designation}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={clientDetails.email}
                onChange={handleInputChange}
                required
              />
              <span className="error">{errors.emailError}</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mobile">Mobile *</label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={clientDetails.mobile}
                onChange={handleInputChange}
                required
              />
              <span className="error">{errors.mobileError}</span>
            </div>
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={clientDetails.website}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Other form fields */}
          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={() => console.log('Cancel')}>Cancel</button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>

      {/* Success Popup */}
      <div id="successPopup" className="popup">
        <div className="popup-content">
          <span className="close" onClick={() => console.log('Close')}>×</span>
          <p id="successMessage">Client saved successfully!</p>
          <button className="ok-btn" onClick={() => console.log('OK')}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
