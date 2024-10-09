// Function to load the client list table
export function getClientListTable() {
    fetch("/companyClientListTable")
        .then(response => response.text())
        .then(result => {
            document.getElementById('adminDashboardRightPanal').innerHTML = result;
        })
        .catch(error => console.error('Error fetching client list:', error));
}

// Function to load the access type table
export function getAccessTypeTable() {
    fetch("/companyAccessTypeListTable")
        .then(response => response.text())
        .then(result => {
            document.getElementById('adminDashboardRightPanal').innerHTML = result;
        })
        .catch(error => console.error('Error fetching access type list:', error));
}

// Function to load the team list table
export function getTeamListTable() {
    fetch("/companyTeamListTable")
        .then(response => response.text())
        .then(result => {
            document.getElementById('adminDashboardRightPanal').innerHTML = result;
        })
        .catch(error => console.error('Error fetching team list:', error));
}

// Function to load the project list table
export function getProjectListTable() {
    fetch("/companyProjectListTable")
        .then(response => response.text())
        .then(result => {
            document.getElementById('adminDashboardRightPanal').innerHTML = result;
        })
        .catch(error => console.error('Error fetching project list:', error));
}

// Function to load the task list table
export function getTaskListTable() {
    fetch("/companyTaskListTable")
        .then(response => response.text())
        .then(result => {
            document.getElementById('adminDashboardRightPanal').innerHTML = result;
        })
        .catch(error => console.error('Error fetching task list:', error));
}

// Function to load the role and task table
export function getRoleAndTaskTable() {
    fetch("/getRoleAndTaskTable")
        .then(response => response.text())
        .then(result => {
            document.getElementById('adminDashboardRightPanal').innerHTML = result;
        })
        .catch(error => console.error('Error fetching role and task list:', error));
}

// Function to handle logout with CSRF token handling
export function logout() {
    const csrfToken = document.querySelector("meta[name='_csrf']").content;
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").content;

    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/login?logout=true';
        } else {
            throw new Error('Failed to log out');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while logging out.");
    });
}
