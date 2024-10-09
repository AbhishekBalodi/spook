$(document).ready(function() {
    var table = $('#accessTable').DataTable({
        ajax: {
            url: '/companyAccessTypeData', 
            dataSrc: function (json) {
                return json.data;
            }
        },
        "columns": [
            { data: 'id', render: function (data, type, row, meta) {
                    return meta.row + 1; 
                }
            },
            { "data": "roleName", "render": function(data, type, row) {
                return '<a href="#">' + data + '</a>';
            }},
            { "data": "userCount" },
            { "data": "personNames", "render": function(data, type, row) {
                var users = data.replace(/[\[\]]/g, '').split(',').map(function(user) {
            		return '<span class="user-tag">' + user.trim() + '</span>';
       			 });
                return users.join(' ');
            }},
            { "data": null, "orderable": false, "render": function(data, type, row) {
                return '<a href="#" class="action-btn edit-btn">✏️</a>' +
                       '<a href="#" class="action-btn delete-btn">🗑️</a>';
            }}
        ],
        "order": [[0, 'asc']]
    });

    $('#search-box').on('keyup', function() {
        table.search(this.value).draw();
    });
});

function openAddAccessType(){
	$.ajax({url: "/companyOpenAddAccessTypePage", success: function(result){
    	$("#adminDashboardRightPanal").html(result);
  	}});
}



function companyCreateAccessType(event){
	event.preventDefault();
	const successPopupWrapper = document.getElementById("successPopup");
	const roleName = document.getElementById('roleName').value;
    const selectedPermissions = [];
    var formElement = document.getElementById("access-form");
    
    document.querySelectorAll('input[name="permissions"]:checked').forEach(function(checkbox) {
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
    var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
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
			if(response){
				document.getElementById('successMessage').textContent = 'Access type has been successfully saved!';
            	successPopupWrapper.style.display = "block";
			}else{
				document.getElementById('successMessage').textContent = 'Access type creation Failed!';
            	successPopupWrapper.style.display = "block";
			}
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
	
}

function closeAddAccessTypeSuccessPopup(){
	const successPopupWrapper = document.getElementById("successPopup");
	successPopupWrapper.style.display = "none";
	getAccessTypeTable();
}

function isDupicateAccessType(){
	var roleName = document.getElementById('roleName').value;
	var roleNameError = document.getElementById('roleNameError');
        $.ajax({
            url: '/isDupicateAccessType',
            type: 'GET',
            data: { roleName: roleName.trim() },
            success: function(response) {
                if (response) {
					roleNameError.textContent = "Access name already exist. Please try another.";
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
