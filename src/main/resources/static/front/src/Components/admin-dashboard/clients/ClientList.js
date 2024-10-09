import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import "./clientList.css";

import $ from 'jquery';
import 'datatables.net';
import axios from 'axios';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [totalClients, setTotalClients] = useState(0);
    const [activeClients, setActiveClients] = useState(0);
    const [inactiveClients, setInactiveClients] = useState(0);
    const [showDeactivatePopup, setShowDeactivatePopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    // Fetch clients using Axios inside this function
    const fetchClients = () => {
        axios.get('/api/clients')  // Ensure this endpoint exists on your backend
            .then(response => {
                const fetchedClients = response.data;
                setClients(fetchedClients);
                setTotalClients(fetchedClients.length);
                setActiveClients(fetchedClients.filter(client => client.status === 'Active').length);
                setInactiveClients(fetchedClients.filter(client => client.status === 'Inactive').length);

                // Initialize DataTable after data is fetched
                $('#client-table').DataTable();
            })
            .catch(error => {
                console.error('There was an error fetching the clients!', error);
            });
    };

    useEffect(() => {
        fetchClients();  // Call fetchClients function when component loads
    }, []);

  const openAddClientPage = () => {
    // Logic for opening Add Client Page
    console.log('Add Client button clicked');
  };

  const toggleDeactivatePopup = () => setShowDeactivatePopup(!showDeactivatePopup);
  const toggleDeletePopup = () => setShowDeletePopup(!showDeletePopup);

  return (
    <div className="container">
      <div className="stats">
        <div className="stat-item">
          <h2>{totalClients}</h2>
          <p>Total Clients</p>
        </div>
        <div className="stat-item">
          <h2 style={{ color: 'green' }}>{activeClients}</h2>
          <p>Active Clients</p>
        </div>
        <div className="stat-item">
          <h2 style={{ color: 'red' }}>{inactiveClients}</h2>
          <p>Inactive Clients</p>
        </div>
        <div className="search-add">
          <button className="add-client-btn" onClick={openAddClientPage}>+ Add New Client</button>
        </div>
      </div>

      <table id="client-table" className="display">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Company Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client.id}>
              <td>{index + 1}</td>
              <td>{client.name}</td>
              <td>{client.contact}</td>
              <td>{client.email}</td>
              <td>{client.mobile}</td>
              <td>{client.status}</td>
              <td>
                <button onClick={toggleDeactivatePopup}>Deactivate</button>
                <button onClick={toggleDeletePopup}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Deactivate Confirmation Popup */}
      {showDeactivatePopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={toggleDeactivatePopup}>&times;</span>
            <p>Are you sure you want to deactivate this client?</p>
            <button className="ok-btn" onClick={() => console.log('Client Deactivated')}>Yes</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={toggleDeletePopup}>&times;</span>
            <p>Are you sure you want to delete this client?</p>
            <button className="ok-btn" onClick={() => console.log('Client Deleted')}>Yes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;
