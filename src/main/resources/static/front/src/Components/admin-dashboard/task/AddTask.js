import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "select2/dist/css/select2.min.css";
import "../../../public/assets/css/admin-add-task.css";
//import AccessTypeList from '../../../public/assets/js/admin-access-type-list-script.js';
const AddTask = ({ taskDetails = {}, clientList = [], assignedProjectToClient = [], assignedTeam = [], mappedTeam = [] }) => {
    const [formData, setFormData] = useState({
        taskName: taskDetails.taskName || "",
        clientId: taskDetails.clientId || "",
        projectId: taskDetails.projectId || "",
        startDate: taskDetails.startDate || "",
        deadline: taskDetails.endDate || "",
        priority: taskDetails.priority || "",
        status: taskDetails.status || "",
        members: mappedTeam || [],
        description: taskDetails.description || "",
    });

    const [clientProjects, setClientProjects] = useState(assignedProjectToClient);
    const [membersList, setMembersList] = useState(assignedTeam);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (selectedOption, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: selectedOption.map(option => option.value),
        }));
    };

    const loadMembersByProject = async () => {
        try {
            const { data } = await axios.get(`/companyGetAllocatedMemberInProject`, {
                params: { projectId: formData.projectId, clientId: formData.clientId },
            });
            setMembersList(data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    const loadProjectsByClient = async () => {
        try {
            const { data } = await axios.get(`/companyGetProjectByClient`, {
                params: { clientId: formData.clientId },
            });
            setClientProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/companyCreateTask", formData);
            console.log("Task saved successfully!", response);
        } catch (error) {
            console.error("Error saving task", error);
        }
    };

    useEffect(() => {
        // Initialize any UI components (like select2) if needed
        // Your existing Select2 code can be adapted to React-Select
    }, []);

    return (
        <div className="client-add-task-container">
            <h4>Add New Task</h4>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <label className="form-label">Subject *</label>
                        <input
                            type="text"
                            name="taskName"
                            className="form-control"
                            value={formData.taskName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Client *</label>
                        <select
                            name="clientId"
                            className="form-select"
                            value={formData.clientId}
                            onChange={(e) => {
                                handleInputChange(e);
                                loadProjectsByClient();
                            }}
                            required
                        >
                            <option value="" disabled>
                                Select Client
                            </option>
                            {clientList.map((client) => (
                                <option key={client.clientId} value={client.clientId}>
                                    {client.clientName} {client.status === false && "(Inactive)"}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Project *</label>
                        <select
                            name="projectId"
                            className="form-select"
                            value={formData.projectId}
                            onChange={(e) => {
                                handleInputChange(e);
                                loadMembersByProject();
                            }}
                            required
                        >
                            <option value="" disabled>
                                Select Project
                            </option>
                            {clientProjects.map((project) => (
                                <option key={project.projectId} value={project.projectId}>
                                    {project.projectName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Start Date *</label>
                        <input
                            type="date"
                            name="startDate"
                            className="form-control"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            className="form-control"
                            value={formData.deadline}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Priority</label>
                        <select
                            name="priority"
                            className="form-select"
                            value={formData.priority}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>
                                Select Priority
                            </option>
                            <option value="1">Urgent</option>
                            <option value="2">High</option>
                            <option value="3">Medium</option>
                            <option value="4">Low</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Status</label>
                        <select
                            name="status"
                            className="form-select"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>
                                Select Status
                            </option>
                            <option value="1">Not Started</option>
                            <option value="2">In Progress</option>
                            <option value="3">On Hold</option>
                            <option value="4">Cancelled</option>
                            <option value="5">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-12">
                        <label className="form-label">Members</label>
                        <Select
                            isMulti
                            name="members"
                            options={membersList.map((member) => ({
                                value: member.login_id,
                                label: `${member.name} (${member.email})`,
                                isDisabled: !member.status,
                            }))}
                            value={formData.members.map((id) =>
                                membersList.find((member) => member.login_id === id)
                            )}
                            onChange={(selectedOptions) => handleSelectChange(selectedOptions, "members")}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-12">
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            className="form-control"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button type="submit" className="btn task-btn-save">
                    {taskDetails.taskId > 0 ? "Update" : "Save"}
                </button>
            </form>
        </div>
    );
};

export default AddTask;
