import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import './task-dashboard.css';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch task data (replace with actual API call)
    fetchTasksData();
  }, []);

  const fetchTasksData = () => {
    // Replace this with actual data fetching logic
    const fetchedTasks = [
      {
        taskName: 'Task 1',
        startDate: '2023-01-01',
        deadline: '2023-01-10',
        members: 'John, Alice',
        status: 'In Progress',
        priority: 'High',
      },
      {
        taskName: 'Task 2',
        startDate: '2023-01-05',
        deadline: '2023-01-15',
        members: 'Bob, Mike',
        status: 'Completed',
        priority: 'Medium',
      },
    ];
    setTasks(fetchedTasks);
  };

  const handleAddTask = () => {
    // Logic to add a new task
    console.log('Add New Task clicked');
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header-row">
        <h2>Tasks</h2>
        <button className="add-task" onClick={handleAddTask}>+ Add New Task</button>
      </div>

      {/* Tasks Table */}
      <table id="tasksTable" className="display">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Start Date</th>
            <th>Deadline</th>
            <th>Members</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.taskName}</td>
              <td>{task.startDate}</td>
              <td>{task.deadline}</td>
              <td>
                {task.members.split(',').map((member, i) => (
                  <span key={i} className="member-circle">{member.charAt(0)}</span>
                ))}
              </td>
              <td className={task.status.toLowerCase().replace(' ', '-')}>{task.status}</td>
              <td>{task.priority}</td>
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

export default TaskDashboard;
