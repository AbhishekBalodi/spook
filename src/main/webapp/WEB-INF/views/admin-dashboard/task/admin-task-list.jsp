<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Dashboard</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
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

.popup {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 60px;
}

.popup-content {
    background-color: #fff;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
    border-radius: 8px;
    position: relative;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ok-btn {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 11px;
    display: inline-block;
    margin-top: 10px; /* Adds space between the button and the success message */
}

.close {
    color: #aaa;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
}


        #deleteConfirmationMessage {
            text-align: center;
            margin-bottom: 20px;
        }
    
    </style>
    
</head>
<body>
    <div class="container">
        <!-- Projects Header -->
        <div class="header-row">
            <h2>Tasks</h2>
            <button class="add-task" onclick="companyAddCTask()">+ Add New Task</button>
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
	<div id="deleteConfirmationPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="document.getElementById('deleteConfirmationPopup').style.display = 'none'">&times;</span>
            <p id="deleteConfirmationMessage">Are you sure?</p>
            <button class="ok-btn" onclick="companyDeleteTaskByTaskId()">Yes</button>
        </div>
    </div>
   
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <script src="../assets/js/admin-task-list-script.js"></script>
</body>
</html>
