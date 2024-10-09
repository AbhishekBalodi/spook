<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New Access Type</title>
    <style>
    /* General Styles */
body {
    font-family: Arial, sans-serif;
    background-color: #f8f9fc;
    margin: 0;
    padding: 0;
}

.page-container {
    padding: 20px;
    max-width: 1200px;
    margin: auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Header Styles */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header h1 {
    margin: 0;
    font-size: 24px;
}

.role-and-task-list-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

.role-and-task-list-btn:hover {
    background-color: #45a049;
}

/* Form Group Styles */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input[type="text"] {
    width: 99%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}





/* Button Styles */
.buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
}

.cancel-btn {
    background-color: #ccc;
    color: #000;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

.save-btn {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.cancel-btn:hover, .save-btn:hover {
    opacity: 0.8;
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

.error {
            color: red;
            font-size: 12px;
            display: none;
        }
        .required {
    		color: red;
    		font-weight: bold;
		}

    .form-group-row {
    display: flex;
    gap: 30px;
}

.form-group-row .form-group {
    flex: 1;
}
    </style>
</head>
<body>
    <div class="page-container">
        <div class="header">
            <h1>Add New Role & Tasks</h1>
            <button class="role-and-task-list-btn" onclick="getRoleAndTaskTable();resetFieldCount();">Role List</button>
        </div>
        <form id="role-and-task-form">
            <div class="form-group">
                <label for="roleName">Role <span class="required">*</span></label>
                <input type="text" id="roleName" name="roleName" placeholder="Create Role" required onchange="isDupicateTaskWiseRoleType()">
                <span id="roleNameError" class="error"></span>
            </div>
             <div id="taskFieldsContainer">
        <!-- Task fields will be dynamically inserted here -->
    		</div>
            <!-- Add More Button -->
            <div class="form-group-row">
                <button type="button" class="save-btn" onclick="addTaskFields()">+ Add More</button>
            </div>
            
            
            <div class="buttons">
                <button type="button" class="cancel-btn" onclick="getRoleAndTaskTable()">Cancel</button>
                <div id="role-and-task-form-save-btn">
                <button type="submit" class="save-btn" onclick="companyCreateAddRoleAndTask(event);resetFieldCount();">Save</button>
            	</div>
            </div>
        </form>
    </div>

  
    
    <div id="successPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="document.getElementById('successPopup').style.display = 'none';getRoleAndTaskTable();resetFieldCount();">&times;</span>
            <p id="successMessage"></p>
            <button class="ok-btn" onclick="document.getElementById('successPopup').style.display = 'none';getRoleAndTaskTable();resetFieldCount();">OK</button>
        </div>
    </div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <script src="../assets/js/add-role-and-task-script.js"></script>
</body>
</html>
