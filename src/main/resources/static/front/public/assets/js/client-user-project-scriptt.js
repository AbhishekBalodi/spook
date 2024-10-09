// Function to initialize DataTable and load project data
export function initializeProjectsTable() {
    document.addEventListener('DOMContentLoaded', () => {
        const clientId = document.getElementById('companyIdForDetailsPage').value;
        const projectsTable = $('#projectsTable').DataTable(); // Assuming you're using DataTables

        // Fetch project data
        fetch(`/companyGetClientProjectListData?clientId=${clientId}`)
            .then(response => response.json())
            .then(data => {
                // Update status summary
                document.getElementById('noStarted').textContent = data.statusSummary.noStarted;
                document.getElementById('inProgress').textContent = data.statusSummary.inProgress;
                document.getElementById('onHold').textContent = data.statusSummary.onHold;
                document.getElementById('cancelled').textContent = data.statusSummary.cancelled;
                document.getElementById('completed').textContent = data.statusSummary.completed;

                // Populate the table with project data
                data.projects.forEach(project => {
                    const members = project.members.map(member => `<span class="member-circle">${member}</span>`).join(' ');
                    const actions = `
                        <div class="action-buttons">
                            <span class="edit-btn">✏️</span>
                            <span class="delete-btn">🗑️</span>
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
            .catch(error => console.error('Error fetching project list:', error));
    });
}

// Function to add a new client project page
export function companyAddClientProject() {
    fetch('/companyAddClientProjectPage')
        .then(response => response.text())
        .then(data => {
            document.getElementById('companyClientDetailsPageRightDiv').innerHTML = data;
        })
        .catch(error => console.error('Error fetching add client project page:', error));
}
