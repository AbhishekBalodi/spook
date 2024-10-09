$(document).ready(function () {
    const $totalClients = $('#total-clients');
    const $activeClients = $('#active-clients');
    const $inactiveClients = $('#inactive-clients');
	$.ajaxSetup({
            beforeSend: function() {
                document.getElementById('loader').style.display = 'block';
            },
            complete: function() {
                document.getElementById('loader').style.display = 'none';
            }
        });
    var table = $('#client-table').DataTable({
		
        ajax: {
            url: '/companyClientListData', 
            dataSrc: function (json) {
                $totalClients.text(json.totalClients);
                $activeClients.text(json.activeClients);
                $inactiveClients.text(json.inactiveClients);
                return json.data;
            }
        },
        columns: [
            { data: 'id', render: function (data, type, row, meta) {
                    return meta.row + 1; // Auto-increment S.No.
                }
            },
            { data: 'clientName', render: function (data, type, row) {
                    return `<a href="#" onclick="companyGetClientDetailsPage(${row.clientId})">${data}</a>`;
                }
            },
            { data: 'contactPerson' },
            { data: 'email' },
            { data: 'mobile' },
            { data: 'status', render: function (data, type, row) {
                    return `
                        <div class="status-switch">
                            <input type="checkbox" ${data ? 'checked' : ''} onclick="openDeactivateConfirmationPopup(${row.clientId})" >
                        </div>`;
                }
            },
            { data: 'clientId', render: function (data, type, row) {
                    return `
                        <div class="action-icons">
                            <a href="#" class="edit" onclick="companyGetClientDetailsById(${data})">✏️</a>
                            <a href="#" class="edit" onclick="openDeleteConfirmationPopup(${data})">🗑️</a>
                        </div>`;
                }
            }
        ]
    });


 window.openAddClientPage = function() {
	 	$.ajax({url: "/companyOpenAddClientPage", success: function(result){
    	$("#adminDashboardRightPanal").html(result);
  	}});
    };

    // Function to close the add company popup
    window.closeAddCompanyPopupModal = function() {
        $('#addCompanyPopupModal').hide();
    };
    
    window.closeSuccessPopupModal = function() {
        $('#successPopupModal').hide();
    };



window.companyGetClientDetailsById = function(clientId){
	$.ajax({
        url:'/companyGetClientDetailsById?companyId='+clientId,
        type: "GET",
        success: function (data) {
        	$("#adminDashboardRightPanal").html(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
};

window.companySaveClientDetails = function(event){
	event.preventDefault();
    var formElement = document.getElementById("addCompanyPageForm");
    
   
    if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return; 
    }
  
    if (!($('#addCompanyPageForm .has-error').length === 0)) {
		return;
	}
    
	var formData = new FormData(formElement);
	var formObject = Object.fromEntries(formData.entries());
	var jsonData = JSON.stringify(formObject);
	
	var jsonData = JSON.stringify(formObject);
	var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
	$.ajax({
	    url: '/companySaveClientDetails',
	    type: 'POST',
	    contentType: 'application/json',
	    data: jsonData,
	    success: function (response) {
            if (response) {
                    document.getElementById('successMessage').textContent = 'Client details saved successfully!';
            		document.getElementById('successPopup').style.display = 'block';
                } else {
                    document.getElementById('successMessage').textContent = 'Error while saving client details!';
            		document.getElementById('successPopup').style.display = 'block';
                }
	    },
	    error: function (error) {
	        console.log('Error:', error);
	        alert("An error occurred while saving the client profile.");
	    }
	});
};

window.companyUpdateClientDetails = function(clientId,event){
	event.preventDefault();
    var formElement = document.getElementById("addCompanyPageForm");
    
    if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return; 
    }
  
    if (!($('#addCompanyPageForm .has-error').length === 0)) {
		return;
	}
    
    
	var formData = new FormData(formElement);
	var formObject = Object.fromEntries(formData.entries());
	var jsonData = JSON.stringify(formObject);
	
	var jsonData = JSON.stringify(formObject);
	var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
	$.ajax({
	    url: '/companyUpdateClientDetails?clientId='+clientId,
	    type: 'PUT',
	    contentType: 'application/json',
	    data: jsonData,
	    success: function (response) {
            if (response) {
                    document.getElementById('successMessage').textContent = 'Client details updated successfully!';
            document.getElementById('successPopup').style.display = 'block';
                } else {
                    document.getElementById('successMessage').textContent = 'Error while updating client details!';
            document.getElementById('successPopup').style.display = 'block';
                }
	    },
	    error: function (error) {
	        console.log('Error:', error);
	        alert("An error occurred while saving the client profile.");
	    }
	});
};


});

function closeSuccessPopup() {
    document.getElementById('successPopup').style.display = 'none';
    getClientListTable();
}

function closeDeactivateConfirmationPopup(){
	document.getElementById('deactivateConfirmationPopup').style.display = 'none';
	getClientListTable();
}

function closeDeleteConfirmationPopup(){
	document.getElementById('deleteConfirmationPopup').style.display = 'none';
}
function closeConfirmationPopup(){
	document.getElementById('confirmationPopup').style.display = 'none';
}




function companyGetClientDetailsPage(companyId) {
	document.getElementById('companyIdForDetailsPage').value = companyId;
    $.ajax({url: "/companyGetClientDetailsPage", success: function(result){
    	$("#adminDashboardRightPanal").html(result);
  	}});
}

function toggleGSTField(isGSTYes) {
    var gstField = document.getElementById('gst');
    if (isGSTYes) {
        gstField.disabled = false;
        gstField.required = true;
    } else {
        gstField.disabled = true;
        gstField.required = false;
        gstField.value = '';
    }
}

function mobileNumberValidation(){
	var mobileNumber = document.getElementById('mobile').value;
    var mobileNumberError = document.getElementById('mobileError');
    var regex = /^[0-9]{10,12}$/; 

    if (!regex.test(mobileNumber)) { 
        mobileNumberError.style.display = 'block';
        $('#mobile').closest('.form-group').addClass('has-error'); 
    } else {
        mobileNumberError.style.display = 'none';
        $('#mobile').closest('.form-group').removeClass('has-error');
    }
	
}

function isDuplicateClientEmail(){
	var email = document.getElementById('email').value;
	var emailError = document.getElementById('emailError');
        $.ajax({
            url: '/isDuplicateClientEmail',
            type: 'GET',
            data: { email: email.trim() },
            success: function(response) {
                if (response) {
					emailError.textContent = "Email already exist. Please try another.";
                    emailError.style.display = 'block';
                    $('#email').closest('.form-group').addClass('has-error');
                } else {
					emailError.textContent = "";
                    emailError.style.display = 'none';
                    $('#email').closest('.form-group').removeClass('has-error');
                }
            },
            error: function() {
                $('#emailError').text('An error occurred.');
            }
        });
}

function openDeactivateConfirmationPopup(clientId){
	document.getElementById('clientToDeactivate').value = clientId;
    document.getElementById('deactivateConfirmationPopup').style.display = 'block';
}

function openDeleteConfirmationPopup(clientId){
	document.getElementById('clientToDelete').value = clientId;
    document.getElementById('deleteConfirmationPopup').style.display = 'block';
}

function companyChangeClientStatus(){debugger;
	var clientToDeactivate = document.getElementById('clientToDeactivate').value;
	var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
	$.ajax({
                url: '/companyChangeClientStatus',  
                type: 'PUT',                      
                data: { clientId: clientToDeactivate },     
                success: function(response) {
					getClientListTable();
                    if (response) {
                        document.getElementById('deactivateConfirmationPopup').style.display = 'none';
                    } else {
                        document.getElementById('deactivateConfirmationPopup').style.display = 'none';
                    }
                },
                error: function(error) {
                    console.error('Error:', error);
                    alert('An error occurred while deactivating the client');
                }
            });
}

function companyDeleteClient(){
	document.getElementById('deleteConfirmationPopup').style.display = 'none';
	var clientToDelete = document.getElementById('clientToDelete').value;
	var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
	$.ajax({
                url: '/companyDeleteClient', 
                type: 'PUT',                      
                data: { clientId: clientToDelete },     
                success: function(response) {
                    if (response) {
						document.getElementById('confirmationPopupMessage').textContent = "Client deleted successfully.";
						document.getElementById('confirmationPopup').style.display = 'block';
                    } else {
						document.getElementById('confirmationPopupMessage').textContent = "Client deletion failed.";
                        document.getElementById('confirmationPopup').style.display = 'block';
                    }
                },
                error: function(error) {
                    console.error('Error:', error);
                    alert('An error occurred while deleting the client');
                }
            });
}

