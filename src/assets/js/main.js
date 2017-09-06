function User(formSelector, firstName = "", lastName = "", status = ""){
	this.form = document.getElementById(formSelector);
	this.button = button = document.getElementById("create-btn");
	this.firstName = firstName;
	this.lastName = lastName;
	this.status = status;
	this.statusAllowed = ["active", "locked"];
	
	this.validation = function(){

	};

	this.updateValues = function(firstName = "", lastName = "", status = ""){
		var response = {success : ""};
		var flagValidations = true;
		this.firstName = firstName == "" ? this.firstName : firstName;
		this.lastName = lastName == "" ? this.lastName : lastName;
		this.status = status == "" ? this.status : status;

		//It can be added a validation just for letters
		if(this.firstName.trim() == ""){
			console.log('its blank')
			response.first_name = ["can't be blank"];
			flagValidations = false;
		}
		if(this.lastName.trim() == ""){
			response.last_name = ["can't be blank"];
			flagValidations = false;
		}
		if(!this.statusAllowed.includes(this.status)){
			response.status = ["is not included in the list"];
			flagValidations = false;
		}
		response.success = flagValidations;
		return response;
	};
}
function hidden(){
	var user = new User("create-user");
	var element = document.querySelector(".form-signup");

	element.addEventListener("submit", function(event) {
	  event.preventDefault();
	  
	  var firstName = document.getElementById("first-name");
		var lastName = document.getElementById("last-name");
		var status = document.getElementById("status");
		console.log(`Name: ${firstName.value} , Last: ${lastName.value}, status: ${status.value}`);
			
		var response = user.updateValues(firstName.value, lastName.value, status.value);	
		var serverResponse;
		var errorSpan;
		if(response.success){

			serverResponse = createUser({"first_name" : user.firstName, "last_name" : user.lastName, "status" : user.status});
			//Here I have the user JSON or the errors
			//Async Wathchout
		}else{
			//This should be a recurent functon whe unfocus the inputs, have to change it, maybe if it's on the class HOLD that thought
			if(response.first_name){
				errorSpan = document.createElement('span');
				errorSpan.innerHTML = response.first_name.join("<br>");
				firstName.parentElement.append(errorSpan);
			}
			if(response.last_name){
				errorSpan = document.createElement('span');
				errorSpan.innerHTML = response.last_name.join("<br>");
				lastName.parentElement.append(errorSpan);
			}
			if(response.first_name){
				errorSpan = document.createElement('span');
				errorSpan.innerHTML = response.status.join("<br>");
				status.parentElement.append(errorSpan);
			}
		}
	});
}

$(document).ready(function($) {
	var location = window.location;
	console.log(location);
});

