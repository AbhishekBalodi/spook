<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access Type Management</title>
    <!-- DataTables CSS -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
    <!-- Custom CSS -->
     <link rel="stylesheet" href="../assets/css/access-type-list.css">
</head>
<body>
    <div class="access-type-container">
        <div class="search-container">
            <button class="new-access-btn" onclick="openAddAccessType()">+ New Access Type</button>
        </div>
        <table id="accessTable" class="display" style="width: 100%">
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Access Name</th>
                    <th>No. Users</th>
                    <th>Users Name</th>
                    <th>Action</th>
                </tr>
            </thead>
        </table>
    </div>

    

    

    <!-- Custom JS -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <script src="../assets/js/admin-access-type-list-script.js"></script>
</body>
</html>
