function UserHandler(formSelector, firstName = "", lastName = "", status = ""){
	this.form = document.getElementById(formSelector);
	this.button = button = document.getElementById("create-btn");
	this.firstName = firstName;
	this.lastName = lastName;
	this.status = status;
	
	this.validation = function(){

	}

	this.updateValues = function(firstName = "", lastName = "", status = ""){
		this.firstname = firstName != "" ? this.firstName : firstName;
		this.lastname = lastName != "" ? this.lastName : lastName;
		this.status = status != "" ? this.status : status;
	}
	//this.formTemaplate = 

}

var user = new User("create-user");
var element = document.querySelector(".form-signup");

element.addEventListener("submit", function(event) {
  event.preventDefault();
  var inputs = form.getElementsByTagName("input");
  var textareas = getElementsByTagName("select");

  var all = [].concat(Array.prototype.slice.call(inputs), Array.prototype.slice.call(textareas));

  all.forEach(function(e){

  });
  //get the attributes and validatethem
  //if they are ok send it to the server to create the user
  //Check if the responses of the server its ok and send the user to the user how or the index
  //if its not ok send the errors on the :before pseudo selector on the form input
  /*
	var firstName = document.getElementById("first-name").value;
	var lastName = document.getElementById("last-name").value;
	var status = document.getElementById("status").value;
	user.updateValues(firstName, lastName, status)*/

	user.validation();
});


