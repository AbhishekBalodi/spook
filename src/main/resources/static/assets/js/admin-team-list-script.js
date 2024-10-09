$(document).ready(function () {
    // Initialize DataTable
    $('#teamTable').DataTable({
        ajax: {
            url: '/companyTeamListData', 
            dataSrc: ''
        },
        columns: [
            { data: null },
            { data: 'name' },
            { data: 'email' },
            { data: 'mobile' },
            { data: 'status', render: function (data, type, row) {
                    return `
                        <div class="status-switch">
                            <input type="checkbox" ${data ? 'checked' : ''} onclick="companyOpenMemberStatusCnfPopup(` + row.personLoginId + `)">
                        </div>`;
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="action-btn edit-btn" onclick="companyGetMemberDetailsById(' + row.personLoginId + ')">✏️</button>' +
                           '<button class="action-btn delete-btn" onclick="companyOpenMemberDeleteCnfPopup(' + row.personLoginId + ')">🗑️</button>';
                }
            }
        ],
        columnDefs: [{
            targets: 0,
            render: function (data, type, row, meta) {
                return meta.row + 1; // Add S.No. based on the row index
            }
        }]
    });
});


function openAddMemberPage(){
	$.ajax({url: "/companyOpenAddTeamMemberPage", success: function(result){
    	$("#adminDashboardRightPanal").html(result);
  	}});
}


// Close Success Modal
function closeSuccessModal() {
    $('#successModal').hide();
}

// Example functions for editing and deleting members
function companyGetMemberDetailsById(memberLoginId) {
    $.ajax({
        url:'/companyGetMemberDetailsById?memberLoginId='+memberLoginId,
        type: "GET",
        success: function (data) {
        	$("#adminDashboardRightPanal").html(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function companyDeleteMemberById() {
    var memberLoginId = document.getElementById('memberToDelete').value;
	
	var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
	$.ajax({
                url: '/companyDeleteMemberById',  
                type: 'PUT',                      
                data: { memberLoginId: memberLoginId },     
                success: function(response) {
					getTeamListTable();
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

function companyChangeMemberStatus(){
	var memberLoginId = document.getElementById('memberToDeactivate').value;
	
	var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
	$.ajax({
                url: '/companyChangeMemberStatus',  
                type: 'PUT',                    
                data: { memberLoginId: memberLoginId },    
                success: function(response) {
					getTeamListTable();
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

function companyOpenMemberStatusCnfPopup(memberLoginId){
	document.getElementById('memberToDeactivate').value = memberLoginId;
    document.getElementById('deactivateConfirmationPopup').style.display = 'block';
}

function companyOpenMemberDeleteCnfPopup(memberLoginId){
	document.getElementById('memberToDelete').value = memberLoginId;
    document.getElementById('deleteConfirmationPopup').style.display = 'block';
}
