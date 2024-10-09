<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
   <%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New Project</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css">
    <style>
        .client-add-project-container {
    width: 100%;
    max-width: 95%;
    margin:  auto;
    background: #fff;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: #f3f4f6;
}
        .progress-label {
            margin-left: 10px;
        }
        .select2-container {
            width: 100% !important;
        }
        .custom-checkbox {
            margin-top: 15px;
        }
        .btn-save {
            background-color: #0056b3;
            color: white;
            float: right;
        }
        .btn-update {
            background-color: #0056b3;
            color: white;
            float: right;
        }
        .modal-content {
            padding: 20px;
        }
.back-to-project-list-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.back-to-project-list-btn:hover {
    background-color: #45a049;
}
.back-to-project-list-btn-container {
    display: flex;
    justify-content: space-between;
    margin: 20px;
}
.back-to-project-list-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: auto;
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
    </style>
</head>
<body>
<div class="back-to-project-list-btn-container">
<button class="back-to-project-list-btn" onclick="getProjectListTable()">Project List</button>
</div>
    <div class="client-add-project-container">
        <h4>Add New Project</h4>
        <form id="projectForm">
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="projectName" class="form-label">Project Name *</label>
                    <input type="text" id="projectName" class="form-control" required value="${projectDtls.projectName} ">
                </div>
               <div class="col-md-6">
                    <label for="clientId" class="form-label">Client *</label>
                    <select id="clientId" class="form-select" required>
					    <option value="" disabled selected>Select Client</option>
					    <c:forEach var="client" items="${clientList}">
					        <option value="${client.clientId}" 
					            <c:if test="${client.status == false}">disabled</c:if>
					            <c:if test="${projectDtls.clientId == client.clientId}">selected</c:if>
					        >
					            ${client.clientName} 
					            <c:if test="${client.status == false}"> (Inactive)</c:if>
					        </option>
					    </c:forEach>
					</select>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-12">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="calculateProgress">
                        <label class="form-check-label" for="calculateProgress">
                            Calculate progress through tasks
                        </label>
                    </div>
                </div>
                <div class="col-md-12">
                    <label for="progressRange">Progress</label>
                    <input type="range" id="progressRange" class="form-range" min="0" max="100" value="0">
                    <span class="progress-label">0%</span>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="billingType" class="form-label">Billing Type *</label>
                    <select id="billingType" class="form-select" required>
                        <option value="" disabled selected>Select Billing Type</option>
                        <option value="1" <c:if test="${projectDtls.billingType == 1}">selected</c:if> >Fixed</option>
                        <option value="2" <c:if test="${projectDtls.billingType == 2}">selected</c:if> >Monthly</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="status" class="form-label">Status</label>
                    <select id="status" class="form-select">
                        <option value="" disabled selected>Select Status</option>
                        <option value="1" <c:if test="${projectDtls.status == 1}">selected</c:if>>No Started</option>
                        <option value="2" <c:if test="${projectDtls.status == 2}">selected</c:if>>In Progress</option>
                        <option value="3" <c:if test="${projectDtls.status == 3}">selected</c:if>>On Hold</option>
                        <option value="4" <c:if test="${projectDtls.status == 4}">selected</c:if>>Cancelled</option>
                        <option value="5" <c:if test="${projectDtls.status == 5}">selected</c:if>>Completed</option>
                    </select>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="totalRate" class="form-label">Total Rate</label>
                    <input type="number" id="totalRate" class="form-control" value="${projectDtls.totalRate}">
                </div>
                <div class="col-md-6">
                    <label for="estimatedHours" class="form-label">Estimated Hours</label>
                    <input type="number" id="estimatedHours" class="form-control" value="${projectDtls.estimatedHours}">
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="startDate" class="form-label">Start Date *</label>
                    <input type="date" id="startDate" class="form-control" required value="${projectDtls.startDate}">
                </div>
                <div class="col-md-6">
                    <label for="deadline" class="form-label">Deadline</label>
                    <input type="date" id="deadline" class="form-control" value="${projectDtls.endDate}">
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-12">
                    <label for="members" class="form-label">Members</label>
                    <select id="members" class="form-select" multiple="multiple">
					    <c:forEach var="member" items="${members}">
					        <option value="${member.login.loginId}"
					            <c:if test="${!member.status}">disabled</c:if>
					            <c:forEach var="mapped" items="${mappedTeam}">
					                <c:if test="${mapped.loginId == member.login.loginId}">selected</c:if>
					            </c:forEach>>
					            ${member.name} (${member.email}) <c:if test="${!member.status}">(Inactive)</c:if>
					        </option>
					    </c:forEach>
					</select>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-12">
                    <label for="description" class="form-label">Description</label>
                    <textarea id="description" class="form-control">${projectDtls.description}</textarea>
                </div>
            </div>

            <div class="form-check custom-checkbox">
                <input class="form-check-input" type="checkbox" id="sendProjectEmail">
                <label class="form-check-label" for="sendProjectEmail">
                    Send project created email
                </label>
            </div>
			
            
            <c:choose>
		            <c:when test="${projectDtls.projectId > 0}">
		                <button type="submit" class="btn btn-update" onclick="companyUpdateProjectDetails(${projectDtls.projectId},event)">Update</button>
		            </c:when>
		            <c:otherwise>
		                 <button type="submit" class="btn btn-save" onclick="companySaveProjectDetails(event)">Save</button>
		            </c:otherwise>
        		</c:choose>
        </form>

        <!-- Success Modal -->
        <div class="modal fade" id="client-add-project-successModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <h4>Success</h4>
                    <p>Project saved successfully!</p>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="getProjectListTable()">Close</button>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
    <script>
        $(document).ready(function() {
            // Initialize the multi-select dropdown
            $('#members').select2();
            

            // Update progress value dynamically
            $('#progressRange').on('input', function() {
                $('.progress-label').text($(this).val() + '%');
            });

            // Submit the form via AJAX
            window.companySaveProjectDetails = function(event){debugger;
                event.preventDefault();

                // Collect form data
                let formData = {
                    projectName: $('#projectName').val(),
                    clientId: $('#clientId').val(),
                    calculateProgress: $('#calculateProgress').is(':checked'),
                    progress: $('#progressRange').val(),
                    billingType: $('#billingType').val(),
                    status: $('#status').val(),
                    totalRate: $('#totalRate').val(),
                    estimatedHours: $('#estimatedHours').val(),
                    startDate: $('#startDate').val(),
                    deadline: $('#deadline').val(),
                    members: $('#members').val(),
                    description: $('#description').val(),
                    sendProjectEmail: $('#sendProjectEmail').is(':checked')
                };
                
                var csrfToken = $("meta[name='_csrf']").attr("content");
                var csrfHeader = $("meta[name='_csrf_header']").attr("content");
                $.ajaxSetup({
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(csrfHeader, csrfToken);
                    }
                });

                $.ajax({
                    url: '/companyCreateProject',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(formData),
                    success: function(response) {
                        // Show success modal
                        $('#client-add-project-successModal').modal('show');
                    },
                    error: function() {
                        alert('Failed to save project. Please try again.');
                    }
                });
        }
          window.companyUpdateProjectDetails = function(projectId,event){debugger;
            event.preventDefault();

            // Collect form data
            let formData = {
                projectName: $('#projectName').val(),
                clientId: $('#clientId').val(),
                calculateProgress: $('#calculateProgress').is(':checked'),
                progress: $('#progressRange').val(),
                billingType: $('#billingType').val(),
                status: $('#status').val(),
                totalRate: $('#totalRate').val(),
                estimatedHours: $('#estimatedHours').val(),
                startDate: $('#startDate').val(),
                deadline: $('#deadline').val(),
                members: $('#members').val(),
                description: $('#description').val(),
                sendProjectEmail: $('#sendProjectEmail').is(':checked')
            };
            let disabledMembers = [];
            $('#members option:disabled:selected').each(function() {
                disabledMembers.push($(this).val());
            });

            // Merge disabledMembers into formData.members if there are any
            if (disabledMembers.length > 0) {
                formData.members = formData.members ? formData.members.concat(disabledMembers) : disabledMembers;
            }
            
            var csrfToken = $("meta[name='_csrf']").attr("content");
            var csrfHeader = $("meta[name='_csrf_header']").attr("content");
            $.ajaxSetup({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader(csrfHeader, csrfToken);
                }
            });

            $.ajax({
                url: '/companyUpdateProject?projectId='+projectId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function(response) {
                    // Show success modal
                    $('#client-add-project-successModal').modal('show');
                },
                error: function() {
                    alert('Failed to update project. Please try again.');
                }
            });
    }
            
        });
        
        
    </script>
</body>
</html>
