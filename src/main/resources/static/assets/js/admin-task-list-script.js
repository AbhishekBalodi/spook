$(document).ready(function () {
$('#tasksTable').DataTable({
    ajax: {
        url: '/companyGetTaskListData',  
        type: 'GET',  
        dataSrc: 'tasks' 
    },
    columns: [
        { data: 'name' }, // Task name
        { data: 'startDate' }, // Start date
        { data: 'deadline' }, // Deadline
        { 
            data: 'members', 
            render: function (data, type, row) {
                // Map each member's initials into a span element with the class 'member-circle'
                return data.map(member => `<span class="member-circle">${member}</span>`).join(' '); 
            }
        },
        { data: 'status', render: function (data, type, row) {
                return `<span class="${row.statusClass}">${data}</span>`;
            }
        },
        { data: 'priorityClass', render: function (data, type, row) {
                return `<span class="${data}">${data}</span>`;
            }
        },
        {
            data: null,
            render: function (data, type, row) {
                return `
                    <button class="action-btn edit-btn" onclick="getCompanyTaskDetailsByTaskId(${row.taskId},${row.clientId},${row.projectId})">✏️</button>
                    <button class="action-btn delete-btn" onclick="companyOpenDeleteTaskCnfPopup(${row.taskId})">🗑️</button>`;
            }
        }
    ]
});
});



function companyAddCTask(){
	$.ajax({
        url:'/companyAddTaskPage',
        type: "GET",
        success: function (data) {
        	$("#adminDashboardRightPanal").html(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function getCompanyTaskDetailsByTaskId(taskId,clientId,projectId){
	$.ajax({
                url: '/getCompanyTaskDetailsByTaskId', 
                type: 'GET',
                data: {taskId : taskId, clientId: clientId, projectId: projectId  }, 
                success: function(response) {
                	$("#adminDashboardRightPanal").html(response);
                },
                error: function(error) {
                    console.error('Error fetching Task:', error);
                }
            });
}

function companyOpenDeleteTaskCnfPopup(taskId){
	document.getElementById('taskToDelete').value = taskId;
	document.getElementById('deleteConfirmationPopup').style.display = 'block'
}

function companyDeleteTaskByTaskId(){
	var taskToDelete = document.getElementById('taskToDelete').value;
	
	var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
	$.ajax({
                url: '/companyDeleteTaskById',  
                type: 'PUT',                      
                data: { taskToDelete: taskToDelete },   
                success: function(response) {
					getTaskListTable();
                    if (response) {
                        document.getElementById('deleteConfirmationPopup').style.display = 'none';
                    } else {
                        document.getElementById('deleteConfirmationPopup').style.display = 'none';
                    }
                },
                error: function(error) {
                    console.error('Error:', error);
                    alert('An error occurred while deleting the task');
                }
            });
}
