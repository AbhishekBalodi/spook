import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "../../../public/assets/css/admin-task-list.css";
import AccessTypeList from '../../../public/assets/js/admin-task-list-script.js';
const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [deletePopup, setDeletePopup] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        // Fetch task data
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleDelete = (taskId) => {
        setSelectedTaskId(taskId);
        setDeletePopup(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/tasks/${selectedTaskId}`);
            setDeletePopup(false);
            fetchTasks(); // Refresh tasks after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const columns = [
        { name: "Task Name", selector: "taskName", sortable: true },
        { name: "Start Date", selector: "startDate", sortable: true },
        { name: "Deadline", selector: "deadline", sortable: true },
        {
            name: "Members",
            cell: (row) =>
                row.members.map((member, index) => (
                    <span key={index} className="member-circle">
                        {member.charAt(0)}
                    </span>
                )),
        },
        {
            name: "Status",
            cell: (row) => <span className={row.status.toLowerCase()}>{row.status}</span>,
        },
        {
            name: "Priority",
            selector: "priority",
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="action-buttons">
                    <span className="edit-btn">Edit</span>
                    <span className="delete-btn" onClick={() => handleDelete(row.id)}>Delete</span>
                </div>
            ),
        },
    ];

    return (
        <div className="container">
            <div className="header-row">
                <h2>Tasks</h2>
                <button className="add-task" onClick={() => alert("Add New Task")}>
                    + Add New Task
                </button>
            </div>
            <DataTable columns={columns} data={tasks} />

            {deletePopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={() => setDeletePopup(false)}>
                            &times;
                        </span>
                        <p>Are you sure you want to delete this task?</p>
                        <button className="ok-btn" onClick={confirmDelete}>
                            Yes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDashboard;
