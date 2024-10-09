function getClientListTable(){
	$.ajax({url: "/companyClientListTable", success: function(result){
    	$("#adminDashboardRightPanal").html(result);
  	}});
}

function getAccessTypeTable(){
	$.ajax({url: "/companyAccessTypeListTable", success: function(result){
    	$("#adminDashboardRightPanal").html(result);
  	}});
}

function getTeamListTable(){
	$.ajax({url: "/companyTeamListTable", success: function(result){
    	$("#adminDashboardRightPanal").html(result);
  	}});
}

function getProjectListTable(){
	$.ajax({url: "/companyProjectListTable", success: function(result){
    	$("#adminDashboardRightPanal").html(result);
  	}});
}

function getTaskListTable(){
	$.ajax({url: "/companyTaskListTable", success: function(result){
    	$("#adminDashboardRightPanal").html(result);
  	}});
}

function getRoleAndTaskTable(){
	$.ajax({url: "/getRoleAndTaskTable", success: function(result){
    	$("#adminDashboardRightPanal").html(result);
  	}});
}







function logout(){
	var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });
	$.ajax({
	    url: '/logout',
	    type: 'POST',
	    success: function (responce) {
	        window.location.href = '/login?logout=true';
	    },
	    error: function (error) {
	        alert("An error occurred while logout.");
	    }
	});
}