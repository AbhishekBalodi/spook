// Function to initialize DataTable for tasks
export function initializeTasksTable() {
    document.addEventListener('DOMContentLoaded', () => {
        const clientId = document.getElementById('companyIdForDetailsPage').value;

        $('#tasksTable').DataTable({
            ajax: {
                url: `/companyGetClientTaskListData?clientId=${clientId}`,
                type: 'GET',
                dataSrc: 'tasks'
            },
            columns: [
                { data: 'name' },  // Task name
                { data: 'startDate' },  // Start date
                { data: 'deadline' },  // Deadline
                {
                    data: 'members',
                    render: function (data) {
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
                            <button class="action-btn edit-btn" onclick="editTask(${row.task_id})">✏️</button>
                            <button class="action-btn delete-btn" onclick="deleteTask(${row.task_id})">🗑️</button>`;
                    }
                }
            ]
        });
    });
}

// Function to add a new client task page
export function companyAddClientTask() {
    const clientId = document.getElementById('companyIdForDetailsPage').value;

    fetch(`/companyAddClientTaskPage?clientId=${clientId}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('companyClientDetailsPageRightDiv').innerHTML = data;
        })
        .catch(error => console.error('Error fetching add client task page:', error));
}

// Function to edit a task (placeholder, implement accordingly)
export function editTask(taskId) {
    console.log(`Editing task with ID: ${taskId}`);
    // Implement the logic to open the task editing page or modal
}

// Function to delete a task (placeholder, implement accordingly)
export function deleteTask(taskId) {
    console.log(`Deleting task with ID: ${taskId}`);
    // Implement the logic to delete the task, with a confirmation modal if needed
}
