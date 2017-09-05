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

	this.updateDataContainer = function(begin, end){
		this.container.dataset.begin = begin;
		this.container.dataset.end = end;
	};

	this.checkBeginEnd = function(){
		this.prevUsers.disabled = parseInt(this.container.dataset.begin) <= 0 ? true : false;
		this.nextUsers.disabled = parseInt(this.container.dataset.end) >= elements.length ? true : false;
	};

	
	this.fillContainer = function(elements){
		elements.forEach(function(e){
			realThis.container.innerHTML += realThis.templateListItem(e);
		});

		var parent, status;
		var statusButtons = document.getElementsByClassName("user-status");
		Array.from(statusButtons).forEach(function(button){
			button.addEventListener("click", function(e){
				e.preventDefault();
				parent = this.parentElement;
				parent.classList.toggle("locked");
				status = parent.classList.contains("locked") ? "locked" : "active";	
				updateUser(parent.dataset.identifier, JSON.stringify({'status' : status}));				
			})
		});
	};

	this.templateListItem = function (item){
		var classActivate = "fa fa-unlock";
		var classLock = "fa fa-lock";
		var template = `<div class="user ${item.status == "locked" ? "locked" : ''}" data-identifier="${item.id}">
											<span class="user-name">${item.last_name} ${item.first_name}</span>
											<span class="user-created"> - Created at: ${item.created_at} - </span> 
											<a href="#" class="user-status">
												<i class="${item.status == "locked" ? classActivate : classLock}" aria-hidden="true"></i>
											</a>
										</div>`

		return template;
	};

}