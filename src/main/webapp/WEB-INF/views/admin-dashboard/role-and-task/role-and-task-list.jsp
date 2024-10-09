<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access Type Management</title>
    <!-- DataTables CSS -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
    <!-- Custom CSS -->
     <style>
     /* Body and Container */
body {
    font-family: Arial, sans-serif;
    background-color: #f8f9fc;
    margin: 0;
    padding: 0;
}

.role-and-task-container {
    padding: 20px;
}

/* Stats Section */
.search-container {
    margin-bottom: 20px;
    text-align : right;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}
.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}
.new-role-and-task {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

.new-role-and-task:hover {
    background-color: #45a049;
}

/* Table Styles */
table.display {
    width: 100%;
    border-collapse: collapse;
}

table.display th, table.display td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
}

table.display th {
    background-color: #f2f2f2;
}


.user-tag {
    background-color: #e7e5ff;
    color: #6b46c1;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 12px;
    margin-right: 5px;
    display: inline-block;
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
    <div class="role-and-task-container">
        <div class="search-container">
            <button class="new-role-and-task" onclick="openAddRoleAndTask()">+ New Role</button>
        </div>
        <table id="roleAndTaskTable" class="display" style="width: 100%">
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Role Name</th>
                    <th>No. Task Type</th>
                    <th>Task Type</th>
                    <th>Action</th>
                </tr>
            </thead>
        </table>
    </div>
    
	<div id="deleteConfirmationPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="document.getElementById('deleteConfirmationPopup').style.display = 'none'">&times;</span>
            <p id="deleteConfirmationMessage">Are you sure?</p>
            <button class="ok-btn" onclick="companyDeleteTaskWiseRoleById()">Yes</button>
        </div>
    </div>
    

    

    <!-- Custom JS -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <script src="../assets/js/role-and-task-list-script.js"></script>
</body>
</html>
