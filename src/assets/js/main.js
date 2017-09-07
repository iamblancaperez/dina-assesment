/*$(document).ready(function($) {
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
*/
$(document).ready(function($) {
	var mainContainer = document.getElementById("main-container");
	Router.config({ mode: 'history'}); // configuration	
	Router.navigate(); // returning the user to the initial state
	// adding routes
	Router
	.add(/(.*)\/edit/, function() {
		console.log('sdasdasd')
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

// forwarding
//Router.navigate('/22');	
});