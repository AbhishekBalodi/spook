<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Company Profile</title>
    <style>
	* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background-color: #f9f9f9;
}

.container1 {
    display: flex;
    width: 100%;
    height: 100vh;
    padding:  20px;
}

.sidebar {
    width: 20%;
    background-color: #f3f4f6;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.menu {
    list-style-type: none;
    padding: 0;
}

.menu li {
    margin-bottom: 15px;
}

.menu li a {
    text-decoration: none;
    font-size: 18px;
    color: #333;
    display: block;
    padding: 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.menu li a:hover {
    background-color: #007bff;
    color: white;
    cursor: pointer; 
}

#companyClientDetailsPageRightDiv {
    width: 100%;
    height: 100%;
    display: block;
    box-sizing: border-box; /* Makes sure padding is included within the width/height */
}

	</style>
</head>
<body>
    <div class="container1">
        <!-- Left Menu -->
        <div class="sidebar">
            <ul class="menu">
                <li><a onclick="companyGetClientProfileById()">Client Profile</a></li>
                <li><a onclick="companyGetClientUserProfile()">User Profile</a></li>
                <li><a onclick="companyGetClientProject()">Projects</a></li>
                <li><a onclick="companyGetClientTask()">Tasks</a></li>
                <li><a href="#">Invoices</a></li>
                <li><a href="#">Contracts</a></li>
                <li><a href="#">Credit Notes</a></li>
                <li><a href="#">Reminders</a></li>
                <li><a href="#">Files</a></li>
            </ul>
        </div>

        <!-- Main Content -->
        <div id="companyClientDetailsPageRightDiv" >
            
        </div>
    </div>
     <script src="../assets/js/client-details-script.js"></script>
</body>
</html>
