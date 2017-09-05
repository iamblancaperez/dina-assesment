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
		url: `${url}/${id}.json`,
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

function createUser(params){
	$.ajax({
		url: '${url}',
		type: 'POST',
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
function getUser(id){
	$.ajax({
		url: '/path/to/file',
		type: 'default GET (Other values: POST)',
		dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		data: {param1: 'value1'},
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