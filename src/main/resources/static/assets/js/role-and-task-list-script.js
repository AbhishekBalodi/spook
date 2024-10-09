$(document).ready(function() {
    var table = $('#roleAndTaskTable').DataTable({
        ajax: {
            url: '/getRoleAndTaskListData', 
            dataSrc: function (json) {
                return json.data;
            }
        },
        "columns": [
            { data: 'id', render: function (data, type, row, meta) {
                    return meta.row + 1; 
                }
            },
            { "data": "taskWiseRoleName", "render": function(data, type, row) {
                return '<a href="#">' + data + '</a>';
            }},
            { "data": "taskWiseRoleTaskNameCount" },
            { "data": "taskWiseRoleTaskName", 
			    "render": function(data, type, row) {
			        if (Array.isArray(data)) {
			            var users = data.map(function(taskName) {
			                return '<span class="user-tag">' + taskName.trim() + '</span>';
			            });
			            return users.join(' ');
			        } else {
			            return '';
			        }
			    }
			},
            { "data": null, "orderable": false, "render": function(data, type, row) {
                return '<a href="#" class="action-btn edit-btn" onclick="fetchRoleAndTaskDetails(' + row.id + ')">✏️</a>' +
                       '<a href="#" class="action-btn delete-btn" onClick="companyOpenRoleDeleteCnfPopup(' + row.id + ')">🗑️</a>';
            }}
        ],
        "order": [[0, 'asc']]
    });

    $('#search-box').on('keyup', function() {
        table.search(this.value).draw();
    });
});

function openAddRoleAndTask() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/companyOpenAddRoleAndTaskPage",
            success: function(result) {
                $("#adminDashboardRightPanal").html(result);
                resolve(); 
            },
            error: function(xhr, status, error) {
                console.error("Error opening role and task form:", error);
                reject(error); 
            }
        });
    });
}

function fetchRoleAndTaskDetails(id){
	openAddRoleAndTask()
        .then(() => fetchAndPopulateForm(id))
        .catch(error => {
            console.error('Error in opening or populating form:', error);
        });
}

function companyCreateAddRoleAndTask(event){
	event.preventDefault();
	var formElement = document.getElementById("role-and-task-form");
	// Get form values
    let roleName = $('#roleName').val();
    let tasks = [];

	if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return; 
    }
    if (!($('#role-and-task-form .has-error').length === 0)) {
		return;
	}
    // Collect all task input values
    $('input[id^="task"]').each(function() {
        let taskName = $(this).val();
        if (taskName !== '') {
            tasks.push(taskName);
        }
    });

    // Prepare the data payload
    let data = {
        taskWiseRoleName: roleName,
        tasks: tasks
    };

    // Send the AJAX request
    var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
    $.ajax({
        url: '/companyCreateAddRoleAndTask',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            if(response){
				document.getElementById('successMessage').textContent = 'Role and Tasks has been successfully saved!';
            	document.getElementById('successPopup').style.display = "block";
			}else{
				document.getElementById('successMessage').textContent = 'Role and Tasks creation Failed!';
            	document.getElementById('successPopup').style.display = "block";
			}
        },
        error: function(error) {
            // Handle error
            alert("Error saving Role and Tasks: " + error.responseText);
        }
    });
	
}

function companyUpdateRoleAndTask(event,id){
	event.preventDefault();
	var formElement = document.getElementById("role-and-task-form");
	// Get form values
    let roleName = $('#roleName').val();
    let tasks = [];

	if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return; 
    }
    if (!($('#role-and-task-form .has-error').length === 0)) {
		return;
	}
    // Collect all task input values
    $('input[id^="task"]').each(function() {
        let taskName = $(this).val();
        if (taskName !== '') {
            tasks.push(taskName);
        }
    });

    // Prepare the data payload
    let data = {
        taskWiseRoleName: roleName,
        tasks: tasks
    };

    // Send the AJAX request
    var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
    $.ajax({
        url: '/companyUpdateRoleAndTask?taskWiseRoleId='+id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            if(response){
				document.getElementById('successMessage').textContent = 'Role and Tasks has been successfully updated!';
            	document.getElementById('successPopup').style.display = "block";
			}else{
				document.getElementById('successMessage').textContent = 'Role and Tasks updation Failed!';
            	document.getElementById('successPopup').style.display = "block";
			}
        },
        error: function(error) {
            // Handle error
            alert("Error saving Role and Tasks: " + error.responseText);
        }
    });
}

function fetchAndPopulateForm(id) {
        $.ajax({
            url: 'companyGetRoleAndTasksById?taskWiseRoleId='+id,
            type: 'GET',
            success: function(response) {
                const data = response; 

                $('#roleName').val(data.taskWiseRoleName);

                const container = $('#taskFieldsContainer');
                container.empty(); 

                currentFieldsCount = 1; 
                data.tasks.forEach((task, index) => {
                    if (index % 3 === 0) {
                        appendTaskRow(container, index === 0);
                    }
                    $(`#task${index + 1}`).val(task); 
                });
                
                $("#role-and-task-form-save-btn").html('<button type="submit" class="save-btn" onclick="companyUpdateRoleAndTask(event,'+id+');resetFieldCount();">Update</button>');

                // Ensure there are at least 2 additional empty rows if needed
                //if (data.tasks.length % 3 !== 0) {
                //    addTaskFields();
                //}
            },
            error: function(error) {
                console.error('Error fetching role and tasks:', error);
            }
        });
    }


function isDupicateTaskWiseRoleType(){
	var roleName = document.getElementById('roleName').value;
	var roleNameError = document.getElementById('roleNameError');
        $.ajax({
            url: '/isDupicateTaskWiseRoleType',
            type: 'GET',
            data: { roleName: roleName.trim() },
            success: function(response) {
                if (response) {
					roleNameError.textContent = "Role name already exist. Please try another.";
                    roleNameError.style.display = 'block';
                    $('#roleName').closest('.form-group').addClass('has-error');
                } else {
					roleNameError.textContent = "";
                    roleNameError.style.display = 'none';
                    $('#roleName').closest('.form-group').removeClass('has-error');
                }
            },
            error: function() {
                $('#emailError').text('An error occurred.');
            }
        });
}

function companyOpenRoleDeleteCnfPopup(roleId){
	document.getElementById('taskWiseRoleToDelete').value = roleId;
    document.getElementById('deleteConfirmationPopup').style.display = 'block';
}

function companyDeleteTaskWiseRoleById() {
    var taskWiseRoleToDelete = document.getElementById('taskWiseRoleToDelete').value;
	
	var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
	$.ajax({
                url: '/companyTaskWiseRoleDelete', 
                type: 'PUT',                     
                data: { taskWiseRoleToDelete: taskWiseRoleToDelete },     
                success: function(response) {
					getRoleAndTaskTable();
                    if (response) {
                        document.getElementById('deleteConfirmationPopup').style.display = 'none';
                    } else {
                        document.getElementById('deleteConfirmationPopup').style.display = 'none';
                    }
                },
                error: function(error) {
                    console.error('Error:', error);
                    alert('An error occurred while deactivating the role');
                }
            });
}
