$(document).ready(function() {
    // Initialize DataTable
    $('#projectsTable').DataTable();
    // Fetch project details and status summary via AJAX
    $.ajaxSetup({
            beforeSend: function() {
                document.getElementById('loader').style.display = 'block';
            },
            complete: function() {
                document.getElementById('loader').style.display = 'none';
            }
        });
    $.ajax({
        url: '/companyGetProjectListData',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Update status summary
            $('#noStarted').text(data.statusSummary.noStarted);
            $('#inProgress').text(data.statusSummary.inProgress);
            $('#onHold').text(data.statusSummary.onHold);
            $('#cancelled').text(data.statusSummary.cancelled);
            $('#completed').text(data.statusSummary.completed);

            // Populate table with project data
            const projectsTable = $('#projectsTable').DataTable();
            data.projects.forEach(function(project) {
                const members = project.members.map(member => `<span class="member-circle">${member}</span>`).join(' ');
                const actions = `
                    <div class="action-buttons">
                        <span class="edit-btn" onclick="companyFetchprojectDetailsById(${project.projectId})">✏️</span>
                        <span class="delete-btn" onclick="companyOpenDeleteCnfPopup(${project.projectId})">🗑️</span>
                    </div>
                `;
                projectsTable.row.add([
                    project.name,
                    project.startDate,
                    project.deadline,
                    members,
                    `<span class="${project.statusClass}">${project.status}</span>`,
                    actions
                ]).draw();
            });
        }
    });
});

function companyAddProject(){
	$.ajax({
        url:'/companyAddProjectPage',
        type: "GET",
        success: function (data) {
        	$("#adminDashboardRightPanal").html(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function companyFetchprojectDetailsById(projectId){
	$.ajax({
        url:'/companyFetchprojectDetailsById?projectId='+projectId,
        type: "GET",
        success: function (data) {
        	$("#adminDashboardRightPanal").html(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function companyOpenDeleteCnfPopup(projectId){
	document.getElementById('projectToDelete').value = projectId;
	document.getElementById('deleteConfirmationPopup').style.display = 'block';
}

function companyDeleteProjectById(){
	var projectId = document.getElementById('projectToDelete').value;
	var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
	$.ajax({
        url:'/companyDeleteProjectById?projectId='+projectId,
        type: "PUT",
        success: function (response) {
        	if (response) {
                    document.getElementById('confirmationPopupMessage').textContent = 'Project deleted successfully!';
            		document.getElementById('confirmationPopup').style.display = 'block';
                } else {
                    document.getElementById('confirmationPopupMessage').textContent = 'Error while deleting project!';
            		document.getElementById('confirmationPopup').style.display = 'block';
                }
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}
