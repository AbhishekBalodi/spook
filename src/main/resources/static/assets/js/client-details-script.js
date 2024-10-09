$(document).ready(function () {
	
   companyGetClientProfileById();
});


function companyGetClientProfileById(){
	var clientId = document.getElementById('companyIdForDetailsPage').value;
	$.ajax({
        url:'/companyGetClientProfileById?companyId='+clientId,
        type: "GET",
        success: function (data) {
        	$("#companyClientDetailsPageRightDiv").html(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function companyGetClientUserProfile(){
	$.ajax({
        url:'/companyGetClientUserProfileList',
        type: "GET",
        success: function (data) {
        	$("#companyClientDetailsPageRightDiv").html(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function companyGetClientProject(){
	$.ajax({
        url:'/companyGetClientProjectList',
        type: "GET",
        success: function (data) {
        	$("#companyClientDetailsPageRightDiv").html(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function companyGetClientTask(){
	$.ajax({
        url:'/companyGetClientTaskList',
        type: "GET",
        success: function (data) {
        	$("#companyClientDetailsPageRightDiv").html(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}