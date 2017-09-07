$(document).ready(function($) {
	var mainContainer = document.getElementById("main-container");
	var createUser = document.getElementById("create-user-link");
	Router.config({ mode: 'history'}); // configuration	
	Router.navigate(); // returning the user to the initial state
	// adding routes
	Router
	.add(/(.*)\/edit/, function() {
		getUser().then(function(userJSON){
			var user = new User(userJSON.first_name, userJSON.last_name, userJSON.status);
			user.renderForm(mainContainer, "edit");
		});
	})
	.add(/new/, function() {
		var user = new User();
		user.renderForm(mainContainer);
	})
	.add(function() {
		getUsers().then(function(usersJSON){
			var users = new Pagination(usersJSON, 0);
			users.setPagination(mainContainer);				
		});
	})
	.check('/').listen();

	createUser.addEventListener('click',function(e){
		e.preventDefault();
		Router.check('/new').listen();
	});

});