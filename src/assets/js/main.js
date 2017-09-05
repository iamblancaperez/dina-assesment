function getUsers(){
	$.ajax({
		url: 'http://js-assessment-backend.herokuapp.com/users',
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
