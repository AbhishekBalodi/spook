<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
   <%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Page</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
    <style>
/* General Styles */
/* General Styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

.container {
    width: 100%;
    max-width: 90%;
    margin: 50px auto;
    background: #fff;
    padding: 20px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
}

/* Tab Styles */
.tab {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
}

.tab button {
    background-color: #f1f1f1;
    color: black;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 10px 12px;
    transition: 0.3s;
    font-size: 15px;
    margin-right: 5px;
    text-align: left;
}

.tab button:hover {
    background-color: #ddd;
}

.tab button.active {
    background-color: #007bff;
    color: white;
}

/* Tab Content */
.tabcontent {
    display: none;
    padding: 20px 0;
}

/* Form Styles */
form label {
    display: block;
    margin: 10px 0 5px;
    font-weight: bold;
}

form input[type="text"],
form input[type="email"],
form input[type="password"],
form input[type="file"],
form input[type="number"],
form textarea,
form select {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

form textarea {
    height: 80px;
}

form .row {
    display: flex;
    justify-content: space-between;
}

form .column {
    width: 48%;
}

form .button-row {
    display: flex;
    justify-content: flex-end;
}

form .next-button,
form .submit-button,
form .back-button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 10px;
}

/* Success Modal */
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 400px;
    text-align: center;
    border-radius: 8px;
}

.modal-content button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}


.back-to-team-list-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.back-to-team-list-btn:hover {
    background-color: #45a049;
}
.back-to-team-list-btn-container {
    display: flex;
    justify-content: space-between;
    margin: 20px;
}
.back-to-team-list-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: auto;
}
.required {
    		color: red;
    		font-weight: bold;
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

.radio-group {
    display: flex;
    align-items: center;
}

.radio-group input[type="radio"] {
    margin-right: 8px;
}


#freelancerSection .freelancerSection {
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
}

#freelancerSection table {
  width: 100%;
  border: 1px solid #ddd;
  text-align: left;
}

#freelancerSection th, td {
  padding: 10px;
}

#freelancerSection th {
  background-color: #f2f2f2;
}

#freelancerSection input[type="checkbox"] {
  cursor: pointer;
}

#freelancerSection input[type="number"] {
  width: 100px;
  padding: 5px;
}

#freelancerSection button {
  margin: 20px auto;
  display: block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

#freelancerSection button:hover {
  background-color: #0056b3;
}

#freelancerSection input:disabled {
  background-color: #f5f5f5;
}
#freelancerSection th:nth-child(1), 
#freelancerSection td:nth-child(1) {
  width: 2%; /* Width for the first column */
}

#freelancerSection th:nth-child(2), 
#freelancerSection td:nth-child(2) {
  width: 8%; /* Width for the second column */
}

#freelancerSection th:nth-child(3), 
#freelancerSection td:nth-child(3) {
  width: 80%; /* Width for the third column */
}

#freelancerSection th:nth-child(4), 
#freelancerSection td:nth-child(4) {
  width: 10%; /* Width for the fourth column */
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.error-message {
    color: red;
    font-size: 10px;
    display: block;
    font-weight: bold; 
}

</style>
</head>
<body>

