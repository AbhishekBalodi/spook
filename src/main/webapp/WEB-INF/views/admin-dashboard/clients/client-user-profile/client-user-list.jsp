<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<style>
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
    justify-content: space-between; /* Ensures h2 is on the left and button on the right */
    align-items: center; /* Vertically center h2 and button */
    margin-bottom: 20px;
}

.add-user-btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

thead {
    background-color: #f4f4f4;
}

th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.status-switch {
    display: flex;
    align-items: left;
    justify-content: left;
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

.action-btn  {
    border: none;
    cursor: pointer;
}

</style>

</head>
<body>
<div class="container">
    <div class="header-row">
        <h2>User Profile</h2>
        <button id="addNewUserBtn" class="add-user-btn" onclick="companyAddClientUserPage()">+ Add New User</button>
    </div>
    <table id="userTable" class="display">
        <thead>
            <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Last Login</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="userTableBody">
            <!-- Data will be populated dynamically -->
        </tbody>
    </table>
</div>
<script src="../assets/js/client-user-profile-script.js"></script>
</body>

</html>