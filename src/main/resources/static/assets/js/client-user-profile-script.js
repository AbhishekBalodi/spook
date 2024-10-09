$(document).ready(function () {
    // Initialize DataTable
    var clientId = document.getElementById('companyIdForDetailsPage').value;
    $('#userTable').DataTable({
        ajax: {
            url: '/companyClientTeamListData?clientId='+clientId,
            dataSrc: ''
        },
        columns: [ // S.No. column will be populated later
            { data: 'name' },
            { data: 'email' },
            { data: 'mobile' },
            { data: 'last_login' },
            { data: 'status', render: function (data, type, row) {
                    return `
                        <div class="status-switch">
                            <input type="checkbox" ${data ? 'checked' : ''}>
                        </div>`;
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="action-btn edit-btn" onclick="editUser(' + row.id + ')">✏️</button>' +
                           '<button class="action-btn delete-btn" onclick="deleteUser(' + row.id + ')">🗑️</button>';
                }
            }
        ]
    });
});

function closeSuccessModal() {
    document.getElementById("confirmationPopup1").style.display = "none";
    companyGetClientUserProfile();
}

function companyAddClientUserPage(){
	$.ajax({
        url:'/companyAddClientUserPage',
        type: "GET",
        success: function (data) {
        	$("#companyClientDetailsPageRightDiv").html(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function createNewClientUser(event){
	event.preventDefault();
	const successPopupWrapper = document.getElementById("confirmationPopup1");
	var formData = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        designation: $('#designation').val(),
        email: $('#email').val(),
        mobile: $('#mobile').val(),
        password: $('#password').val(),
        primaryUser: $('input[name="primaryUser"]').is(':checked'),
        noWelcomeEmail: $('input[name="noWelcomeEmail"]').is(':checked'),
        setPasswordEmail: $('input[name="setPasswordEmail"]').is(':checked'),
        clientId: $('#companyIdForDetailsPage').val(),
        userPermissions: $('input[name="userPermissions"]:checked').map(function () {
            return $(this).val();
        }).get()
    };

    var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
    $.ajax({
        url: '/companyCreateClientUser', // URL mapping in the controller
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData), // Convert data to JSON
        success: function (response) {
            successPopupWrapper.style.display = "block";
        },
        error: function (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the user.');
        }
    });
}