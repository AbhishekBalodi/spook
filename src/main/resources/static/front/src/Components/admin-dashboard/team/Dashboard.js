import React from 'react';
import { Link } from 'react-router-dom';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'select2/dist/js/select2.min.js';
import 'select2/dist/css/select2.min.css';



class Dashboard extends React.Component {
  componentDidMount() {
    // DataTable initialization
    $('#roleAndTaskTable').DataTable();
  }

  handleClientList = () => {
    // Add logic to get the client list
  };

  handleProjectList = () => {
    // Add logic to get the project list
  };

  handleTeamList = () => {
    // Add logic to get the team list
  };

  handleTaskList = () => {
    // Add logic to get the task list
  };

  handleAccessTypeList = () => {
    // Add logic to get the access type list
  };

  handleRoleAndTaskList = () => {
    // Add logic to get the roles and tasks list
  };

  handleLogout = () => {
    // Add logout logic here
  };

  render() {
    const permissionsList = ['companyClientView', 'companyProjectView', 'companyTeamView', 'companyTaskView']; // Mocked permissions

    return (
      <div className="body-wrapper">
        {/* Sidebar */}
        <aside className="mdc-drawer mdc-drawer--dismissible mdc-drawer--open">
          <div className="mdc-drawer__header">
            <Link to="/companyDashboard" className="brand-logo">
              <img src="../assets/images/logo.svg" alt="logo" />
            </Link>
          </div>
          <div className="mdc-drawer__content">
            <div className="user-info">
              <p className="name">Menu</p>
            </div>
            <nav className="mdc-list mdc-drawer-menu">
              <div className="mdc-list-item mdc-drawer-item">
                <Link className="mdc-drawer-link" to="/companyDashboard">
                  <i className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon">home</i>
                  Dashboard
                </Link>
              </div>

              {permissionsList.includes('companyClientView') && (
                <div className="mdc-list-item mdc-drawer-item">
                  <button className="mdc-drawer-link" onClick={this.handleClientList}>
                    <i className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon">grid_on</i>
                    Clients
                  </button>
                </div>
              )}

              {permissionsList.includes('companyProjectView') && (
                <div className="mdc-list-item mdc-drawer-item">
                  <button className="mdc-drawer-link" onClick={this.handleProjectList}>
                    <i className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon">track_changes</i>
                    Projects
                  </button>
                </div>
              )}

              {permissionsList.includes('companyTeamView') && (
                <div className="mdc-list-item mdc-drawer-item">
                  <button className="mdc-drawer-link" onClick={this.handleTeamList}>
                    <i className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon">grid_on</i>
                    Team
                  </button>
                </div>
              )}

              {permissionsList.includes('companyTaskView') && (
                <div className="mdc-list-item mdc-drawer-item">
                  <button className="mdc-drawer-link" onClick={this.handleTaskList}>
                    <i className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon">grid_on</i>
                    Task
                  </button>
                </div>
              )}

              <div className="mdc-list-item mdc-drawer-item">
                <button className="mdc-drawer-link" onClick={this.handleRoleAndTaskList}>
                  <i className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon">pie_chart_outlined</i>
                  Roles & Task
                </button>
              </div>
            </nav>

            <div className="profile-actions">
              <button>Settings</button>
              <span className="divider"></span>
              <button onClick={this.handleLogout}>Logout</button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="main-wrapper mdc-drawer-app-content">
          <header className="mdc-top-app-bar">
            <div className="mdc-top-app-bar__row">
              <div className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                <button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
                <span className="mdc-top-app-bar__title">Greetings User!</span>
              </div>
            </div>
          </header>
          <div id="adminDashboardRightPanal">
            {/* Include the overview page here */}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
