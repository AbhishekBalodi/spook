import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
//import AccessTypeList from '../../../public/assets/js/admin-access-type-list-script.js';
const AddProject = ({ projectDetails, clientList, members, mappedTeam }) => {
  const [formData, setFormData] = useState({
    projectName: projectDetails?.projectName || "",
    clientId: projectDetails?.clientId || "",
    calculateProgress: false,
    progress: 0,
    billingType: projectDetails?.billingType || "",
    status: projectDetails?.status || "",
    totalRate: projectDetails?.totalRate || "",
    estimatedHours: projectDetails?.estimatedHours || "",
    startDate: projectDetails?.startDate || "",
    deadline: projectDetails?.endDate || "",
    members: mappedTeam || [],
    description: projectDetails?.description || "",
    sendProjectEmail: false,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      members: selectedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector("meta[name='_csrf']").content;
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").content;

    axios.defaults.headers.common[csrfHeader] = csrfToken;

    try {
      if (projectDetails?.projectId) {
        await axios.put(`/companyUpdateProject?projectId=${projectDetails.projectId}`, formData);
      } else {
        await axios.post("/companyCreateProject", formData);
      }
      setShowModal(true);
    } catch (error) {
      console.error("Error saving project", error);
      alert("Failed to save project. Please try again.");
    }
  };

  return (
    <div className="client-add-project-container">
      <h4>{projectDetails?.projectId ? "Update Project" : "Add New Project"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="projectName" className="form-label">
              Project Name *
            </label>
            <input
              type="text"
              id="projectName"
              className="form-control"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="clientId" className="form-label">
              Client *
            </label>
            <select
              id="clientId"
              className="form-select"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Client
              </option>
              {clientList.map((client) => (
                <option key={client.clientId} value={client.clientId} disabled={!client.status}>
                  {client.clientName} {client.status === false && "(Inactive)"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <input
              type="checkbox"
              id="calculateProgress"
              name="calculateProgress"
              checked={formData.calculateProgress}
              onChange={handleChange}
            />
            <label htmlFor="calculateProgress">Calculate progress through tasks</label>
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
              value={formData.progress}
              onChange={handleChange}
            />
            <span>{formData.progress}%</span>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="billingType" className="form-label">
              Billing Type *
            </label>
            <select
              id="billingType"
              className="form-select"
              name="billingType"
              value={formData.billingType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Billing Type
              </option>
              <option value="1">Fixed</option>
              <option value="2">Monthly</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Status
              </option>
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
            <label htmlFor="totalRate" className="form-label">
              Total Rate
            </label>
            <input
              type="number"
              id="totalRate"
              className="form-control"
              name="totalRate"
              value={formData.totalRate}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="estimatedHours" className="form-label">
              Estimated Hours
            </label>
            <input
              type="number"
              id="estimatedHours"
              className="form-control"
              name="estimatedHours"
              value={formData.estimatedHours}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="startDate" className="form-label">
              Start Date *
            </label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              className="form-control"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="members" className="form-label">
              Members
            </label>
            <Select
              id="members"
              isMulti
              value={formData.members}
              onChange={handleSelectChange}
              options={members.map((member) => ({
                value: member.login.loginId,
                label: `${member.name} (${member.email})`,
              }))}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-check custom-checkbox">
          <input
            type="checkbox"
            id="sendProjectEmail"
            name="sendProjectEmail"
            checked={formData.sendProjectEmail}
            onChange={handleChange}
          />
          <label htmlFor="sendProjectEmail">Send project created email</label>
        </div>

        <button type="submit" className="btn btn-save">
          {projectDetails?.projectId ? "Update" : "Save"}
        </button>
      </form>

      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Project saved successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProject;
