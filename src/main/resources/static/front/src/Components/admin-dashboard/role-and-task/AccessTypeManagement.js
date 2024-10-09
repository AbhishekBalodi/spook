import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import "../../../public/assets/css/access-type-management.css";
import AccessTypeList from '../../../public/assets/js/add-role-and-task-script.js';
import axios from 'axios'; // Import Axios
const AccessTypeManagement = () => {
  const [roles, setRoles] = useState([]);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  useEffect(() => {
      axios.get('/your-api-endpoint')
          .then(response => {
              // Assuming the response.data contains the array of roles
              const fetchedRoles = response.data;
              setRoles(fetchedRoles); // Update the roles state
          })
          .catch(error => {
              console.error('There was an error fetching the roles!', error);
          });
  }, []); // This effect will only run on mount

 

  const handleDelete = (roleId) => {
    setSelectedRoleId(roleId);
    setDeletePopup(true);
  };

  const confirmDelete = () => {
    // Handle role deletion here
    setRoles(roles.filter((role) => role.id !== selectedRoleId));
    setDeletePopup(false);
  };

  return (
    <div className="role-and-task-container">
      <div className="search-container">
        <button className="new-role-and-task" onClick={() => alert('Add new role')}>
          + New Role
        </button>
      </div>
      <table id="roleAndTaskTable" className="display" style={{ width: '100%' }}></table>

      {deletePopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setDeletePopup(false)}>&times;</span>
            <p id="deleteConfirmationMessage">Are you sure?</p>
            <button className="ok-btn" onClick={confirmDelete}>Yes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessTypeManagement;
