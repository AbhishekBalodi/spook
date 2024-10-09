import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import $ from 'jquery';
import './projectsDashboard.css';
import './client-user-project-script';

const ProjectsDashboard = () => {
  const [statusCounts, setStatusCounts] = useState({
    noStarted: 0,
    inProgress: 0,
    onHold: 0,
    cancelled: 0,
    completed: 0,
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch project data and update state
    fetchProjectsData();
  }, []);

  const fetchProjectsData = () => {
    // Replace this with your data fetching logic
    const fetchedProjects = [
      // Sample data (replace with actual data)
      { name: 'Project 1', startDate: '2023-01-01', deadline: '2023-06-01', members: '3', status: 'In Progress' },
      { name: 'Project 2', startDate: '2023-02-01', deadline: '2023-08-01', members: '2', status: 'No Started' },
    ];

    setProjects(fetchedProjects);

    // Update status counts (this is just an example logic)
    setStatusCounts({
      noStarted: fetchedProjects.filter(p => p.status === 'No Started').length,
      inProgress: fetchedProjects.filter(p => p.status === 'In Progress').length,
      onHold: fetchedProjects.filter(p => p.status === 'On Hold').length,
      cancelled: fetchedProjects.filter(p => p.status === 'Cancelled').length,
      completed: fetchedProjects.filter(p => p.status === 'Completed').length,
    });
  };

  const handleAddProject = () => {
    // Logic for adding new project
    console.log('Add New Project clicked');
  };

  return (
    <div className="container">
      {/* Projects Header */}
      <div className="header-row">
        <h2>Projects</h2>
        <button className="add-project" onClick={handleAddProject}>+ Add New Project</button>
      </div>

      {/* Status Summary */}
      <div className="status-summary">
        <div className="status-item no-started">
          <p className="status-count">{statusCounts.noStarted}</p>
          <p>No Started</p>
        </div>
        <div className="status-item in-progress">
          <p className="status-count">{statusCounts.inProgress}</p>
          <p>In Progress</p>
        </div>
        <div className="status-item on-hold">
          <p className="status-count">{statusCounts.onHold}</p>
          <p>On Hold</p>
        </div>
        <div className="status-item cancelled">
          <p className="status-count">{statusCounts.cancelled}</p>
          <p>Cancelled</p>
        </div>
        <div className="status-item completed">
          <p className="status-count">{statusCounts.completed}</p>
          <p>Completed</p>
        </div>
      </div>

      {/* Projects Table */}
      <table id="projectsTable" className="display">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Start Date</th>
            <th>Deadline</th>
            <th>Members</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.name}</td>
              <td>{project.startDate}</td>
              <td>{project.deadline}</td>
              <td>{project.members}</td>
              <td className={project.status.toLowerCase().replace(' ', '-')}>{project.status}</td>
              <td className="action-buttons">
                <span className="edit-btn">Edit</span> | <span className="delete-btn">Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsDashboard;
