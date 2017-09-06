const url = "http://js-assessment-backend.herokuapp.com/users";

function getUsers(){
	return $.ajax({
		url: url,
		type: 'GET'
	})
}

function updateUser(id, params){
	console.log(params)
	$.ajax({
		url: `${url}/${id}.json`,
		type: 'PUT',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(params)
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
		url: `${url}.json`,
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(params)
	})
	.done(function(res) {
		console.log(res);
		console.log("success");
	})
	.fail(function(error) {
		console.log(error);
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
} 

function getUser(id = 363){
	return $.ajax({
		url: `${url}/${id}.json`,
		type: 'GET',
		dataType: 'json',
		contentType: 'application/json'
	})
	.done(function(res) {
		console.log(res);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}