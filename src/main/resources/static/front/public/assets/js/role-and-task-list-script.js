document.addEventListener('DOMContentLoaded', function () {
    const table = new DataTable('#roleAndTaskTable', {
        ajax: {
            url: '/getRoleAndTaskListData',
            dataSrc: (json) => json.data
        },
        columns: [
            { data: 'id', render: (data, type, row, meta) => meta.row + 1 },
            {
                data: 'taskWiseRoleName',
                render: (data) => `<a href="#">${data}</a>`
            },
            { data: 'taskWiseRoleTaskNameCount' },
            {
                data: 'taskWiseRoleTaskName',
                render: (data) => {
                    if (Array.isArray(data)) {
                        return data.map(taskName => `<span class="user-tag">${taskName.trim()}</span>`).join(' ');
                    }
                    return '';
                }
            },
            {
                data: null,
                orderable: false,
                render: (data, type, row) => `
                    <a href="#" class="action-btn edit-btn" onclick="fetchRoleAndTaskDetails(${row.id})">✏️</a>
                    <a href="#" class="action-btn delete-btn" onclick="companyOpenRoleDeleteCnfPopup(${row.id})">🗑️</a>`
            }
        ],
        order: [[0, 'asc']]
    });

    document.getElementById('search-box').addEventListener('keyup', function () {
        table.search(this.value).draw();
    });
});

async function openAddRoleAndTask() {
    try {
        const response = await fetch('/companyOpenAddRoleAndTaskPage');
        const result = await response.text();
        document.getElementById('adminDashboardRightPanal').innerHTML = result;
    } catch (error) {
        console.error('Error opening role and task form:', error);
    }
}

async function fetchRoleAndTaskDetails(id) {
    try {
        await openAddRoleAndTask();
        fetchAndPopulateForm(id);
    } catch (error) {
        console.error('Error in opening or populating form:', error);
    }
}

function companyCreateAddRoleAndTask(event) {
    event.preventDefault();
    const formElement = document.getElementById('role-and-task-form');
    const roleName = document.getElementById('roleName').value;
    const tasks = Array.from(document.querySelectorAll('input[id^="task"]')).map(taskInput => taskInput.value).filter(taskName => taskName !== '');

    if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return;
    }

    const data = {
        taskWiseRoleName: roleName,
        tasks: tasks
    };

    const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');

    fetch('/companyCreateAddRoleAndTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            const successMessage = document.getElementById('successMessage');
            if (data) {
                successMessage.textContent = 'Role and Tasks has been successfully saved!';
            } else {
                successMessage.textContent = 'Role and Tasks creation Failed!';
            }
            document.getElementById('successPopup').style.display = 'block';
        })
        .catch(error => {
            alert(`Error saving Role and Tasks: ${error}`);
        });
}

function companyUpdateRoleAndTask(event, id) {
    event.preventDefault();
    const formElement = document.getElementById('role-and-task-form');
    const roleName = document.getElementById('roleName').value;
    const tasks = Array.from(document.querySelectorAll('input[id^="task"]')).map(taskInput => taskInput.value).filter(taskName => taskName !== '');

    if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return;
    }

    const data = {
        taskWiseRoleName: roleName,
        tasks: tasks
    };

    const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');

    fetch(`/companyUpdateRoleAndTask?taskWiseRoleId=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            const successMessage = document.getElementById('successMessage');
            if (data) {
                successMessage.textContent = 'Role and Tasks has been successfully updated!';
            } else {
                successMessage.textContent = 'Role and Tasks updation Failed!';
            }
            document.getElementById('successPopup').style.display = 'block';
        })
        .catch(error => {
            alert(`Error saving Role and Tasks: ${error}`);
        });
}

function fetchAndPopulateForm(id) {
    fetch(`/companyGetRoleAndTasksById?taskWiseRoleId=${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('roleName').value = data.taskWiseRoleName;
            const container = document.getElementById('taskFieldsContainer');
            container.innerHTML = '';

            data.tasks.forEach((task, index) => {
                if (index % 3 === 0) {
                    appendTaskRow(container, index === 0);
                }
                document.getElementById(`task${index + 1}`).value = task;
            });

            document.getElementById('role-and-task-form-save-btn').innerHTML = `<button type="submit" class="save-btn" onclick="companyUpdateRoleAndTask(event, ${id});resetFieldCount();">Update</button>`;
        })
        .catch(error => {
            console.error('Error fetching role and tasks:', error);
        });
}

function isDupicateTaskWiseRoleType() {
    const roleName = document.getElementById('roleName').value.trim();
    const roleNameError = document.getElementById('roleNameError');

    fetch(`/isDupicateTaskWiseRoleType?roleName=${roleName}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                roleNameError.textContent = 'Role name already exists. Please try another.';
                roleNameError.style.display = 'block';
                document.getElementById('roleName').closest('.form-group').classList.add('has-error');
            } else {
                roleNameError.textContent = '';
                roleNameError.style.display = 'none';
                document.getElementById('roleName').closest('.form-group').classList.remove('has-error');
            }
        })
        .catch(error => {
            console.error('Error occurred while checking role name:', error);
        });
}

function companyOpenRoleDeleteCnfPopup(roleId) {
    document.getElementById('taskWiseRoleToDelete').value = roleId;
    document.getElementById('deleteConfirmationPopup').style.display = 'block';
}

function companyDeleteTaskWiseRoleById() {
    const taskWiseRoleToDelete = document.getElementById('taskWiseRoleToDelete').value;

    const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');

    fetch('/companyTaskWiseRoleDelete', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: JSON.stringify({ taskWiseRoleToDelete })
    })
        .then(response => response.json())
        .then(data => {
            getRoleAndTaskTable();
            document.getElementById('deleteConfirmationPopup').style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deactivating the role');
        });
}
