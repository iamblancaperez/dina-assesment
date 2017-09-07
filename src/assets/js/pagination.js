function Pagination(elements, currentPage){
	const realThis = this;
	this.elements = elements;
	this.currentPage = currentPage;
	this.maxPages = Math.ceil(this.elements.length / 10) - 1;
	this.container = document.createElement("ul");
	this.navigator = document.createElement("nav");
	this.pagination = document.createElement("ul");
	this.prevUsers = document.createElement("li");
	this.nextUsers = document.createElement("li");

	this.setPagination = function (domElement){
		var currentBegin, currentEnd;
		currentBegin = this.currentPage * 10;
		currentEnd = (this.currentPage + 1) * 10;

		this.container.id = "users-container";

		this.prevUsers.setAttribute("id", "prev-users");
		this.prevUsers.innerHTML = `<a class="page-link" href="#">Previous</a>`;

		this.navigator.id = "users-navigator";
		
		this.nextUsers.setAttribute("id", "next-users");
		this.nextUsers.innerHTML = `<a class="page-link" href="#">Next</a>`;
		
		domElement.append(this.container);
		domElement.append(this.navigator);
		this.navigator.append(this.pagination);

		this.container.classList.add("list-group");
		this.pagination.classList.add("pagination");

		this.checkBeginEnd();
		this.fillContainer(this.elements.slice(currentBegin, currentEnd));

		this.pagination.append(this.prevUsers);
		this.pagination.append(this.nextUsers);

		this.prevUsers.classList.add("page-item");
		this.nextUsers.classList.add("page-item");

		this.prevUsers.addEventListener("click", function(){
			realThis.previousTen();
		});
		this.nextUsers.addEventListener("click", function(){
			realThis.nextTen();
		});
	};

	this.previousTen = function(){
		this.currentPage = this.currentPage - 1 <= 0 ? 0 : this.currentPage - 1;
		
		currentBegin = this.currentPage * 10;
		currentEnd = (this.currentPage + 1) * 10;

		this.container.innerHTML = "";
		this.checkBeginEnd();
		this.fillContainer(this.elements.slice(currentBegin, currentEnd));
	};


	this.nextTen = function(){
		this.currentPage = this.currentPage + 1 > this.maxPages ? this.maxPages : this.currentPage + 1;

		currentBegin = this.currentPage * 10;
		currentEnd = (this.currentPage + 1) * 10;
		
		currentEnd = currentEnd > this.elements.length ? this.elements.length : currentEnd;

		this.container.innerHTML = "";
		this.checkBeginEnd();
		this.fillContainer(this.elements.slice(currentBegin, currentEnd));
	};

	this.checkBeginEnd = function(){
		this.container.dataset.page = this.currentPage;
		if(parseInt(this.currentPage) <= 0){
			this.prevUsers.disabled = true;
			this.prevUsers.classList.add("disabled");
		}else{
			this.prevUsers.disabled = false;
			this.prevUsers.classList.remove("disabled");
		}
		if( parseInt(this.currentPage) >= this.maxPages){
			this.nextUsers.disabled = true;
			this.nextUsers.classList.add("disabled");
		}else{
			this.nextUsers.disabled = false;
			this.nextUsers.classList.remove("disabled");
		}
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
		var template = `<li class="list-group-item user ${item.status == "locked" ? "locked" : ''}" data-identifier="${item.id}">
											<span class="user-name">${item.last_name} ${item.first_name}</span>
											<span class="user-created"> - Created at: ${item.created_at} - </span> 
											<a href="#" class="user-status">
												<i class="${item.status == "locked" ? classActivate : classLock}" aria-hidden="true"></i>
											</a>
										</li>`

		return template;
	};
}