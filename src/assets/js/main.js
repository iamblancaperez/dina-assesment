$(document).ready(function($) {
	var location = window.location;
	var mainContainer = document.getElementById("main-container");
	switch (location.pathname) {
		case "/new":
			var user = new User();
			user.renderForm(mainContainer);
			break;
		case "/edit":			
			getUser().then(function(userJSON){
				var user = new User(userJSON.first_name, userJSON.last_name, userJSON.status);
				user.renderForm(mainContainer, "edit");
			});			
			break;
		default:
			getUsers().then(function(usersJSON){
				var users = new Pagination(usersJSON, 0);
				users.setPagination(mainContainer);				
			});
			break;
	}
});
