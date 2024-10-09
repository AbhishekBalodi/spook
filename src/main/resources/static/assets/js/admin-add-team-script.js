
$(document).ready(function() {debugger;

    $('#employeeSection').show();
    $('#freelancerSection').hide();
	var updateFlag = document.getElementById('updateFlag').value;

    $('input[name="typeOfEmployment"]').change(function() {debugger;
        var selectedType = $(this).val();
        if (selectedType === 'employee') {

            $('#employeeSection').show();
            $('#freelancerSection').hide();
        } else if (selectedType === 'freelancer') {

            $('#employeeSection').hide();
        }
    });
    
    $('#taskWiseRole').change(function() {
        const freelancerRadio = document.getElementById('freelancer');
        var taskWiseRoleId = document.getElementById('taskWiseRole').value;
        if  (freelancerRadio.checked) {
            $('#freelancerSection').show();

	        if ($.fn.DataTable.isDataTable('#freelancerTable')) {
	            $('#freelancerTable').DataTable().clear().destroy();
	        }
	        $('#select-all').prop('checked', false);
		    $.ajax({
		      url: '/getTaskWiseRoleDetails?taskWiseRoleId='+taskWiseRoleId, 
		      type: 'GET',
		      success: function (response) {
		        populateTable(response);
		        //initializeDataTable();
		      },
		      error: function () {
		        alert('Failed to load tasks.');
		      }
		    });
        }
    });
    
    if(updateFlag == "true"){debugger;
		const freelancerRadio = document.getElementById('freelancer');
		const employeeRadio = document.getElementById('employee');
        if (employeeRadio.checked) {
            // Show employee section and hide freelancer section
            $('#employeeSection').show();
            $('#freelancerSection').hide();
        } else if (freelancerRadio.checked) {
            // Show freelancer section and hide employee section
            $('#employeeSection').hide();
        }
        
        
        
        var taskWiseRoleId = document.getElementById('taskWiseRole').value;
        if  (freelancerRadio.checked) {
            $('#freelancerSection').show();
            // Destroy the existing DataTable before the new data is populated
	        if ($.fn.DataTable.isDataTable('#freelancerTable')) {
	            $('#freelancerTable').DataTable().clear().destroy(); // Clear existing data and destroy
	        }
	        $('#select-all').prop('checked', false);
		    $.ajax({
		      url: '/getTaskWiseRoleDetails?taskWiseRoleId='+taskWiseRoleId, 
		      type: 'GET',
		      success: function (response) {
		        populateTable(response);
		        //initializeDataTable();
		      },
		      error: function () {
		        alert('Failed to load tasks.');
		      }
		    });
        }
	}
    
    
});

function initializeDataTable() {
    $('#freelancerTable').DataTable({
      paging: true,  // Enable pagination
      searching: true, // Enable column-based sorting
      
      ordering: false, 
      destroy: true, 
      language: {
        "emptyTable": "No tasks available"
      }
    });
  }

  function populateTable(tasks) {debugger;
    const taskTableBody = $('#taskTableBody');
    taskTableBody.empty(); // Clear previous table content
    tasks.forEach((task, index) => {
      const row = `
        <tr>
          <td><input type="checkbox" class="task-checkbox" data-id="${task.taskWiseRoleTaskId}"></td>
          <td>${index + 1}</td>
          <td>${task.taskWiseRoleTaskName}</td>
          <td><input type="number" class="cost-input" min="0" data-id="${task.taskWiseRoleTaskId}" disabled></td>
        </tr>
      `;
      taskTableBody.append(row);
    });

    attachCheckboxListeners(); // Attach event listeners after table rows are rendered
  }

function attachCostInputListeners() {
    $('.cost-input').on('input', function () {
        const costInput = $(this);
        const cost = costInput.val().trim();

        if (cost !== '' && !isNaN(cost) && parseFloat(cost) >= 0) {
            // Remove error message if a valid cost is entered
            costInput.next('.error-message').remove();
        }
    });
}

  function attachCheckboxListeners() { debugger;
    const taskCheckboxes = $('.task-checkbox');
    const selectAllCheckbox = $('#select-all');

    // Handle select-all checkbox change
    selectAllCheckbox.on('change', function () {
        const isChecked = selectAllCheckbox.is(':checked');
        taskCheckboxes.each(function () {
            $(this).prop('checked', isChecked);
            toggleCostInput($(this).data('id'), isChecked);
        });
    });

    // Handle individual task checkboxes change
    taskCheckboxes.on('change', function () {
        const allChecked = taskCheckboxes.length === taskCheckboxes.filter(':checked').length;
        selectAllCheckbox.prop('checked', allChecked); // Select or unselect the select-all checkbox

        toggleCostInput($(this).data('id'), $(this).is(':checked'));
    });
    attachCostInputListeners();
}


  // Enable or disable cost input based on checkbox state
  function toggleCostInput(id, isChecked) {debugger;
    const inputField = $(`.cost-input[data-id="${id}"]`);
    inputField.prop('disabled', !isChecked);
    inputField.next('.error-message').remove();
    if (!isChecked) {
      inputField.val(''); // Clear the field if unchecked
    }
  }

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the 'active' class from all tab links
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add 'active' class to the clicked tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Automatically open the first tab
document.getElementById("defaultOpen").click();

