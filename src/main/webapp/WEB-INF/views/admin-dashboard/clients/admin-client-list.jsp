<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
   <%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clients List</title>
    <link rel="stylesheet" href="../assets/css/admin-client-list-style.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
</head>
<body>
<c:set var="permissionsList" value="${sessionScope.permissionsList}" />
    <div class="container">
        <div class="stats">
            <div class="stat-item">
                <h2 id="total-clients">0</h2>
                <p>Total Clients</p>
            </div>
            <div class="stat-item">
                <h2 id="active-clients">0</h2>
                <p style="color:green;">Active Clients</p>
            </div>
            <div class="stat-item">
                <h2 id="inactive-clients">0</h2>
                <p style="color:red;">Inactive Clients</p>
            </div>
            <div class="search-add">
            <c:if test="${permissionsList.contains('companyClientCreate')}">
                <button class="add-client-btn" onclick="openAddClientPage();">+ Add New Client</button>
             </c:if>
            </div>
        </div>

        <table id="client-table" class="display">
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Company Name</th>
                    <th>Contact Person</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Data will be populated via AJAX -->
            </tbody>
        </table>
    </div>
<div id="deactivateConfirmationPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="closeDeactivateConfirmationPopup()">&times;</span>
            <p id="deactivateConfirmationMessage">Are you sure?</p>
            <button class="ok-btn" onclick="companyChangeClientStatus()">Yes</button>
        </div>
    </div>
    
    <div id="deleteConfirmationPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="closeDeleteConfirmationPopup()">&times;</span>
            <p id="deleteConfirmationMessage">Are you sure?</p>
            <button class="ok-btn" onclick="companyDeleteClient()">Yes</button>
        </div>
    </div>
    
    <div id="confirmationPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="closeConfirmationPopup()">&times;</span>
            <p id="confirmationPopupMessage"></p>
            <button class="ok-btn" onclick="getClientListTable()">Close</button>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <script src="../assets/js/admin-client-list-script.js"></script>
</body>
</html>
