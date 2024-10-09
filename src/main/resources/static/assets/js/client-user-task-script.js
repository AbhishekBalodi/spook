// Example clientId, dynamically set it based on your requirement
var clientId = document.getElementById('companyIdForDetailsPage').value; // You can replace this with the actual client ID dynamically

$('#tasksTable').DataTable({
    ajax: {
        url: '/companyGetClientTaskListData?clientId=' + clientId,  
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
                    <button class="action-btn edit-btn" onclick="editTask(${row.task_id})">✏️</button>
                    <button class="action-btn delete-btn" onclick="deleteTask(${row.task_id})">🗑️</button>`;
            }
        }
    ]
});



function companyAddClientTask(){
	var clientId = document.getElementById('companyIdForDetailsPage').value;
	$.ajax({
        url:'/companyAddClientTaskPage?clientId='+clientId,
        type: "GET",
        success: function (data) {
        	$("#companyClientDetailsPageRightDiv").html(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}
