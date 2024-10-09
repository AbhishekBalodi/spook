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
        .modal-content {
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="client-add-project-container">
        <h4>Add New Projects</h4>
        <form id="projectForm">
            <div class="row mb-3">
                <div class="col-md-12">
                    <label for="projectName" class="form-label">Project Name *</label>
                    <input type="text" id="projectName" class="form-control" required>
                </div>
                <!-- <div class="col-md-6">
                    <label for="clientName" class="form-label">Client *</label>
                    <input type="text" id="clientName" class="form-control" required>
                </div> -->
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
                        <option value="1">Fixed</option>
                        <option value="2">Monthly</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="status" class="form-label">Status</label>
                    <select id="status" class="form-select">
                        <option value="" disabled selected>Select Status</option>
                        <option value="1">No Started</option>
                        <option value="2">In Progress</option>
                        <option value="3">On Hold</option>
                        <option value="4">Cancelled</option>
                        <option value="5">Completed</option>
                    </select>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="totalRate" class="form-label">Total Rate</label>
                    <input type="number" id="totalRate" class="form-control">
                </div>
                <div class="col-md-6">
                    <label for="estimatedHours" class="form-label">Estimated Hours</label>
                    <input type="number" id="estimatedHours" class="form-control">
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="startDate" class="form-label">Start Date *</label>
                    <input type="date" id="startDate" class="form-control" required>
                </div>
                <div class="col-md-6">
                    <label for="deadline" class="form-label">Deadline</label>
                    <input type="date" id="deadline" class="form-control">
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-12">
                    <label for="members" class="form-label">Members</label>
                    <select id="members" class="form-select" multiple="multiple">
                     <c:forEach var="member" items="${members}">
            				<c:if test="${member.role.roleName != 'ADMIN'}"> 
                			<option value="${member.login.loginId}">${member.name} (${member.email})</option>
                			 </c:if> 
            		</c:forEach>
                    </select>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-12">
                    <label for="description" class="form-label">Description</label>
                    <textarea id="description" class="form-control"></textarea>
                </div>
            </div>

            <div class="form-check custom-checkbox">
                <input class="form-check-input" type="checkbox" id="sendProjectEmail">
                <label class="form-check-label" for="sendProjectEmail">
                    Send project created email
                </label>
            </div>

            <button type="submit" class="btn btn-save">Save</button>
        </form>

        <!-- Success Modal -->
        <div class="modal fade" id="client-add-project-successModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <h4>Success</h4>
                    <p>Project saved successfully!</p>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="companyGetClientProject()">Close</button>
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
            $('#projectForm').on('submit', function(e) {
                e.preventDefault();

                // Collect form data
                let formData = {
                    projectName: $('#projectName').val(),
                    clientName: $('#clientName').val(),
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
                    sendProjectEmail: $('#sendProjectEmail').is(':checked'),
                    clientId: $('#companyIdForDetailsPage').val(),
                };
                
                var csrfToken = $("meta[name='_csrf']").attr("content");
                var csrfHeader = $("meta[name='_csrf_header']").attr("content");
                $.ajaxSetup({
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(csrfHeader, csrfToken);
                    }
                });

                $.ajax({
                    url: '/companyCreateClientProject',
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
            });
        });
    </script>
</body>
</html>
