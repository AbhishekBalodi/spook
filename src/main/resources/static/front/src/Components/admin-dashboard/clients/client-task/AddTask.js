import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './add-task.css';
//import AccessTypeList from '../../../public/assets/js/admin-access-type-list-script.js';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
const AddTask = () => {
  const [taskDetails, setTaskDetails] = useState({
    taskName: '',
    projectId: '',
    startDate: '',
    deadline: '',
    priority: '',
    status: '',
    members: [],
    description: '',
  });

  const [projects, setProjects] = useState([]); // Available projects for dropdown
  const [members, setMembers] = useState([]);   // Members based on selected project

  useEffect(() => {
    // Fetch assigned projects (You should replace this with actual API call)
    setProjects([
      { value: '1', label: 'Project 1' },
      { value: '2', label: 'Project 2' },
    ]);
  }, []);

  const loadMembersByProject = (selectedProject) => {
    // API call to load members based on projectId (replace this with actual API call)
    if (selectedProject) {
      setMembers([
        { value: '1', label: 'Member 1' },
        { value: '2', label: 'Member 2' },
      ]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleProjectChange = (selectedProject) => {
    setTaskDetails({ ...taskDetails, projectId: selectedProject.value });
    loadMembersByProject(selectedProject.value);
  };

  const handleMembersChange = (selectedMembers) => {
    setTaskDetails({ ...taskDetails, members: selectedMembers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit taskDetails data (replace this with actual API call)
    console.log('Task Details Submitted:', taskDetails);
    // Show success modal or message
  };

  return (
    <div className="client-add-task-container">
      <h4>Add New Task</h4>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="taskName" className="form-label">Subject *</label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              className="form-control"
              value={taskDetails.taskName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="projectId" className="form-label">Project *</label>
            <Select
              id="projectId"
              options={projects}
              onChange={handleProjectChange}
              placeholder="Select Project"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="startDate" className="form-label">Start Date *</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="form-control"
              value={taskDetails.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="deadline" className="form-label">Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              className="form-control"
              value={taskDetails.deadline}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select
              id="priority"
              name="priority"
              className="form-select"
              value={taskDetails.priority}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select Priority</option>
              <option value="1">Urgent</option>
              <option value="2">High</option>
              <option value="3">Medium</option>
              <option value="4">Low</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              name="status"
              className="form-select"
              value={taskDetails.status}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select Status</option>
              <option value="1">No Started</option>
              <option value="2">In Progress</option>
              <option value="3">On Hold</option>
              <option value="4">Cancelled</option>
              <option value="5">Completed</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="members" className="form-label">Members</label>
            <Select
              id="members"
              isMulti
              options={members}
              onChange={handleMembersChange}
              placeholder="Select Members"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={taskDetails.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn task-btn-save">Save</button>
      </form>
    </div>
  );
};

export default AddTask;
