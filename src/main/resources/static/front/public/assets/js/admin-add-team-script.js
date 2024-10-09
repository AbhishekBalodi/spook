// Function to initialize the form with event listeners
export function initializeForm() {
    document.getElementById('employeeSection').style.display = 'block';
    document.getElementById('freelancerSection').style.display = 'none';
    const updateFlag = document.getElementById('updateFlag').value;

    // Listen for changes in employment type
    document.querySelectorAll('input[name="typeOfEmployment"]').forEach(input => {
        input.addEventListener('change', function() {
            const selectedType = this.value;
            if (selectedType === 'employee') {
                document.getElementById('employeeSection').style.display = 'block';
                document.getElementById('freelancerSection').style.display = 'none';
            } else if (selectedType === 'freelancer') {
                document.getElementById('employeeSection').style.display = 'none';
            }
        });
    });

    // Listen for changes in task-wise role
    document.getElementById('taskWiseRole').addEventListener('change', function() {
        const freelancerRadio = document.getElementById('freelancer');
        const taskWiseRoleId = this.value;
        if (freelancerRadio.checked) {
            document.getElementById('freelancerSection').style.display = 'block';

            // Destroy DataTable if it exists
            if ($.fn.DataTable.isDataTable('#freelancerTable')) {
                $('#freelancerTable').DataTable().clear().destroy();
            }
            document.getElementById('select-all').checked = false;

            // Fetch task-wise role details
            fetch(`/getTaskWiseRoleDetails?taskWiseRoleId=${taskWiseRoleId}`)
                .then(response => response.json())
                .then(data => populateTable(data))
                .catch(() => alert('Failed to load tasks.'));
        }
    });

    // Handle update scenario
    if (updateFlag === 'true') {
        const freelancerRadio = document.getElementById('freelancer');
        const employeeRadio = document.getElementById('employee');

        if (employeeRadio.checked) {
            document.getElementById('employeeSection').style.display = 'block';
            document.getElementById('freelancerSection').style.display = 'none';
        } else if (freelancerRadio.checked) {
            document.getElementById('freelancerSection').style.display = 'block';

            // Destroy the existing DataTable before the new data is populated
            if ($.fn.DataTable.isDataTable('#freelancerTable')) {
                $('#freelancerTable').DataTable().clear().destroy();
            }
            document.getElementById('select-all').checked = false;

            fetch(`/getTaskWiseRoleDetails?taskWiseRoleId=${taskWiseRoleId}`)
                .then(response => response.json())
                .then(data => populateTable(data))
                .catch(() => alert('Failed to load tasks.'));
        }
    }
}

// Function to initialize DataTable
export function initializeDataTable() {
    $('#freelancerTable').DataTable({
        paging: true,  // Enable pagination
        searching: true, // Enable searching
        ordering: false, // Disable column ordering
        destroy: true, // Allow re-initializing table
        language: {
            "emptyTable": "No tasks available"
        }
    });
}

// Function to populate the table with tasks
export function populateTable(tasks) {
    const taskTableBody = document.getElementById('taskTableBody');
    taskTableBody.innerHTML = ''; // Clear previous content

    tasks.forEach((task, index) => {
        const row = `
            <tr>
              <td><input type="checkbox" class="task-checkbox" data-id="${task.taskWiseRoleTaskId}"></td>
              <td>${index + 1}</td>
              <td>${task.taskWiseRoleTaskName}</td>
              <td><input type="number" class="cost-input" min="0" data-id="${task.taskWiseRoleTaskId}" disabled></td>
            </tr>
        `;
        taskTableBody.insertAdjacentHTML('beforeend', row);
    });

    attachCheckboxListeners();
}

// Function to attach cost input listeners
function attachCostInputListeners() {
    document.querySelectorAll('.cost-input').forEach(input => {
        input.addEventListener('input', function() {
            const cost = this.value.trim();
            if (cost !== '' && !isNaN(cost) && parseFloat(cost) >= 0) {
                this.nextElementSibling?.remove(); // Remove error message if valid
            }
        });
    });
}

// Function to attach checkbox listeners
function attachCheckboxListeners() {
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    const selectAllCheckbox = document.getElementById('select-all');

    // Handle select-all checkbox
    selectAllCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        taskCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
            toggleCostInput(checkbox.dataset.id, isChecked);
        });
    });

    // Handle individual task checkboxes
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = taskCheckboxes.length === document.querySelectorAll('.task-checkbox:checked').length;
            selectAllCheckbox.checked = allChecked; // Sync with select-all checkbox
            toggleCostInput(this.dataset.id, this.checked);
        });
    });

    attachCostInputListeners();
}

// Enable or disable cost input based on checkbox state
function toggleCostInput(id, isChecked) {
    const inputField = document.querySelector(`.cost-input[data-id="${id}"]`);
    inputField.disabled = !isChecked;
    inputField.nextElementSibling?.remove(); // Remove error message
    if (!isChecked) {
        inputField.value = ''; // Clear field if unchecked
    }
}

// Function to handle team member creation
export function companyCreateTeamMember(event) {
    event.preventDefault();
    const formElement = document.getElementById('form');
    const formData = new FormData(formElement);

    if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return;
    }

    // Validate cost inputs for selected tasks
    const isValid = validateTaskCosts(formData);

    if (!isValid) {
        return;
    }

    const csrfToken = document.querySelector('meta[name="_csrf"]').content;
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;

    fetch('/companyCreateTeamMember', {
        method: 'POST',
        body: formData,
        headers: {
            [csrfHeader]: csrfToken
        }
    })
        .then(response => response.json())
        .then(result => {
            const successMessage = document.getElementById('successMessage');
            if (result) {
                successMessage.textContent = 'Team member details saved successfully!';
            } else {
                successMessage.textContent = 'Error while saving Team member details!';
            }
            document.getElementById('successModal').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving the team member details.');
        });
}

// Function to validate cost inputs for selected tasks
function validateTaskCosts(formData) {
    let isValid = true;
    document.querySelectorAll('.task-checkbox:checked').forEach(checkbox => {
        const taskId = checkbox.dataset.id;
        const costInput = document.querySelector(`.cost-input[data-id="${taskId}"]`);
        const cost = costInput.value.trim();

        // Remove any previous error messages
        costInput.nextElementSibling?.remove();

        // Validate cost input
        if (cost === '' || isNaN(cost) || parseFloat(cost) < 0) {
            isValid = false;
            costInput.insertAdjacentHTML('afterend', `<span class="error-message" style="color: red;">Cost is mandatory</span>`);
        } else {
            formData.append(`tasks[${taskId}].taskId`, taskId);
            formData.append(`tasks[${taskId}].cost`, cost);
        }
    });

    return isValid;
}

// Event listener for initializing the form when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeForm);
