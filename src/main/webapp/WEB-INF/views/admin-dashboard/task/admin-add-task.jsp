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
        .back-to-task-list-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.back-to-task-list-btn:hover {
    background-color: #45a049;
}
.back-to-task-list-btn-container {
    display: flex;
    justify-content: space-between;
    margin: 20px;
}
.back-to-task-list-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: auto;
}
    </style>
</head>
<body>
<div class="back-to-task-list-btn-container">
<button class="back-to-task-list-btn" onclick="getTaskListTable()">Task List</button>
</div>
    <div class="client-add-task-container">
        <h4>Add New Task</h4>
        <form id="taskForm">
            <div class="row mb-3">
                <div class="col-md-12">
                    <label for="taskName" class="form-label">Subject *</label>
                    <input type="text" id="taskName" class="form-control" required value="${taskDtls.taskName}">
                </div> 
            </div>
            
            <div class="row mb-3">
            <div class="col-md-6">
                    <label for="projectId" class="form-label">Client *</label>
                    <select id="clientId" class="form-select" required onchange="loadProjectByClient()" <c:if test="${taskDtls.taskId > 0}">disabled</c:if>>
					    <option value="" disabled selected>Select Client</option>
					    <c:forEach var="client" items="${clientList}">
					        <option value="${client.clientId}" 
					            <c:if test="${client.status == false}">disabled</c:if>
					            <c:if test="${clientId == client.clientId}">selected</c:if>
					        >
					            ${client.clientName} 
					            <c:if test="${client.status == false}"> (Inactive)</c:if>
					        </option>
					    </c:forEach>
					</select>
                </div>
                
            <div class="col-md-6">
                    <label for="projectId" class="form-label">Project *</label>
                    <select id="projectId" class="form-select" required onchange="loadMembersByProject()">
                        <option value="-1" disabled selected>Select Project</option>
                        <c:forEach var="assignedProject" items="${assignedProjectToClient}">
                			<option value="${assignedProject.projectId}"
                			
                			<c:if test="${projectId == assignedProject.projectId}">selected</c:if>
					        >
					        ${assignedProject.projectName}
                			</option>
            		</c:forEach>
                    </select>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="startDate" class="form-label">Start Date *</label>
                    <input type="date" id="startDate" class="form-control" required value="${taskDtls.startDate}">
                </div>
                <div class="col-md-6">
                    <label for="deadline" class="form-label">Deadline</label>
                    <input type="date" id="deadline" class="form-control" value="${taskDtls.endDate}">
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="priority" class="form-label">Priority</label>
                    <select id="priority" class="form-select" >
                        <option value="-1" disabled selected>Select priority</option>
                        <option value="1" <c:if test="${taskDtls.priority == 1}">selected</c:if>>Urgent</option>
                        <option value="2" <c:if test="${taskDtls.priority == 2}">selected</c:if>>High</option>
                        <option value="3" <c:if test="${taskDtls.priority == 3}">selected</c:if>>Medium</option>
                        <option value="4" <c:if test="${taskDtls.priority == 4}">selected</c:if>>Low</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="status" class="form-label">Status</label>
                    <select id="status" class="form-select">
                        <option value="-1" disabled selected>Select Status</option>
                        <option value="1" <c:if test="${taskDtls.status == 1}">selected</c:if>>No Started</option>
                        <option value="2" <c:if test="${taskDtls.status == 2}">selected</c:if>>In Progress</option>
                        <option value="3" <c:if test="${taskDtls.status == 3}">selected</c:if>>On Hold</option>
                        <option value="4" <c:if test="${taskDtls.status == 4}">selected</c:if>>Cancelled</option>
                        <option value="5" <c:if test="${taskDtls.status == 5}">selected</c:if>>Completed</option>
                    </select>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-12">
                    <label for="members" class="form-label">Members</label>
                    <select id="members" class="form-select" multiple="multiple">
                    <c:forEach var="member" items="${assignedTeam}">
					        <option value="${member.login_id}"
					            <c:if test="${!member.status}">disabled</c:if>
					            <c:forEach var="mapped" items="${mappedTeam}">
					                <c:if test="${mapped.loginId == member.login_id}">selected</c:if>
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
                    <textarea id="description" class="form-control">${taskDtls.description}</textarea>
                </div>
            </div>

            
       <c:choose>
		            <c:when test="${taskDtls.taskId > 0}">
		                <button type="submit" class="btn task-btn-save" id="task-btn-update" onclick="companyUpdateTask(event,${taskDtls.taskId})">Update</button>
		            </c:when>
		            <c:otherwise>
		                 <button type="submit" class="btn task-btn-save" id="task-btn-save" onclick="companyCreateTask(event)">Save</button>
		            </c:otherwise>
        		</c:choose>
        </form>

        <!-- Success Modal -->
        <div class="modal fade" id="client-add-task-successModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <h4>Success</h4>
                    <p>Task saved successfully!</p>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="getTaskListTable()">Close</button>
                </div>
            </div>
        </div>
        
      

    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
    <script>
    
    function loadMembersByProject() {
        var projectId = $('#projectId').val();
        var clientId = $('#clientId').val();
        if (projectId != -1) { 
            
            $.ajax({
                url: '/companyGetAllocatedMemberInProject', 
                type: 'GET',
                data: { projectId: projectId,clientId: clientId  }, 
                success: function(response) {
                    $('#members').empty();
                    let assignedTeam = JSON.parse(response);
                    assignedTeam.forEach(function(user) {
                    	var optionText = user.name + ' (' + user.email + ')';
                        let newOption = new Option(optionText, user.login_id);

                        if (!user.status) {
                            $(newOption).prop('disabled', true);
                        }

                        $('#members').append(newOption);
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
    
    function loadProjectByClient() {
        var clientId = $('#clientId').val();
        if (clientId != -1) { 
            
            $.ajax({
                url: '/companyGetProjectByClient', 
                type: 'GET',
                data: {clientId: clientId  }, 
                success: function(response) {
                	const projectSelect = document.getElementById('projectId');
                	projectSelect.innerHTML = '<option value="-1" disabled selected>Select Project</option>';
                    let assignedProjectToClient = JSON.parse(response);
                    assignedProjectToClient.forEach(function(project) {
                        let option = document.createElement('option');
                        option.value = project.projectId;
                        option.text = project.projectName;
                        projectSelect.appendChild(option);
                    });

                    
                },
                error: function(error) {
                    console.error('Error fetching project:', error);
                    alert('Error fetching project for the selected client.');
                }
            });
        }
    }
    
    
    $(document).ready(function() {
    	$('#members').select2();
        
    });
    
    function companyCreateTask(event){debugger;
            // Prepare form data
            event.preventDefault();
            var formData = {
            		taskName: $('#taskName').val(),
            		clientId: $('#clientId').val(),
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
                url: '/companyCreateTask', 
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

    }
    
    function companyUpdateTask(event,taskId){debugger;
        // Prepare form data
        event.preventDefault();
        var formData = {
        		taskId: taskId,
        		taskName: $('#taskName').val(),
        		clientId: $('#clientId').val(),
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
        let disabledMembers = [];
        $('#members option:disabled:selected').each(function() {
            disabledMembers.push($(this).val());
        });

        // Merge disabledMembers into formData.members if there are any
        if (disabledMembers.length > 0) {
            formData.members = formData.members ? formData.members.concat(disabledMembers) : disabledMembers;
        }
        $.ajaxSetup({
            beforeSend: function(xhr) {
                xhr.setRequestHeader(csrfHeader, csrfToken);
            }
        });
        $.ajax({
            url: '/companyUpdateTask', 
            type: 'PUT',
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

}

    </script>
</body>
</html>