<div class="back-to-team-list-btn-container">
<button class="back-to-team-list-btn" onclick="getTeamListTable()">Team List</button>
</div>
<div class="container">
<input type="hidden" id="updateFlag" name="updateFlag" value="${updateFlag}">
    <div class="tab">
        <button class="tablinks" onclick="openTab(event, 'PersonalDetails')" id="defaultOpen">Personal Details</button>
        <button class="tablinks" onclick="openTab(event, 'BankDetails')">Bank Details</button>
        <button class="tablinks" onclick="openTab(event, 'Costing')">Costing</button>
    </div>

    <form id="form">
        <!-- Personal Details Tab -->
        <div id="PersonalDetails" class="tabcontent">

            <label for="name">Name <span class="required">*</span></label>
            <input type="text" id="name" name="name" value="${memberDetails.name}" required>

           
            <div class="row">
                <div class="column">
                    <label for="email">Email <span class="required">*</span></label>
                    
                    <input type="email" id="email" name="email" value="${memberDetails.email}" required>
                </div>
                <div class="column">
                    <label for="mobile">Mobile <span class="required">*</span></label>
                    <input type="text" id="mobile" name="mobile" value="${memberDetails.mobile}" required>
                </div>
            </div>

			<div class="row">
			<div class="column">
            <label for="password">Password <span class="required">*</span></label>
            <input type="password" id="password" name="password" <c:if test="${memberDetails.personId > 0}">disabled</c:if> <c:if test="${!(memberDetails.personId > 0)}">required</c:if>>
            </div>
            <div class="column">
            <label for="role">Access Type <span class="required">*</span></label>
        	<select id="role" name="role" required>
			    <option value="">Select Access Type</option>
			    <c:forEach var="role" items="${roles}">
			        <c:if test="${!role.isClientRole && role.roleName != 'ADMIN'}">
			            <option value="${role.roleId}" 
			                    <c:if test="${role.roleId == memberDetails.role.roleId}">selected</c:if>>
			                ${role.roleName}
			            </option>
			        </c:if>
			    </c:forEach>
			</select>
            </div>
 			</div>
            <div class="row">
                <div class="column">
                    <label for="additionalEmail">Additional Email</label>
                    <input type="email" id="additionalEmail" value="${memberDetails.additionalEmail}" name="additionalEmail">
                </div>
                <div class="column">
                    <label for="additionalMobile">Additional Mobile</label>
                    <input type="text" id="additionalMobile" value="${memberDetails.additionalMobile}" name="additionalMobile">
                </div>
            </div>

            <label for="address">Address <span class="required">*</span></label>
            <textarea id="address" name="address" required>${memberDetails.address}</textarea>

            

			
            <!-- <label for="profilePicture">Profile Picture</label>
            <input type="file" id="profilePicture" name="profilePicture"> -->

            <button type="button" class="next-button" onclick="openTab(event, 'BankDetails')">Next</button>
        </div>
        
        

        <!-- Bank Details Tab -->
        <div id="BankDetails" class="tabcontent">

            <div class="row">
                <div class="column">
                    <label for="accountHolderName">Account Holder Name <span class="required">*</span></label>
                    <input type="text" id="accountHolderName" name="accountHolderName" value="${memberDetails.accountHolderName}" required>
                </div>
                <div class="column">
                    <label for="bankName">Bank Name <span class="required">*</span></label>
                    <input type="text" id="bankName" name="bankName" value="${memberDetails.bankName}" required>
                </div>
            </div>

            <div class="row">
                <div class="column">
                    <label for="accountNumber">Account Number <span class="required">*</span></label>
                    <input type="text" id="accountNumber" name="accountNumber" value="${memberDetails.accountNumber}" required>
                </div>
                <div class="column">
                    <label for="ifscCode">IFSC Code <span class="required">*</span></label>
                    <input type="text" id="ifscCode" name="ifscCode" value="${memberDetails.ifscCode}" required>
                </div>
            </div>

            <label for="bankBranch">Bank Branch</label>
            <input type="text" id="bankBranch" name="bankBranch" value="${memberDetails.branchName}">

            <button type="button" class="back-button" onclick="openTab(event, 'PersonalDetails')">Back</button>
            <button type="button" class="next-button" onclick="openTab(event, 'Costing')">Next</button>
            
            
        </div>
        
        <div id="Costing" class="tabcontent">

           
                    <label for="typeOfEmployment">Type of Employment <span class="required">*</span></label>
					<div class="radio-group">
					    <input type="radio" id="employee" name="typeOfEmployment" value="employee" 
					        <c:choose>
					            <c:when test="${memberDetails.typeOfEmployment == 'employee' or empty memberDetails.typeOfEmployment}">
					                checked
					            </c:when>
					        </c:choose>
					    >
					    <label for="employee">Employee</label>
					
					    <input type="radio" id="freelancer" name="typeOfEmployment" value="freelancer" 
					        <c:choose>
					            <c:when test="${memberDetails.typeOfEmployment == 'freelancer'}">
					                checked
					            </c:when>
					        </c:choose>
					    >
					    <label for="freelancer">Freelancer</label>
					</div>
                
			
                    <label for="role">Role <span class="required">*</span></label>
                    <select id="taskWiseRole" name="taskWiseRole" required>
                    <option value="" disabled selected>Select Role</option>
                        <c:forEach var="taskWiseRole" items="${taskWiseRoles}">
			            <option value="${taskWiseRole.taskWiseRoleId}" 
			                     <c:if test="${taskWiseRole.taskWiseRoleId == memberDetails.designation}">selected</c:if>>
			                ${taskWiseRole.taskWiseRoleName}
			            </option>
			    </c:forEach>
                    </select>
                

                
                    <div id="employeeSection">
					    <label for="salary-package">Salary Package <span class="required">*</span></label>
					    <input type="number" id="ctc" name="ctc" placeholder="000"  value="${memberDetails.ctc}">
					
					    <label for="expertise">Expertise <span class="required">*</span></label>
					    <textarea id="expertise" name="expertise" > ${memberDetails.expertise}</textarea>
					</div>
					
					
					
					<div id="freelancerSection" style="display:none;">
					   <table id="freelancerTable"  class="display">
					      <thead>
					        <tr>
					          <th class="no-sort"><input type="checkbox" id="select-all"></th>
					          <th>S.No.</th>
					          <th>Type of Task</th>
					          <th>Cost</th>
					        </tr>
					      </thead>
					      <tbody id="taskTableBody">
					        <!-- Rows will be populated dynamically using AJAX -->
					      </tbody>
					    </table>
					  </div>
            

            <button type="button" class="back-button" onclick="openTab(event, 'BankDetails')">Back</button>
            <c:choose>
		            <c:when test="${memberDetails.personId > 0}">
		                <button type="submit" class="submit-button" onclick="companyUpdateTeamMember(${memberDetails.login.loginId},event)">Update</button>
		            </c:when>
		            <c:otherwise>
		                 <button type="submit" class="submit-button" onclick="companyCreateTeamMember(event)">Submit</button>
		            </c:otherwise>
        		</c:choose>
        </div>
    </form>
</div>

<!-- Success Modal -->
<div id="successModal" class="popup">
        <div class="modal-content">
            <span class="close" onclick="getTeamListTable()">&times;</span>
            <p id="successMessage"></p>
            <button class="ok-btn" onclick="getTeamListTable()">OK</button>
        </div>
    </div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
<script src="../assets/js/admin-add-team-script.js"></script>
</body>
</html>
