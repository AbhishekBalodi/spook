import React from 'react';



import "./company-profile.css";
import "./client-details-script";

const CompanyProfile = () => {
  const handleClientProfileClick = () => {
    // Logic to get client profile by ID
    console.log('Client Profile clicked');
  };

  const handleUserProfileClick = () => {
    // Logic to get user profile
    console.log('User Profile clicked');
  };

  const handleProjectClick = () => {
    // Logic to get client project
    console.log('Projects clicked');
  };

  const handleTaskClick = () => {
    // Logic to get client tasks
    console.log('Tasks clicked');
  };

  return (
    <div className="container1">
      {/* Sidebar */}
      <div className="sidebar">
        <ul className="menu">
          <li><a onClick={handleClientProfileClick}>Client Profile</a></li>
          <li><a onClick={handleUserProfileClick}>User Profile</a></li>
          <li><a onClick={handleProjectClick}>Projects</a></li>
          <li><a onClick={handleTaskClick}>Tasks</a></li>
          <li><a href="#">Invoices</a></li>
          <li><a href="#">Contracts</a></li>
          <li><a href="#">Credit Notes</a></li>
          <li><a href="#">Reminders</a></li>
          <li><a href="#">Files</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div id="companyClientDetailsPageRightDiv">
        {/* This is where dynamic content would be loaded */}
      </div>
    </div>
  );
};

export default CompanyProfile;
