<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team List</title>
    <link rel="stylesheet" href="../assets/css/admin-team-list-style.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
</head>
<body>
    <div class="team-list-container">
        <div class="search-container">
            <button class="new-team-member-btn" onclick="openAddMemberPage()">+ New Team Member</button>
        </div>
        <table id="teamTable" class="display" style="width: 100%">
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
        </table>
    </div>

    

    <!-- Success Message Modal -->
    <div id="successModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeSuccessModal()">&times;</span>
            <p id="successMessage">Team member added successfully!</p>
            <button onclick="closeSuccessModal()">OK</button>
        </div>
    </div>
    
    <div id="deactivateConfirmationPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="document.getElementById('deactivateConfirmationPopup').style.display = 'none';getTeamListTable()">&times;</span>
            <p id="deactivateConfirmationMessage">Are you sure?</p>
            <button class="ok-btn" onclick="companyChangeMemberStatus()">Yes</button>
        </div>
    </div>
    
    <div id="deleteConfirmationPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="document.getElementById('deleteConfirmationPopup').style.display = 'none'">&times;</span>
            <p id="deleteConfirmationMessage">Are you sure?</p>
            <button class="ok-btn" onclick="companyDeleteMemberById()">Yes</button>
        </div>
    </div>
    
    <div id="confirmationPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="document.getElementById('confirmationPopup').style.display = 'none'">&times;</span>
            <p id="confirmationPopupMessage"></p>
            <button class="ok-btn" onclick="getTeamListTable()">Close</button>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <script src="../assets/js/admin-team-list-script.js"></script>
</body>
</html>