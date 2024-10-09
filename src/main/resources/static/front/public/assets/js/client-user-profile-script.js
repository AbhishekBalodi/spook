// Initialize DataTable when the document is ready
export function initializeUserTable() {
    document.addEventListener('DOMContentLoaded', () => {
        const clientId = document.getElementById('companyIdForDetailsPage').value;
        $('#userTable').DataTable({
            ajax: {
                url: `/companyClientTeamListData?clientId=${clientId}`,
                dataSrc: ''
            },
            columns: [
                { data: 'name' },
                { data: 'email' },
                { data: 'mobile' },
                { data: 'last_login' },
                {
                    data: 'status',
                    render: function (data, type, row) {
                        return `
                            <div class="status-switch">
                                <input type="checkbox" ${data ? 'checked' : ''}>
                            </div>`;
                    }
                },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <button class="action-btn edit-btn" onclick="editUser(${row.id})">✏️</button>
                            <button class="action-btn delete-btn" onclick="deleteUser(${row.id})">🗑️</button>`;
                    }
                }
            ]
        });
    });
}

// Close success modal and reload client user profile
export function closeSuccessModal() {
    document.getElementById("confirmationPopup1").style.display = "none";
    companyGetClientUserProfile(); // Assuming this reloads the user profile data
}

// Fetch Add Client User Page and display it
export function companyAddClientUserPage() {
    fetch('/companyAddClientUserPage')
        .then(response => response.text())
        .then(data => {
            document.getElementById("companyClientDetailsPageRightDiv").innerHTML = data;
        })
        .catch(error => console.error(`Error fetching add client user page: ${error}`));
}

// Create a new client user
export function createNewClientUser(event) {
    event.preventDefault();
    const successPopupWrapper = document.getElementById("confirmationPopup1");
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        designation: document.getElementById('designation').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        password: document.getElementById('password').value,
        primaryUser: document.querySelector('input[name="primaryUser"]').checked,
        noWelcomeEmail: document.querySelector('input[name="noWelcomeEmail"]').checked,
        setPasswordEmail: document.querySelector('input[name="setPasswordEmail"]').checked,
        clientId: document.getElementById('companyIdForDetailsPage').value,
        userPermissions: Array.from(document.querySelectorAll('input[name="userPermissions"]:checked')).map(input => input.value)
    };

    const csrfToken = document.querySelector("meta[name='_csrf']").content;
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").content;

    fetch('/companyCreateClientUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            successPopupWrapper.style.display = "block";
        } else {
            throw new Error('Error while adding the user');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while adding the user.');
    });
}
