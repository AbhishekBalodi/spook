// Function to initialize the DataTable for team members
export function initializeTeamTable() {
    $('#teamTable').DataTable({
        ajax: {
            url: '/companyTeamListData',
            dataSrc: ''
        },
        columns: [
            { data: null },  // For S.No.
            { data: 'name' },
            { data: 'email' },
            { data: 'mobile' },
            {
                data: 'status',
                render: function (data, type, row) {
                    return `
                        <div class="status-switch">
                            <input type="checkbox" ${data ? 'checked' : ''} onclick="companyOpenMemberStatusCnfPopup(${row.personLoginId})">
                        </div>`;
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <button class="action-btn edit-btn" onclick="companyGetMemberDetailsById(${row.personLoginId})">✏️</button>
                        <button class="action-btn delete-btn" onclick="companyOpenMemberDeleteCnfPopup(${row.personLoginId})">🗑️</button>`;
                }
            }
        ],
        columnDefs: [{
            targets: 0,
            render: function (data, type, row, meta) {
                return meta.row + 1;  // Add S.No. based on the row index
            }
        }]
    });
}

// Function to open Add Team Member page
export function openAddMemberPage() {
    fetch('/companyOpenAddTeamMemberPage')
        .then(response => response.text())
        .then(result => {
            document.getElementById('adminDashboardRightPanal').innerHTML = result;
        })
        .catch(error => console.error('Error fetching add team member page:', error));
}

// Function to close the Success Modal
export function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Fetch member details by memberLoginId
export function companyGetMemberDetailsById(memberLoginId) {
    fetch(`/companyGetMemberDetailsById?memberLoginId=${memberLoginId}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('adminDashboardRightPanal').innerHTML = data;
        })
        .catch(error => console.error(`Error fetching member details: ${error}`));
}

// Function to delete a team member by memberLoginId
export function companyDeleteMemberById() {
    const memberLoginId = document.getElementById('memberToDelete').value;
    const csrfToken = document.querySelector("meta[name='_csrf']").content;
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").content;

    fetch('/companyDeleteMemberById', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: JSON.stringify({ memberLoginId })
    })
    .then(response => response.json())
    .then(result => {
        if (result) {
            document.getElementById('deleteConfirmationPopup').style.display = 'none';
            getTeamListTable(); // Assuming this function reloads the team table
        } else {
            document.getElementById('deleteConfirmationPopup').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error deleting team member:', error);
        alert('An error occurred while deleting the team member');
    });
}

// Function to change the status of a team member
export function companyChangeMemberStatus() {
    const memberLoginId = document.getElementById('memberToDeactivate').value;
    const csrfToken = document.querySelector("meta[name='_csrf']").content;
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").content;

    fetch('/companyChangeMemberStatus', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: JSON.stringify({ memberLoginId })
    })
    .then(response => response.json())
    .then(result => {
        if (result) {
            document.getElementById('deactivateConfirmationPopup').style.display = 'none';
            getTeamListTable(); // Assuming this function reloads the team table
        } else {
            document.getElementById('deactivateConfirmationPopup').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error changing member status:', error);
        alert('An error occurred while changing the member status');
    });
}

// Open member status confirmation popup
export function companyOpenMemberStatusCnfPopup(memberLoginId) {
    document.getElementById('memberToDeactivate').value = memberLoginId;
    document.getElementById('deactivateConfirmationPopup').style.display = 'block';
}

// Open member delete confirmation popup
export function companyOpenMemberDeleteCnfPopup(memberLoginId) {
    document.getElementById('memberToDelete').value = memberLoginId;
    document.getElementById('deleteConfirmationPopup').style.display = 'block';
}
