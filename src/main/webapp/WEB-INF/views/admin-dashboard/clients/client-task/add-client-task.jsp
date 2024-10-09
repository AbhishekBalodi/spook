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
        .client-add-task-container {
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
        .task-btn-save {
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
    <div class="client-add-task-container">
        <h4>Add New Task</h4>
        <form id="taskForm">
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="taskName" class="form-label">Subject *</label>
                    <input type="text" id="taskName" class="form-control" required>
                </div>
                <div class="col-md-6">
                    <label for="projectId" class="form-label">Project *</label>
                    <select id="projectId" class="form-select" required onchange="loadMembersByProject()">
                        <option value="-1" disabled selected>Select Project</option>
                        <c:forEach var="assignedProject" items="${assignedProjects}">
                			<option value="${assignedProject.projectId}">${assignedProject.projectName}</option>
            		</c:forEach>
                    </select>
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
                <div class="col-md-6">
                    <label for="priority" class="form-label">Priority</label>
                    <select id="priority" class="form-select" >
                        <option value="-1" disabled selected>Select priority</option>
                        <option value="1">Urgent</option>
                        <option value="2">High</option>
                        <option value="1">Medium</option>
                        <option value="2">Low</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="status" class="form-label">Status</label>
                    <select id="status" class="form-select">
                        <option value="-1" disabled selected>Select Status</option>
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
                    <label for="members" class="form-label">Members</label>
                    <select id="members" class="form-select" multiple="multiple">
                    </select>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-12">
                    <label for="description" class="form-label">Description</label>
                    <textarea id="description" class="form-control"></textarea>
                </div>
            </div>

            <button type="submit" class="btn task-btn-save" id="task-btn-save">Save</button>
        </form>

        <!-- Success Modal -->
        <div class="modal fade" id="client-add-task-successModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <h4>Success</h4>
                    <p>Task saved successfully!</p>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="companyGetClientTask()">Close</button>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
    <script>
    
    function loadMembersByProject() {
        var projectId = $('#projectId').val();
        var clientId = document.getElementById('companyIdForDetailsPage').value;
        if (projectId != -1) { 
            
            $.ajax({
                url: '/companyGetMembersByProject', 
                type: 'GET',
                data: { projectId: projectId,clientId: clientId  }, 
                success: function(response) {
                    $('#members').empty();
                    let assignedTeam = JSON.parse(response);
                    assignedTeam.forEach(function(user) {
                        $('#members').append(new Option(
                            user.name , 
                            user.login_id 
                        ));
                    });

                    $('#members').select2();
                },
                error: function(error) {
                    console.error('Error fetching members:', error);
                    alert('Error fetching members for the selected project.');
                }
            });
        }
    }
    
    $(document).ready(function() {
    	$('#members').select2();
        $('#task-btn-save').on('click', function(e) {debugger
            // Prepare form data
            e.preventDefault();
            var formData = {
            		taskName: $('#taskName').val(),
            		projectId: $('#projectId').val(),
            		startDate: $('#startDate').val(),
            		deadline: $('#deadline').val(),
            		priority: $('#priority').val(),
            		status: $('#status').val(),
            		members: $('#members').val(),  // Get multi-select values
            		description: $('#description').val()
            };

            var csrfToken = $("meta[name='_csrf']").attr("content");
            var csrfHeader = $("meta[name='_csrf_header']").attr("content");
            $.ajaxSetup({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader(csrfHeader, csrfToken);
                }
            });
            $.ajax({
                url: '/companyCreateClientTask', 
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function(response) {
                    // Show success popup
                	$('#client-add-task-successModal').modal('show');
                },
                error: function(error) {
                    alert('Error saving task');
                }
            });
        });

    });

    </script>
</body>
</html>
