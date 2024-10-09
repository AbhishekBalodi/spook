<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New User</title>
    <style>
    * {
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
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

h2 {
    text-align: left;
}

.row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.column {
    width: 48%;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"], input[type="email"], input[type="tel"], input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input[type="checkbox"] {
    margin-right: 5px;
}

button {
    padding: 8px 16px; /* Adjusted padding to make the button smaller */
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px; /* Reduced font size */
    float: right; /* Align button to the right */
}

button:hover {
    background-color: #45a049;
}

.row-button {
    display: flex;
    justify-content: flex-end; /* Align the button container to the right */
    margin-bottom: 20px;
}


.permissions, .email-notifications {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
}

.close {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #aaa;
}

.close:hover {
    color: #000;
}

/* New styles for checkbox label alignment */
.permissions label, .email-notifications label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.permissions input[type="checkbox"], .email-notifications input[type="checkbox"] {
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
    
    </style>
</head>
<body>
    <div class="container">
        <form id="addUserForm">
            <h2>Add New User</h2>
            <div class="row">
                <div class="column">
                    <label for="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" required>
                </div>
                <div class="column">
                    <label for="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" required>
                </div>
            </div>

            <div class="row">
                <div class="column">
                    <label for="designation">Designation *</label>
                    <input type="text" id="designation" name="designation" placeholder="Designation" required>
                </div>
                <div class="column">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" placeholder="Email Address" required>
                </div>
            </div>

            <div class="row">
                <div class="column">
                    <label for="mobile">Mobile *</label>
                    <input type="tel" id="mobile" name="mobile" placeholder="+91 XXXXXXXXXX" required>
                </div>
                <div class="column">
                    <label for="password">Password *</label>
                    <input type="password" id="password" name="password" placeholder="Password" required>
                </div>
            </div>

            <div class="row">
                <label><input type="checkbox" name="primaryUser"> Primary User</label>
                <label><input type="checkbox" name="noWelcomeEmail"> Do not send Welcome Email</label>
                <label><input type="checkbox" name="setPasswordEmail"> Send Set password Email</label>
            </div>

            <div class="row">
                <div class="column permissions">
                    <h3>Permissions</h3>
                    <p>Set appropriate permissions for this user</p>
                    <label class="status-switch"><span>Projects</span><input type="checkbox" name="userPermissions" value="projects" checked></label>
                    <label class="status-switch"><span>Task</span><input type="checkbox" name="userPermissions" value="task" checked></label>
                    <label class="status-switch"><span>Documents</span><input type="checkbox" name="userPermissions" value="documents" checked></label>
                    <label class="status-switch"><span>Invoices</span><input type="checkbox" name="userPermissions" value="invoices" checked></label>
                    <label class="status-switch"><span>Files</span><input type="checkbox"  name="userPermissions" value="files" checked></label>
                </div>
                <div class="column email-notifications">
                    <h3>Email Notifications</h3>
                    <p>Set appropriate permissions for this user</p>
                    <label class="status-switch"><span>Projects</span><input type="checkbox" name="userPermissions" value="emailProjects" checked></label>
                    <label class="status-switch"><span>Task</span><input type="checkbox" name="userPermissions" value="emailTask" checked></label>
                    <label class="status-switch"><span>Documents</span><input type="checkbox" name="userPermissions" value="emailDocuments" checked></label>
                    <label class="status-switch"><span>Invoices</span><input type="checkbox" name="userPermissions" value="emailInvoices" checked></label>
                    <label class="status-switch"><span>Files</span><input type="checkbox" name="userPermissions" value="emailFiles" checked></label>
                </div>
            </div>

            <div class="row-button">
                <button type="submit" onclick="createNewClientUser(event)">Save</button>
            </div>
        </form>
    </div>
    
    <div id="confirmationPopup1" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeSuccessModal()">&times;</span>
            <p id="successMessage">Team member added successfully!</p>
            <button onclick="closeSuccessModal()">OK</button>
        </div>
    </div>

</body>
</html>
