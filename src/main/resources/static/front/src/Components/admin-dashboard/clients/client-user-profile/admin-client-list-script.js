// Loader setup function for displaying and hiding loader
function setupLoader() {
    document.getElementById('loader').style.display = 'block';
    return function hideLoader() {
        document.getElementById('loader').style.display = 'none';
    };
}

// Fetching client list data and populating the table
export function initializeClientTable() {
    const totalClients = document.getElementById('total-clients');
    const activeClients = document.getElementById('active-clients');
    const inactiveClients = document.getElementById('inactive-clients');

    const table = $('#client-table').DataTable({
        ajax: {
            url: '/companyClientListData',
            dataSrc: function(json) {
                totalClients.textContent = json.totalClients;
                activeClients.textContent = json.activeClients;
                inactiveClients.textContent = json.inactiveClients;
                return json.data;
            }
        },
        columns: [
            { data: 'id', render: (data, type, row, meta) => meta.row + 1 }, // Auto-increment S.No.
            { data: 'clientName', render: (data, type, row) => `<a href="#" onclick="companyGetClientDetailsPage(${row.clientId})">${data}</a>` },
            { data: 'contactPerson' },
            { data: 'email' },
            { data: 'mobile' },
            { data: 'status', render: (data, type, row) => `
                <div class="status-switch">
                    <input type="checkbox" ${data ? 'checked' : ''} onclick="openDeactivateConfirmationPopup(${row.clientId})" >
                </div>` 
            },
            { data: 'clientId', render: (data, type, row) => `
                <div class="action-icons">
                    <a href="#" class="edit" onclick="companyGetClientDetailsById(${data})">✏️</a>
                    <a href="#" class="edit" onclick="openDeleteConfirmationPopup(${data})">🗑️</a>
                </div>`
            }
        ]
    });
}

// Open Add Client Page function using fetch API
export function openAddClientPage() {
    fetch("/companyOpenAddClientPage")
        .then(response => response.text())
        .then(result => {
            document.getElementById('adminDashboardRightPanal').innerHTML = result;
        })
        .catch(error => console.error('Error:', error));
}

// Close Popup modals
export function closeAddCompanyPopupModal() {
    document.getElementById('addCompanyPopupModal').style.display = 'none';
}

export function closeSuccessPopupModal() {
    document.getElementById('successPopupModal').style.display = 'none';
}

// Get client details by client ID
export function companyGetClientDetailsById(clientId) {
    fetch(`/companyGetClientDetailsById?companyId=${clientId}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('adminDashboardRightPanal').innerHTML = data;
        })
        .catch(error => console.error('Error:', error));
}

// Save Client details using fetch API
export function companySaveClientDetails(event) {
    event.preventDefault();
    const formElement = document.getElementById('addCompanyPageForm');
    
    if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return;
    }
    
    const formData = new FormData(formElement);
    const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
    const csrfToken = document.querySelector("meta[name='_csrf']").getAttribute("content");
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").getAttribute("content");

    fetch('/companySaveClientDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: jsonData
    })
        .then(response => response.json())
        .then(result => {
            const messageElement = document.getElementById('successMessage');
            messageElement.textContent = result ? 'Client details saved successfully!' : 'Error while saving client details!';
            document.getElementById('successPopup').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while saving the client profile.");
        });
}

// Update client details by client ID
export function companyUpdateClientDetails(clientId, event) {
    event.preventDefault();
    const formElement = document.getElementById('addCompanyPageForm');
    
    if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return;
    }

    const formData = new FormData(formElement);
    const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
    const csrfToken = document.querySelector("meta[name='_csrf']").getAttribute("content");
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").getAttribute("content");

    fetch(`/companyUpdateClientDetails?clientId=${clientId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: jsonData
    })
        .then(response => response.json())
        .then(result => {
            const messageElement = document.getElementById('successMessage');
            messageElement.textContent = result ? 'Client details updated successfully!' : 'Error while updating client details!';
            document.getElementById('successPopup').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while updating the client profile.");
        });
}

// Close success popup
export function closeSuccessPopup() {
    document.getElementById('successPopup').style.display = 'none';
    getClientListTable();
}

// Open Deactivate Confirmation Popup
export function openDeactivateConfirmationPopup(clientId) {
    document.getElementById('clientToDeactivate').value = clientId;
    document.getElementById('deactivateConfirmationPopup').style.display = 'block';
}

// Change client status using fetch API
export function companyChangeClientStatus() {
    const clientToDeactivate = document.getElementById('clientToDeactivate').value;
    const csrfToken = document.querySelector("meta[name='_csrf']").getAttribute("content");
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").getAttribute("content");

    fetch('/companyChangeClientStatus', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: JSON.stringify({ clientId: clientToDeactivate })
    })
        .then(() => {
            document.getElementById('deactivateConfirmationPopup').style.display = 'none';
            getClientListTable();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deactivating the client');
        });
}

// Open Delete Confirmation Popup
export function openDeleteConfirmationPopup(clientId) {
    document.getElementById('clientToDelete').value = clientId;
    document.getElementById('deleteConfirmationPopup').style.display = 'block';
}

// Delete client using fetch API
export function companyDeleteClient() {
    document.getElementById('deleteConfirmationPopup').style.display = 'none';
    const clientToDelete = document.getElementById('clientToDelete').value;
    const csrfToken = document.querySelector("meta[name='_csrf']").getAttribute("content");
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").getAttribute("content");

    fetch('/companyDeleteClient', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: JSON.stringify({ clientId: clientToDelete })
    })
        .then(response => response.json())
        .then(result => {
            const messageElement = document.getElementById('confirmationPopupMessage');
            messageElement.textContent = result ? 'Client deleted successfully.' : 'Client deletion failed.';
            document.getElementById('confirmationPopup').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the client');
        });
}
