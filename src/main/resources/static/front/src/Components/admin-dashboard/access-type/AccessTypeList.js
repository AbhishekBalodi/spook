import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import the CSS file
import './access-type-list.css';
import './admin-access-type-list-script';

import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const AccessTypeList = () => {
	const [data, setData] = useState([]);
	  const [error, setError] = useState(null);

	  // Function to handle adding access type (this could be opening a modal)
	      const openAddAccessType = () => {
	          // Your logic here, e.g., setting state to open a modal
	          console.log("Add Access Type button clicked");
	      };

	  useEffect(() => {
	    // Fetch data from the server
	    axios.get('/companyAccessTypeData')
	      .then(response => {
	        setData(response.data.data); // Assuming data is within 'data' key
	      })
	      .catch(err => {
	        setError('Error fetching data');
	      });
	  }, []);

  const getAccessTypeTable = () => {
      // Render a table using the data fetched
      if (data.length === 0) {
        return <div>No data available</div>;
      }
  return (
    <div className="access-type-container">
      <div className="search-container">
        <button className="new-access-btn" onClick={openAddAccessType}>
          + New Access Type
        </button>
      </div>
      <table id="accessTable" className="display" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Access Name</th>
            <th>No. Users</th>
            <th>Users Name</th>
            <th>Action</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}};

export default AccessTypeList;