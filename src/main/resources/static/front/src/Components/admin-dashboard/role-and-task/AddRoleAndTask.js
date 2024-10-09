import React, { useState } from "react";
import "../../../public/assets/css/add-role-and-task.css";
import AccessTypeList from '../../../public/assets/js/role-and-task-list-script.js';
const AddRoleAndTask = () => {
    const [roleName, setRoleName] = useState("");
    const [taskFields, setTaskFields] = useState([{ taskName: "" }]);
    const [errors, setErrors] = useState({});
    const [successPopup, setSuccessPopup] = useState(false);

    const handleRoleChange = (e) => {
        setRoleName(e.target.value);
        setErrors({ ...errors, roleName: "" });
    };

    const addTaskFields = () => {
        setTaskFields([...taskFields, { taskName: "" }]);
    };

    const handleTaskChange = (e, index) => {
        const updatedTasks = taskFields.map((task, i) =>
            i === index ? { taskName: e.target.value } : task
        );
        setTaskFields(updatedTasks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!roleName) {
            setErrors({ roleName: "Role name is required" });
            return;
        }

        // Handle form submission logic here

        setSuccessPopup(true);
    };

    return (
        <div className="page-container">
            <div className="header">
                <h1>Add New Role & Tasks</h1>
                <button className="role-and-task-list-btn" onClick={() => console.log("Redirect to Role List")}>Role List</button>
            </div>

            <form id="role-and-task-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="roleName">Role <span className="required">*</span></label>
                    <input 
                        type="text" 
                        id="roleName" 
                        name="roleName" 
                        value={roleName}
                        onChange={handleRoleChange}
                        placeholder="Create Role" 
                        required 
                    />
                    {errors.roleName && <span className="error">{errors.roleName}</span>}
                </div>

                <div id="taskFieldsContainer">
                    {taskFields.map((task, index) => (
                        <div className="form-group" key={index}>
                            <label htmlFor={`task-${index}`}>Task {index + 1}</label>
                            <input
                                type="text"
                                id={`task-${index}`}
                                value={task.taskName}
                                onChange={(e) => handleTaskChange(e, index)}
                                placeholder={`Enter task ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                <div className="form-group-row">
                    <button type="button" className="save-btn" onClick={addTaskFields}>+ Add More</button>
                </div>

                <div className="buttons">
                    <button type="button" className="cancel-btn" onClick={() => console.log("Cancel Action")}>Cancel</button>
                    <button type="submit" className="save-btn">Save</button>
                </div>
            </form>

            {successPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={() => setSuccessPopup(false)}>&times;</span>
                        <p>Role and tasks saved successfully!</p>
                        <button className="ok-btn" onClick={() => setSuccessPopup(false)}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddRoleAndTask;
