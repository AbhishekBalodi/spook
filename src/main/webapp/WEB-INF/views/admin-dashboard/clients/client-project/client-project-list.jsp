<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projects Dashboard</title>
    <style>
    body {
    font-family: Arial, sans-serif;
}

.container {
    width: 100%;
    max-width: 95%;
    margin:  auto;
    background: #fff;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: #f3f4f6;
}

.header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.add-project {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
}

.add-project:hover {
    background-color: #45a049;
}

.status-summary {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
}

.status-item {
    text-align: center;
    width: 18%;
}

.status-count {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
}

.no-started .status-count {
    color: #000;
}

.in-progress .status-count {
    color: blue;
}

.on-hold .status-count {
    color: red;
}

.cancelled .status-count {
    color: gray;
}

.completed .status-count {
    color: green;
}

.member-circle {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #e0e0e0;
    color: #333;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    font-weight: bold;
    margin-right: 5px;
    font-size: 14px;
}

.in-progress {
    color: blue;
}

.on-hold {
    color: red;
}

.completed {
    color: green;
}

.action-buttons {
    display: flex;
    justify-content: space-evenly;
}

.edit-btn {
    color: blue;
    cursor: pointer;
}

.delete-btn {
    color: red;
    cursor: pointer;
}
    
    </style>
</head>
<body>
    <div class="container">
        <!-- Projects Header -->
        <div class="header-row">
            <h2>Projects</h2>
            <button class="add-project" onclick="companyAddClientProject()">+ Add New Project</button>
        </div>

        <!-- Status Summary -->
        <div class="status-summary">
            <div class="status-item no-started">
                <p class="status-count" id="noStarted">0</p>
                <p>No Started</p>
            </div>
            <div class="status-item in-progress">
                <p class="status-count" id="inProgress">0</p>
                <p>In Progress</p>
            </div>
            <div class="status-item on-hold">
                <p class="status-count" id="onHold">0</p>
                <p>On Hold</p>
            </div>
            <div class="status-item cancelled">
                <p class="status-count" id="cancelled">0</p>
                <p>Cancelled</p>
            </div>
            <div class="status-item completed">
                <p class="status-count" id="completed">0</p>
                <p>Completed</p>
            </div>
        </div>

        <!-- Projects Table -->
        <table id="projectsTable" class="display">
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
                <!-- Data will be loaded dynamically -->
            </tbody>
        </table>
    </div>

    <!-- Include jQuery and DataTables script -->
   
    <script src="../assets/js/client-user-project-script.js"></script>
</body>
</html>
