// Import necessary dependencies (assuming you have jQuery and DataTables as modules)
import $ from 'jquery';
import 'datatables.net'; // Assuming you're using DataTables from npm
import 'datatables.net-dt'; 
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

// Function to initialize DataTable and search functionality
export function initializeDataTable() {
    const table = $('#accessTable').DataTable({
        ajax: {
            url: '/companyAccessTypeData',
            dataSrc: function (json) {
                return json.data;
            }
        },
        columns: [
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return meta.row + 1; 
                }
            },
            {
                data: 'roleName',
                render: function(data) {
                    return `<a href="#">${data}</a>`;
                }
            },
            { data: 'userCount' },
            {
                data: 'personNames',
                render: function(data) {
                    const users = data.replace(/[\[\]]/g, '').split(',').map(user => 
                        `<span class="user-tag">${user.trim()}</span>`
                    );
                    return users.join(' ');
                }
            },
            {
                data: null,
                orderable: false,
                render: function() {
                    return `
                        <a href="#" class="action-btn edit-btn">✏️</a>
                        <a href="#" class="action-btn delete-btn">🗑️</a>
                    `;
                }
            }
        ],
        order: [[0, 'asc']]
    });

    // Search functionality
    $('#search-box').on('keyup', function() {
        table.search(this.value).draw();
    });
}

// Function to open Add Access Type
export function openAddAccessType() {
    $.ajax({
        url: "/companyOpenAddAccessTypePage",
        success: function(result) {
            $("#adminDashboardRightPanal").html(result);
        }
    });
}

// Function to create Access Type
export function companyCreateAccessType(event) {
    event.preventDefault();
	const roleNameError = document.getElementById('roleNameError');

    const successPopupWrapper = document.getElementById("successPopup");
    const roleName = document.getElementById('roleName').value;
    const selectedPermissions = [];
    const formElement = document.getElementById("access-form");

    document.querySelectorAll('input[name="permissions"]:checked').forEach(checkbox => {
        selectedPermissions.push(checkbox.value);
    });

    if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return;
    }

    if (!($('#access-form .has-error').length === 0)) {
        document.getElementById("roleName").scrollIntoView();
        return;
    }

    if (!roleName.trim().length) {
        roleNameError.textContent = "Access name should not be blank.";
        roleNameError.style.display = 'block';
        $('#roleName').closest('.form-group').addClass('has-error');
        document.getElementById("roleName").scrollIntoView();
        return;
    }

    if (selectedPermissions.length === 0) {
        alert("Please select permissions.");
        return;
    }

    const roleData = {
        roleName: roleName.trim(),
        permissions: selectedPermissions
    };

    const csrfToken = $("meta[name='_csrf']").attr("content");
    const csrfHeader = $("meta[name='_csrf_header']").attr("content");

    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });

    $.ajax({
        url: '/companyCreateAccessType',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(roleData),
        success: function(response) {
            document.getElementById('successMessage').textContent = response 
                ? 'Access type has been successfully saved!' 
                : 'Access type creation failed!';
            successPopupWrapper.style.display = "block";
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

export function getAccessTypeTable() {
    // Assuming you're using an API to fetch the table data
    axios.get('/companyAccessTypeData')
        .then(response => {
            const data = response.data.data;  // Adjust if your data format is different
            const tableBody = document.getElementById('accessTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';  // Clear previous rows

            data.forEach((item, index) => {
                const newRow = tableBody.insertRow();
                const cell1 = newRow.insertCell(0);
                const cell2 = newRow.insertCell(1);
                const cell3 = newRow.insertCell(2);
                const cell4 = newRow.insertCell(3);
                const cell5 = newRow.insertCell(4);

                cell1.innerHTML = index + 1;
                cell2.innerHTML = item.roleName;
                cell3.innerHTML = item.userCount;
                cell4.innerHTML = item.personNames.join(', ');
                cell5.innerHTML = `<button>Edit</button> <button>Delete</button>`;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


// Function to close the success popup
export function closeAddAccessTypeSuccessPopup() {
    const successPopupWrapper = document.getElementById("successPopup");
    successPopupWrapper.style.display = "none";
    getAccessTypeTable(); // Assuming this is defined elsewhere
}

// Function to check for duplicate Access Type
export function isDuplicateAccessType() {
    const roleName = document.getElementById('roleName').value;
    const roleNameError = document.getElementById('roleNameError');

    $.ajax({
        url: '/isDupicateAccessType',
        type: 'GET',
        data: { roleName: roleName.trim() },
        success: function(response) {
            if (response) {
                roleNameError.textContent = "Access name already exists. Please try another.";
                roleNameError.style.display = 'block';
                $('#roleName').closest('.form-group').addClass('has-error');
            } else {
                roleNameError.textContent = "";
                roleNameError.style.display = 'none';
                $('#roleName').closest('.form-group').removeClass('has-error');
            }
        },
        error: function() {
            $('#emailError').text('An error occurred.');
        }
    });
}

// Initialize DataTable on document ready
document.addEventListener('DOMContentLoaded', initializeDataTable);
