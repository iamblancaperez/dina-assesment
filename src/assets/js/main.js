const url = "http://js-assessment-backend.herokuapp.com/users";
function getUsers(){
	$.ajax({
		url: url,
		type: 'GET'
	})
	.done(function(res) {
		var users = new Pagination(res, "users-container");
		users.setPagination();
	})
	.fail(function() {
		console.log("error");
	});
}

function updateUser(id, params){
	$.ajax({
		url: `${url}/92.json`,
		type: 'PUT',
		dataType: 'json',
		contentType: 'application/json',
		data: params
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}