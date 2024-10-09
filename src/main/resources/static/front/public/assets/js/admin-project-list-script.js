// Function to initialize the project table
export function initializeProjectsTable() {
    const projectsTable = $('#projectsTable').DataTable(); // Assuming you're using DataTables
    const loader = document.getElementById('loader');

    // Fetch project data and update status summary
    fetch('/companyGetProjectListData')
        .then(response => response.json())
        .then(data => {
            // Update status summary
            document.getElementById('noStarted').textContent = data.statusSummary.noStarted;
            document.getElementById('inProgress').textContent = data.statusSummary.inProgress;
            document.getElementById('onHold').textContent = data.statusSummary.onHold;
            document.getElementById('cancelled').textContent = data.statusSummary.cancelled;
            document.getElementById('completed').textContent = data.statusSummary.completed;

            // Populate table with project data
            data.projects.forEach(function(project) {
                const members = project.members.map(member => `<span class="member-circle">${member}</span>`).join(' ');
                const actions = `
                    <div class="action-buttons">
                        <span class="edit-btn" onclick="companyFetchProjectDetailsById(${project.projectId})">✏️</span>
                        <span class="delete-btn" onclick="companyOpenDeleteCnfPopup(${project.projectId})">🗑️</span>
                    </div>
                `;
                projectsTable.row.add([
                    project.name,
                    project.startDate,
                    project.deadline,
                    members,
                    `<span class="${project.statusClass}">${project.status}</span>`,
                    actions
                ]).draw();
            });
        })
        .catch(error => console.error('Error fetching project list data:', error))
        .finally(() => {
            loader.style.display = 'none';
        });
}

// Function to open Add Project page
export function companyAddProject() {
    fetch('/companyAddProjectPage')
        .then(response => response.text())
        .then(data => {
            document.getElementById('adminDashboardRightPanal').innerHTML = data;
        })
        .catch(error => console.error('Error fetching add project page:', error));
}

// Function to fetch project details by project ID
export function companyFetchProjectDetailsById(projectId) {
    fetch(`/companyFetchprojectDetailsById?projectId=${projectId}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('adminDashboardRightPanal').innerHTML = data;
        })
        .catch(error => console.error('Error fetching project details:', error));
}

// Function to open delete confirmation popup
export function companyOpenDeleteCnfPopup(projectId) {
    document.getElementById('projectToDelete').value = projectId;
    document.getElementById('deleteConfirmationPopup').style.display = 'block';
}

// Function to delete a project by project ID
export function companyDeleteProjectById() {
    const projectId = document.getElementById('projectToDelete').value;
    const csrfToken = document.querySelector("meta[name='_csrf']").getAttribute("content");
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").getAttribute("content");

    fetch(`/companyDeleteProjectById?projectId=${projectId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        }
    })
    .then(response => response.json())
    .then(result => {
        const messageElement = document.getElementById('confirmationPopupMessage');
        if (result) {
            messageElement.textContent = 'Project deleted successfully!';
        } else {
            messageElement.textContent = 'Error while deleting project!';
        }
        document.getElementById('confirmationPopup').style.display = 'block';
    })
    .catch(error => {
        console.error('Error deleting project:', error);
    });
}
