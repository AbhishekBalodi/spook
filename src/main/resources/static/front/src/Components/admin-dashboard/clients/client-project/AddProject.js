import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';


import './add-project.css';

const AddProject = () => {
  const [projectDetails, setProjectDetails] = useState({
    projectName: '',
    calculateProgress: false,
    progress: 0,
    billingType: '',
    status: '',
    totalRate: '',
    estimatedHours: '',
    startDate: '',
    deadline: '',
    members: [],
    description: '',
    sendProjectEmail: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleMembersChange = (selectedMembers) => {
    setProjectDetails({ ...projectDetails, members: selectedMembers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // AJAX logic here for form submission

    console.log('Project Details Submitted:', projectDetails);
    // Display success modal or message
  };

  const progressOptions = [
    { value: 1, label: 'Fixed' },
    { value: 2, label: 'Monthly' },
  ];

  const statusOptions = [
    { value: 1, label: 'Not Started' },
    { value: 2, label: 'In Progress' },
    { value: 3, label: 'On Hold' },
    { value: 4, label: 'Cancelled' },
    { value: 5, label: 'Completed' },
  ];

  return (
    <div className="client-add-project-container">
      <h4>Add New Projects</h4>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="projectName" className="form-label">Project Name *</label>
            <input
              type="text"
              id="projectName"
              className="form-control"
              name="projectName"
              value={projectDetails.projectName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="calculateProgress"
                name="calculateProgress"
                checked={projectDetails.calculateProgress}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="calculateProgress">
                Calculate progress through tasks
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <label htmlFor="progressRange">Progress</label>
            <input
              type="range"
              id="progressRange"
              className="form-range"
              name="progress"
              min="0"
              max="100"
              value={projectDetails.progress}
              onChange={handleInputChange}
            />
            <span className="progress-label">{projectDetails.progress}%</span>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="billingType" className="form-label">Billing Type *</label>
            <Select
              options={progressOptions}
              name="billingType"
              value={progressOptions.find((option) => option.value === projectDetails.billingType)}
              onChange={(option) => setProjectDetails({ ...projectDetails, billingType: option.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="status" className="form-label">Status</label>
            <Select
              options={statusOptions}
              name="status"
              value={statusOptions.find((option) => option.value === projectDetails.status)}
              onChange={(option) => setProjectDetails({ ...projectDetails, status: option.value })}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="totalRate" className="form-label">Total Rate</label>
            <input
              type="number"
              id="totalRate"
              className="form-control"
              name="totalRate"
              value={projectDetails.totalRate}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="estimatedHours" className="form-label">Estimated Hours</label>
            <input
              type="number"
              id="estimatedHours"
              className="form-control"
              name="estimatedHours"
              value={projectDetails.estimatedHours}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="startDate" className="form-label">Start Date *</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              name="startDate"
              value={projectDetails.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="deadline" className="form-label">Deadline</label>
            <input
              type="date"
              id="deadline"
              className="form-control"
              name="deadline"
              value={projectDetails.deadline}
              onChange={handleInputChange}
            />
          </div>
        </div>

		<div className="row mb-3">
		           <div className="col-md-12">
		               <label htmlFor="members" className="form-label">Members</label>
		               <select id="members" className="form-select" multiple="multiple">
		                   {projectDetails.members.map((member) => (
		                       member.role.roleName !== 'ADMIN' && (
		                           <option key={member.login.loginId} value={member.login.loginId}>
		                               {member.name} ({member.email})
		                           </option>
		                       )
		                   ))}
		               </select>
		           </div>
		       </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              className="form-control"
              name="description"
              value={projectDetails.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <div className="form-check custom-checkbox">
          <input
            className="form-check-input"
            type="checkbox"
            id="sendProjectEmail"
            name="sendProjectEmail"
            checked={projectDetails.sendProjectEmail}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="sendProjectEmail">
            Send project created email
          </label>
        </div>

        <button type="submit" className="btn btn-save">Save</button>
      </form>
    </div>
  );
};

export default AddProject;
