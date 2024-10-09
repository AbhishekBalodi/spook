import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import DataTable from 'datatables.net';
import AccessTypeList from '../../../public/assets/js/material.js';
import AccessTypeList from '../../../public/assets/js/misc.js';
import AccessTypeList from '../../../public/assets/js/dashboard.js';
import AccessTypeList from '../../../public/assets/js/admin-dashboard.js';
import AccessTypeList from '../../../public/assets/js/session-expire.js';
import AccessTypeList from '../../../public/assets/vendors/js/vendor.bundle.base.js';
import AccessTypeList from '../../../public/assets/vendors/chartjs/Chart.min.js';
import AccessTypeList from '../../../public/assets/vendors/jvectormap/jquery-jvectormap.min.js';
import AccessTypeList from '../../../public/assets/vendors/jvectormap/jquery-jvectormap-world-mill-en.js';

const ClientDashboard = () => {
  const [permissionsList, setPermissionsList] = useState([]);

  useEffect(() => {
    // Fetch permissions list from session or API
    // Example: setPermissionsList(response.permissionsList);
    setPermissionsList(['companyClientView', 'companyProjectView', 'companyTaskView']); // Example permissions
  }, []);

  return (
    <div className="body-wrapper">
      {/* Sidebar */}
      <aside className="mdc-drawer mdc-drawer--dismissible mdc-drawer--open">
        <div className="mdc-drawer__header">
          <Link to="/companyClientDashboard" className="brand-logo">
            <img src="../assets/images/logo.svg" alt="logo" />
          </Link>
        </div>
        <div className="mdc-drawer__content">
          <div className="user-info">
            <p className="name">Menu</p>
          </div>
          <div className="mdc-list-group">
            <nav className="mdc-list mdc-drawer-menu">
              <div className="mdc-list-item mdc-drawer-item">
                <Link className="mdc-drawer-link" to="/companyDashboard">
                  <i className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon">home</i>
                  Dashboard
                </Link>
              </div>
              {permissionsList.includes('companyClientView') && (
                <div className="mdc-list-item mdc-drawer-item">
                  <button className="mdc-drawer-link" onClick={() => alert('Clients')}>
                    <i className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon">grid_on</i>
                    Clients
                  </button>
                </div>
              )}
              {permissionsList.includes('companyProjectView') && (
                <div className="mdc-list-item mdc-drawer-item">
                  <button className="mdc-drawer-link" onClick={() => alert('Projects')}>
                    <i className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon">track_changes</i>
                    Projects
                  </button>
                </div>
              )}
              {/* Add other permission-based links here */}
            </nav>
          </div>
          <div className="profile-actions">
            <Link to="/settings">Settings</Link>
            <span className="divider"></span>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper mdc-drawer-app-content">
        <header className="mdc-top-app-bar">
          <div className="mdc-top-app-bar__row">
            <div className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <button className="material-icons mdc-top-app-bar__navigation-icon sidebar-toggler">menu</button>
              <span className="mdc-top-app-bar__title">Greetings User!</span>
              <div className="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon search-text-field d-none d-md-flex">
                <i className="material-icons mdc-text-field__icon">search</i>
                <input className="mdc-text-field__input" id="text-field-hero-input" />
                <div className="mdc-notched-outline">
                  <div className="mdc-notched-outline__leading"></div>
                  <div className="mdc-notched-outline__notch">
                    <label htmlFor="text-field-hero-input" className="mdc-floating-label">Search..</label>
                  </div>
                  <div className="mdc-notched-outline__trailing"></div>
                </div>
              </div>
            </div>
            {/* Notification & Profile */}
            <div className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
              <button className="material-icons mdc-menu-button">notifications</button>
              <button className="material-icons mdc-menu-button">account_circle</button>
            </div>
          </div>
        </header>

        {/* Dashboard Overview */}
        <div id="adminDashboardRightPanal">
          {/* Placeholder for included page */}
          <h2>Client Overview</h2>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
