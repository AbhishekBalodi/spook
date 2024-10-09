<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Dashboard</title>
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

.add-task {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
}

.add-task:hover {
    background-color: #45a049;
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
    
    </style>
</head>
<body>
    <div class="container">
        <!-- Projects Header -->
        <div class="header-row">
            <h2>Tasks</h2>
            <button class="add-task" onclick="companyAddClientTask()">+ Add New Task</button>
        </div>


        <!-- Projects Table -->
        <table id="tasksTable" class="display">
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
                <!-- Data will be loaded dynamically -->
            </tbody>
        </table>
    </div>

    <!-- Include jQuery and DataTables script -->
   
    <script src="../assets/js/client-user-task-script.js"></script>
</body>
</html>
