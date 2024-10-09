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

.access-list-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

.access-list-btn:hover {
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
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

/* Section Styles */
.section {
    margin-top: 30px;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
}

.section h3 {
    margin-bottom: 15px;
}

/* Grid Container */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

/* Card Styles */
.card {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card h4 {
    margin-top: 0;
    font-size: 18px;
}

/* Permissions Switch Styles */
.permissions label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.permissions span {
    margin-right: auto;
    font-weight: bold;
}

.permissions input[type="checkbox"] {
    margin-left: auto;
}

.status-switch {
    display: flex;
    align-items: center;
}

.status-switch input[type="checkbox"] {
    appearance: none;
    width: 40px;
    height: 20px;
    background-color: #ddd;
    border-radius: 50px;
    position: relative;
    cursor: pointer;
    outline: none;
}

.status-switch input[type="checkbox"]:checked {
    background-color: #28a745;
}

.status-switch input[type="checkbox"]::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    top: 1px;
    left: 1px;
    transition: all 0.3s;
}

.status-switch input[type="checkbox"]:checked::before {
    transform: translateX(20px);
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
    </style>
</head>
<body>
    <div class="page-container">
        <div class="header">
            <h1>Add New Access Type</h1>
            <button class="access-list-btn" onclick="getAccessTypeTable()">Access List</button>
        </div>
        <form id="access-form">
            <div class="form-group">
                <label for="roleName">Access Name <span class="required">*</span></label>
                <input type="text" id="roleName" name="roleName" required onchange="isDupicateAccessType()">
                <span id="roleNameError" class="error"></span>
            </div>
            
            <div class="section">
                <h3>Clients</h3>
                <div class="grid-container">
                    <!-- Cards for each client profile -->
                    <div class="card">
                        <!-- <h4>Client Profile</h4> -->
                        <div class="permissions">
                        <label class="status-switch">
                                <span><h4>Client Profile</h4></span>
                                <input type="checkbox" id="companyClientMaster" name="companyClientMaster" checked>
                            </label>
                        </div>
                        <p>Set appropriate permissions for this role</p>
                        <div class="permissions">
                            <label class="status-switch">
                                <span>View</span>
                                <input type="checkbox" id="companyClientView" name="permissions" value="companyClientView" checked>
                            </label>
                            <label class="status-switch">
                                <span>Create</span>
                                <input type="checkbox" id="companyClientCreate" name="permissions" value="companyClientCreate" checked>
                            </label>
                            <label class="status-switch">
                                <span>Edit</span>
                                <input type="checkbox" id="companyClientEdit" name="permissions" value="companyClientEdit" checked>
                            </label>
                            <label class="status-switch">
                                <span>Delete</span>
                                <input type="checkbox" id="companyClientDelete" name="permissions" value="companyClientDelete" checked>
                            </label>
                        </div>
                    </div>
                    <!-- Additional cards as needed -->
                </div>
            </div>
            
            <div class="section">
                <h3>Team</h3>
                <div class="grid-container">
                    <!-- Cards for each client profile -->
                    <div class="card">
                        <h4>Team Member</h4>
                        <p>Set appropriate permissions for this role</p>
                        <div class="permissions">
                            <label class="status-switch">
                                <span>View</span>
                                <input type="checkbox" id="companyTeamView" name="permissions" value="companyTeamView"  >
                            </label>
                            <label class="status-switch">
                                <span>Create</span>
                                <input type="checkbox" id="companyTeamDelete" name="permissions" value="companyTeamDelete"  >
                            </label>
                            <label class="status-switch">
                                <span>Edit</span>
                                <input type="checkbox" id="companyTeamDelete" name="permissions" value="companyTeamDelete"  >
                            </label>
                            <label class="status-switch">
                                <span>Delete</span>
                                <input type="checkbox" id="companyTeamDelete" name="permissions" value="companyTeamDelete"  >
                            </label>
                        </div>
                    </div>
                    <div class="card">
                        <h4>Projects</h4>
                        <p>Set appropriate permissions for this role</p>
                        <div class="permissions">
                            <label class="status-switch">
                                <span>View</span>
                                <input type="checkbox" id="companyProjectView" name="permissions" value="companyProjectView"  >
                            </label>
                            <label class="status-switch">
                                <span>Create</span>
                                <input type="checkbox" id="companyProjectCreate" name="permissions" value="companyProjectCreate"  >
                            </label>
                            <label class="status-switch">
                                <span>Edit</span>
                                <input type="checkbox" id="companyProjectEdit" name="permissions" value="companyProjectEdit"  >
                            </label>
                            <label class="status-switch">
                                <span>Delete</span>
                                <input type="checkbox" id="companyProjectDelete" name="permissions" value="companyProjectDelete"  >
                            </label>
                        </div>
                    </div>
                    <div class="card">
                        <h4>Tasks</h4>
                        <p>Set appropriate permissions for this role</p>
                        <div class="permissions">
                            <label class="status-switch">
                                <span>View</span>
                                <input type="checkbox" id="companyTaskView" name="permissions" value="companyTaskView"  >
                            </label>
                            <label class="status-switch">
                                <span>Create</span>
                                <input type="checkbox" id="companyTaskCreate" name="permissions" value="companyTaskCreate"  >
                            </label>
                            <label class="status-switch">
                                <span>Edit</span>
                                <input type="checkbox" id="companyTaskEdit" name="permissions" value="companyTaskEdit"  >
                            </label>
                            <label class="status-switch">
                                <span>Delete</span>
                                <input type="checkbox" id="companyTaskDelete" name="permissions" value="companyTaskDelete"  >
                            </label>
                        </div>
                    </div>
                    <!-- Additional cards as needed -->
                </div>
            </div>
            
            <div class="section">
                <h3>Setup</h3>
                <div class="grid-container">
                    <!-- Cards for each client profile -->
                    <div class="card">
                        <h4>Roles</h4>
                        <p>Set appropriate permissions for this role</p>
                        <div class="permissions">
                            <label class="status-switch">
                                <span>View</span>
                                <input type="checkbox" id="companyRoleView" name="permissions" value="companyRoleView"  >
                            </label>
                            <label class="status-switch">
                                <span>Create</span>
                                <input type="checkbox" id="companyRoleCreate" name="permissions" value="companyRoleCreate"  >
                            </label>
                            <label class="status-switch">
                                <span>Edit</span>
                                <input type="checkbox" id="companyRoleEdit" name="permissions" value="companyRoleEdit"  >
                            </label>
                            <label class="status-switch">
                                <span>Delete</span>
                                <input type="checkbox" id="companyRoleDelete" name="permissions" value="companyRoleDelete"  >
                            </label>
                        </div>
                    </div>
                    <!-- Additional cards as needed -->
                </div>
            </div>
            
            <div class="section">
                <h3>Invoice and Report</h3>
                <div class="grid-container">
                    <!-- Cards for each client profile -->
                    <div class="card">
                        <h4>Invoice</h4>
                        <p>Set appropriate permissions for this role</p>
                        <div class="permissions">
                            <label class="status-switch">
                                <span>View</span>
                                <input type="checkbox" id="companyInvoiceView" name="permissions" value="companyInvoiceView"  >
                            </label>
                            <label class="status-switch">
                                <span>Create</span>
                                <input type="checkbox" id="companyInvoiceCreate" name="permissions" value="companyInvoiceCreate"  >
                            </label>
                            <label class="status-switch">
                                <span>Edit</span>
                                <input type="checkbox" id="companyInvoiceEdit" name="permissions" value="companyInvoiceEdit"  >
                            </label>
                            <label class="status-switch">
                                <span>Delete</span>
                                <input type="checkbox" id="companyInvoiceDelete" name="permissions" value="companyInvoiceDelete"  >
                            </label>
                        </div>
                    </div>
                    <div class="card">
                        <h4>Reports</h4>
                        <p>Set appropriate permissions for this role</p>
                        <div class="permissions">
                            <label class="status-switch">
                                <span>View</span>
                                <input type="checkbox" id="companyReportView" name="permissions" value="companyReportView"  >
                            </label>
                            <label class="status-switch">
                                <span>Create</span>
                                <input type="checkbox" id="companyReportCreate" name="permissions" value="companyReportCreate"  >
                            </label>
                            <label class="status-switch">
                                <span>Edit</span>
                                <input type="checkbox" id="companyReportEdit" name="permissions" value="companyReportEdit"  >
                            </label>
                            <label class="status-switch">
                                <span>Delete</span>
                                <input type="checkbox" id="companyReportDelete" name="permissions" value="companyReportDelete"  >
                            </label>
                        </div>
                    </div>
                    <!-- Additional cards as needed -->
                </div>
            </div>
            
            <div class="buttons">
                <button type="button" class="cancel-btn" onclick="getAccessTypeTable()">Cancel</button>
                <button type="submit" class="save-btn" onclick="companyCreateAccessType(event)">Save</button>
            </div>
        </form>
    </div>

  
    
    <div id="successPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="closeAddAccessTypeSuccessPopup()">&times;</span>
            <p id="successMessage"></p>
            <button class="ok-btn" onclick="closeAddAccessTypeSuccessPopup()">OK</button>
        </div>
    </div>

    <script>
    
    </script>
</body>
</html>
