import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AccessTypeList from './Components/admin-dashboard/access-type/AccessTypeList';
import AddAccessType from './Components/admin-dashboard/access-type/AddAccessType';

// Client Management Components
import AddClient from './Components/admin-dashboard/clients/AddClient';
import ClientList from './Components/admin-dashboard/clients/ClientList';

// Project Management Components
import AddProject from './Components/admin-dashboard/clients/client-project/AddProject';
import ProjectsDashboard from './Components/admin-dashboard/clients/client-project/ProjectsDashboard';

// Task Management Components
import AddTask from './Components/admin-dashboard/clients/client-task/AddTask';
import TaskDashboard from './Components/admin-dashboard/clients/client-task/TaskDashboard';


import Login from './Components/login/Login';

function App() {
  return (
	<Router>
	      <div className="App">
	        <Routes>
			
	          <Route path="/access-type-list" element={<AccessTypeList />} />
	          <Route path="/add-access-type" element={<AddAccessType/>} />

	          {/* Client Management Routes */}
	          <Route path="/add-client" element={<AddClient />} />
	          <Route path="/client-list" element={<ClientList />} />

	          {/* Project Management Routes */}
	          <Route path="/add-project" element={<AddProject />} />
	          <Route path="/projects-dashboard" element={<ProjectsDashboard />} />

	          {/* Task Management Routes */}
	          <Route path="/add-task" element={<AddTask />} />
	          <Route path="/task-dashboard" element={<TaskDashboard />} />

	          {/* Login Route */}
			  <Route path="/" element={<Login />} />

	          <Route path="/login" element={<Login />} />
	        </Routes>
	      </div>
	    </Router>
  );
}

export default App;