// Close the success modal
function closeModal() {
    document.getElementById("successModal").style.display = "none";
}

function companyCreateTeamMember(event){
	event.preventDefault();
	var formElement = document.getElementById("form");
	var formData = new FormData(formElement);
	
	if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return; 
    }
    
	//var formObject = Object.fromEntries(formData.entries());
	//var jsonData = JSON.stringify(formObject);
	
	$('.error-message').remove();
	var isValid = true;
    // Get selected task checkboxes and their corresponding costs
    $('.task-checkbox:checked').each(function () {
    var taskId = $(this).data('id'); // Get taskWiseRoleTaskId from checkbox
    var costInput = $(`.cost-input[data-id="${taskId}"]`); // Get corresponding cost input field
    var cost = costInput.val().trim(); // Get and trim cost value

    // Remove any previous error messages
    costInput.next('.error-message').remove();

    // Validate that cost is provided for each checked task
    if (cost === '' || isNaN(cost) || parseFloat(cost) < 0) {
        isValid = false;
        costInput.after(`<span class="error-message" style="color: red;">Cost is mandatory</span>`);
    } else {
        // Append taskId and corresponding cost to formData if valid
        formData.append('tasks[' + taskId + '].taskId', taskId);
        formData.append('tasks[' + taskId + '].cost', cost);
    }
});


    if (!isValid) {
        // If validation fails, stop form submission
        return;
    }
    
	var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
	$.ajax({
	    url: '/companyCreateTeamMember',
	    type: 'POST',
	    processData: false,
        contentType: false,
	    data: formData,
	    success: function (responce) {
	        if(responce){
	        	document.getElementById('successMessage').textContent = 'Team member details saved successfully!';
        		document.getElementById('successModal').style.display = 'block';
	        }else{
	        	document.getElementById('successMessage').textContent = 'Error while saving Team member details!';
        		document.getElementById('successModal').style.display = 'block';
	        }
	    },
	    error: function (error) {
	        console.log('Error:', error);
	        alert("An error occurred while saving the team member details.");
	    }
	});
	
}

function companyUpdateTeamMember(memberLoginId,event){
	event.preventDefault();
    var formElement = document.getElementById("form");
	var formData = new FormData(formElement);
	//var formObject = Object.fromEntries(formData.entries());
	//var jsonData = JSON.stringify(formObject);
	
	if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return; 
    }
    
	//var formObject = Object.fromEntries(formData.entries());
	//var jsonData = JSON.stringify(formObject);
	
	$('.error-message').remove();
	var isValid = true;
    // Get selected task checkboxes and their corresponding costs
    $('.task-checkbox:checked').each(function () {
    var taskId = $(this).data('id'); // Get taskWiseRoleTaskId from checkbox
    var costInput = $(`.cost-input[data-id="${taskId}"]`); // Get corresponding cost input field
    var cost = costInput.val().trim(); // Get and trim cost value

    // Remove any previous error messages
    costInput.next('.error-message').remove();

    // Validate that cost is provided for each checked task
    if (cost === '' || isNaN(cost) || parseFloat(cost) < 0) {
        isValid = false;
        costInput.after(`<span class="error-message" style="color: red;">Cost is mandatory</span>`);
    } else {
        // Append taskId and corresponding cost to formData if valid
        formData.append('tasks[' + taskId + '].taskId', taskId);
        formData.append('tasks[' + taskId + '].cost', cost);
    }
	});


    if (!isValid) {
        // If validation fails, stop form submission
        return;
    }
    
	var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
	$.ajax({
	    url: '/companyUpdateTeamMember?memberLoginId='+memberLoginId,
	    type: 'PUT',
	    processData: false,
        contentType: false,
	    data: formData,
	    success: function (responce) {
	        if(responce){
	        	document.getElementById('successMessage').textContent = 'Team member details updated successfully!';
        		document.getElementById('successModal').style.display = 'block';
	        }else{
	        	document.getElementById('successMessage').textContent = 'Error while updating Team member details!';
        		document.getElementById('successModal').style.display = 'block';
	        }
	    },
	    error: function (error) {
	        console.log('Error:', error);
	        alert("An error occurred while saving the client profile.");
	    }
	});
	
}