function getUsers(){
	$.ajax({
		url: 'http://js-assessment-backend.herokuapp.com/users',
		type: 'GET'
	})
	.done(function(res) {
		console.log(res);
		var users = new Pagination(res, "users-container");
		users.setPagination();
	})
	.fail(function() {
		console.log("error");
	});
}

function templateListItemUser(user){
	//Change to moustache
	var classActivate = "fa fa-unlock";
	var classLock = "fa fa-lock";
	//this is returning a string should return a dome element without jquery, fix later
	var template = `<div class="user">
										<span class="user-name ${user.status == "locked" ? "locked" : ''}">${user.last_name} ${user.first_name}</span>
										<span class="user-created"> - Created at: ${user.created_at} - </span> 
										<a href="#" class="user-status">
											<i class="${user.status == "locked" ? classActivate : classLock}" aria-hidden="true"></i>
										</a>
									</div>`

	return template;
}

function Pagination(elements, container){
	var realThis = this;
	this.elements = elements;
	this.currentPage = 0;
	this.maxPages = Math.ceil(this.elements.height / 10);
	this.container = document.getElementById(container);
	this.prevUsers = document.getElementById("prev-users");
	this.nextUsers = document.getElementById("next-users");

	this.setPagination = function (){
		var currentBegin, currentEnd;
		if(this.container.dataset.page){
			currentBegin = this.currentPage * 10;
			currentEnd = (this.currentPage + 1) * 10;
		}else{
			currentBegin = 0;
			currentEnd = 10;
		}

		this.prevUsers.addEventListener("click", function(){
			realThis.previousTen();
		});

		this.nextUsers.addEventListener("click", function(){
			realThis.nextTen();
		});

		this.updateDataContainer(currentBegin, currentEnd);
		this.checkBeginEnd();
		this.fillContainer(this.elements.slice(currentBegin, currentEnd));
	};

	this.previousTen = function(){
		this.currentPage = this.currentPage - 1 <= 0 ? 0 : this.currentPage - 1;
		
		currentBegin = this.currentPage * 10;
		currentEnd = (this.currentPage + 1) * 10;

		this.container.innerHTML = "";
		this.updateDataContainer(currentBegin, currentEnd);
		this.checkBeginEnd();
		this.fillContainer(this.elements.slice(currentBegin, currentEnd));
	};


	this.nextTen = function(){
		this.currentPage = this.currentPage + 1 > this.maxPages ? 0 : this.currentPage + 1;

		currentBegin = this.currentPage * 10;
		currentEnd = (this.currentPage + 1) * 10;
		
		currentEnd = currentEnd > this.elements.length ? this.elements.length : currentEnd;

		this.container.innerHTML = "";
		this.updateDataContainer(currentBegin, currentEnd);
		this.checkBeginEnd();
		this.fillContainer(this.elements.slice(currentBegin, currentEnd));
	};

	this.fillContainer = function(elements){
		elements.forEach(function(e){
			realThis.container.innerHTML += templateListItemUser(e);
		});
	}

	this.updateDataContainer = function(begin, end){
		this.container.dataset.begin = begin;
		this.container.dataset.end = end;
	};

	this.checkBeginEnd = function(){
		this.prevUsers.disabled = parseInt(this.container.dataset.begin) <= 0 ? true : false;
		this.nextUsers.disabled = parseInt(this.container.dataset.end) >= elements.length ? true : false;
	};
}
