function User(id, firstName = "", lastName = "", status = ""){
	const realThis = this;
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
	this.status = status;
	this.statusAllowed = ["active", "locked"];

	this.updateValues = function(firstName = "", lastName = "", status = ""){
		var response = {success : ""};
		var flagValidations = true;
		this.firstName = firstName == "" ? this.firstName : firstName;
		this.lastName = lastName == "" ? this.lastName : lastName;
		this.status = status == "" ? this.status : status;

		if(this.firstName.trim() == ""){
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

	this.messages = {
		placeholders: {
			firstName : "Please enter user's firstname",
			lastName : "Please enter user's lastname"	
		},
		buttons :{
			create : "Create User",
			update : "Update User"
		}
	}

	this.getStatusSelect = function(){
		var statusSelect = `<select name="status" id="status" class="form-control">`;
		this.statusAllowed.forEach(function(e){
			statusSelect += ` <option value="${e}" 
													${this.status == e ? selected="selected" : ""}>
													${e.charAt(0).toUpperCase()}${e.slice(1)}
												</option>`;
		});
		statusSelect += `</select>`;
		return statusSelect;
	};

	this.getFormButton = function(action){
		console.log(action)
		var formButton = `<button class="btn" id="create-btn">
												${action == "create" ? this.messages.buttons.create : this.messages.buttons.update }
											</button>`;		
		return formButton;
	};

	this.renderForm = function(container, action = "create"){
		//REFACTOR
		container.innerHTML = this.formTemplate();
		var form = document.querySelector(".form-signup");
		//an object????HTT
		form.addEventListener("submit", function(event) {
	  	event.preventDefault();
	  
	  	var firstName = form.querySelector("#first-name");
			var lastName = form.querySelector("#last-name");
			var status = form.querySelector("#status");

			var response = realThis.updateValues(firstName.value, lastName.value, status.value);	
			var serverResponse;
			var errorSpan;

			if(response.success){
				if(action == "create"){
					createUser({"first_name" : realThis.firstName, "last_name" : realThis.lastName, "status" : realThis.status}).then(function(user){
						Router.navigate(`/${user.id}/edit`);
					});
				}else if(action == "edit"){
					serverResponse = updateUser(realThis.id, {"first_name" : realThis.firstName, "last_name" : realThis.lastName, "status" : realThis.status});
				}
			}else{
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
	};

	this.formTemplate = function(action){
		template = `<div class="form-container">
									<form id="create-user" class="form-signup" >
										<div class="firstname-container input-box">
											<label for="first_name" class="sr-only"> First Name: </label>
											<input type="text" id="first-name" name="first-name" class="form-control" placeholder="${this.messages.placeholders.firstName}" value="${this.firstName}">
										</div>
										<div class="lastname-container input-box">
											<label for="last_name" class="sr-only"> Last Name: </label>
											<input type="text" id="last-name" name="last-name" class="form-control" placeholder="${this.messages.placeholders.lastName}" value="${this.lastName}">
										</div>
										<div class="form-group input-box">
											<label for="status" class="sr-only"> Status </label>
											${this.getStatusSelect()}
										</div>
										<div>													
											${this.getFormButton(action)}
										</div>
									</form>
								</div>`
		return template;
	}
}