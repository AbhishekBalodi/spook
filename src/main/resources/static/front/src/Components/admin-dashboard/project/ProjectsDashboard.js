import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "../../../public/assets/css/projectsDashboardss.css";
import AccessTypeList from '../../../public/assets/js/admin-project-list-script.js';
const ProjectsDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [deletePopup, setDeletePopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    // Fetch project data
    fetchProjectList();
  }, []);

  const fetchProjectList = () => {
    // Fetch or define projects data
    const data = [
      {
        id: 1,
        name: "Project A",
        startDate: "2023-01-01",
        deadline: "2023-12-31",
        members: ["John", "Jane"],
        status: "In Progress",
      },
      {
        id: 2,
        name: "Project B",
        startDate: "2023-05-01",
        deadline: "2023-11-30",
        members: ["Alice", "Bob"],
        status: "Completed",
      },
    ];
    setProjects(data);
  };

  const deleteProject = (projectId) => {
    // Logic to delete project
    setProjects(projects.filter((project) => project.id !== projectId));
    setDeletePopup(false);
    setConfirmationPopup(true);
  };

  const columns = [
    { name: "Project Name", selector: (row) => row.name, sortable: true },
    { name: "Start Date", selector: (row) => row.startDate },
    { name: "Deadline", selector: (row) => row.deadline },
    { name: "Members", cell: (row) => row.members.join(", ") },
    { name: "Status", selector: (row) => row.status },
    {
      name: "Actions",
      cell: (row) => (
        <div className="action-buttons">
          <span className="edit-btn">Edit</span>
          <span
            className="delete-btn"
            onClick={() => {
              setSelectedProjectId(row.id);
              setDeletePopup(true);
            }}
          >
            Delete
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="header-row">
        <h2>Projects</h2>
        <button className="add-project">+ Add New Project</button>
      </div>

      <div className="status-summary">
        <div className="status-item no-started">
          <p className="status-count">0</p>
          <p>No Started</p>
        </div>
        <div className="status-item in-progress">
          <p className="status-count">1</p>
          <p>In Progress</p>
        </div>
        <div className="status-item on-hold">
          <p className="status-count">0</p>
          <p>On Hold</p>
        </div>
        <div className="status-item cancelled">
          <p className="status-count">0</p>
          <p>Cancelled</p>
        </div>
        <div className="status-item completed">
          <p className="status-count">1</p>
          <p>Completed</p>
        </div>
      </div>

      <DataTable columns={columns} data={projects} />

      {deletePopup && (
        <div className="popup">
          <div className="popup-content">
            <span
              className="close"
              onClick={() => setDeletePopup(false)}
            >
              &times;
            </span>
            <p>Are you sure you want to delete this project?</p>
            <button className="ok-btn" onClick={() => deleteProject(selectedProjectId)}>
              Yes
            </button>
          </div>
        </div>
      )}

      {confirmationPopup && (
        <div className="popup">
          <div className="popup-content">
            <span
              className="close"
              onClick={() => setConfirmationPopup(false)}
            >
              &times;
            </span>
            <p>Project deleted successfully!</p>
            <button className="ok-btn" onClick={() => setConfirmationPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsDashboard;
