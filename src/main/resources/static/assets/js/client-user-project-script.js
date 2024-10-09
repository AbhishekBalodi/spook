$(document).ready(function() {
    // Initialize DataTable
    $('#projectsTable').DataTable();
var clientId = document.getElementById('companyIdForDetailsPage').value;
    
    $.ajax({
        url: '/companyGetClientProjectListData?clientId='+clientId,  
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
                        <span class="edit-btn">✏️</span>
                        <span class="delete-btn">🗑️</span>
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

function companyAddClientProject(){
	$.ajax({
        url:'/companyAddClientProjectPage',
        type: "GET",
        success: function (data) {
        	$("#companyClientDetailsPageRightDiv").html(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}
