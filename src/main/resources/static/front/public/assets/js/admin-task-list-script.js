// Function to initialize the tasks table with DataTables and fetch data
export function initializeTasksTable() {
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
                render: function (data) {
                    // Map each member's initials into a span element with the class 'member-circle'
                    return data.map(member => `<span class="member-circle">${member}</span>`).join(' ');
                }
            },
            {
                data: 'status',
                render: function (data, type, row) {
                    return `<span class="${row.statusClass}">${data}</span>`;
                }
            },
            {
                data: 'priorityClass',
                render: function (data) {
                    return `<span class="${data}">${data}</span>`;
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <button class="action-btn edit-btn" onclick="getCompanyTaskDetailsByTaskId(${row.taskId}, ${row.clientId}, ${row.projectId})">✏️</button>
                        <button class="action-btn delete-btn" onclick="companyOpenDeleteTaskCnfPopup(${row.taskId})">🗑️</button>
                    `;
                }
            }
        ]
    });
}

// Function to open Add Task page
export function companyAddTask() {
    fetch('/companyAddTaskPage')
        .then(response => response.text())
        .then(data => {
            document.getElementById('adminDashboardRightPanal').innerHTML = data;
        })
        .catch(error => console.error('Error fetching add task page:', error));
}

// Function to fetch task details by task ID
export function getCompanyTaskDetailsByTaskId(taskId, clientId, projectId) {
    const params = new URLSearchParams({ taskId, clientId, projectId });

    fetch(`/getCompanyTaskDetailsByTaskId?${params.toString()}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('adminDashboardRightPanal').innerHTML = data;
        })
        .catch(error => console.error('Error fetching task details:', error));
}

// Function to open delete confirmation popup
export function companyOpenDeleteTaskCnfPopup(taskId) {
    document.getElementById('taskToDelete').value = taskId;
    document.getElementById('deleteConfirmationPopup').style.display = 'block';
}

// Function to delete task by task ID
export function companyDeleteTaskByTaskId() {
    const taskToDelete = document.getElementById('taskToDelete').value;
    const csrfToken = document.querySelector("meta[name='_csrf']").getAttribute("content");
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").getAttribute("content");

    fetch('/companyDeleteTaskById', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: JSON.stringify({ taskToDelete })
    })
    .then(response => response.json())
    .then(result => {
        if (result) {
            document.getElementById('deleteConfirmationPopup').style.display = 'none';
            getTaskListTable(); // Assuming this function reloads the task list
        } else {
            document.getElementById('deleteConfirmationPopup').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error deleting task:', error);
        alert('An error occurred while deleting the task');
    });
}
