<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
   <%@ taglib prefix="c" uri="jakarta.tags.core" %>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />
<title>Insert title here</title>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<style>

        
        .loader {
    width: 30px; /* Size of the loader */
    height: 30px; /* Size of the loader */
    border-radius: 50%;
    border: 6px solid #f3f3f3; /* Light gray border */
    border-top: 6px solid #3498db; /* Main color for the spinning part */
    animation: spin 1s linear infinite; /* Animation */
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Subtle shadow */
    display: none; /* Hide by default */
    z-index: 1000; /* Ensure it appears on top */
}

/* Keyframes for spinning animation */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
        
</style>
</head>
<body>
<input type="hidden" name="companyIdForDetailsPage" id="companyIdForDetailsPage">
<input type="hidden" name="clientToDeactivate" id="clientToDeactivate">
<input type="hidden" name="clientToDelete" id="clientToDelete">
<input type="hidden" name="projectToDelete" id="projectToDelete">
<input type="hidden" name="memberToDeactivate" id="memberToDeactivate">
<input type="hidden" name="memberToDelete" id="memberToDelete">
<input type="hidden" name="taskWiseRoleToDelete" id="taskWiseRoleToDelete">
<input type="hidden" name="taskToDelete" id="taskToDelete">
<input type="hidden" name="teamMemberUpdateFlag" id="teamMemberUpdateFlag">

<div id="loader" class="loader"></div>



</body>
</html>