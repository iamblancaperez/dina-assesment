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
	.add(/overview/, function() {
		mainContainer.innerHTML = "";
	})
	.add(/sites/, function() {
		mainContainer.innerHTML = "";
	})
	.add(/payments/, function() {
		mainContainer.innerHTML = "";
	})
	.add(function() {
		console.log('sadjkfbskajdfjksbdksdjf')
		mainContainer.innerHTML = "";
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

	var menuLinks = Array.from(document.getElementsByClassName("nav-item"));
	var allLinks = Array.from(document.getElementsByTagName("a"));
	allLinks.forEach(function(element){
		element.addEventListener('click', function(e){
			e.preventDefault();
		});
	});
	menuLinks.forEach(function(element){
		element.addEventListener('click', function(e){
			menuLinks.forEach(function(links){
				links.classList.remove("active");
			});			
			this.classList.add("active");
			Router.navigate(this.querySelector("a").getAttribute("href"));			
		});
	});

});