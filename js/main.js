// True Car `Namespace` - Sort of
var TC = TC || {};

//define sections
TC.APP = {};
TC.APP.selectors = {};

TC.APP.selectors.addItemField = document.querySelector("#addItemField");
TC.APP.selectors.addItemBtn = document.querySelector("#addItemBtn");
TC.APP.selectors.tableList = document.querySelector("#tableList tbody");
TC.APP.selectors.deleteBtn = document.querySelector(".deleteBtn");
TC.APP.selectors.jsonField = document.querySelector("#jsonField");
TC.APP.selectors.loadJsonBtn = document.querySelector("#loadJsonBtn");

// Store
TC.APP.store = {};
TC.APP.store.todos = []; //using array to store todo items


// this function adds items to our todo list as well as to our todo store.
TC.APP.addListItem = function(){
    var todoContent = this.selectors.addItemField.value.replace(/[!@#$%^&*]/g, "");
    if(todoContent === '') return false; //create error
    
    // if input is sanitized and not empty add to store
    this.store.todos.push(todoContent);
    
    // Once added to the store create html and append to tbody
    this.constructItem(this.store.todos.length, todoContent);
    
    // Reset input field to an empty string
    this.selectors.addItemField.value ="";
    
    // Update the textarea with new list information
    this.updateJson();
};

TC.APP.removeFromList = function(todo){
   this.store.todos.splice(todo-1, 1);
   this.updateList();
   this.updateJson();
};

TC.APP.updateList = function(){
    this.selectors.tableList.innerHTML = '';

    this.store.todos.forEach(function(content, index) {
        this.constructItem(index+1, content)
    }.bind(this));
};

TC.APP.updateJson = function(){
    this.selectors.jsonField.value = JSON.stringify(this.store.todos);
    this.resizeJson();
};

TC.APP.loadJson = function() {
   this.store.todos = JSON.parse(this.selectors.jsonField.value);
   this.updateList();
   this.resizeJson();
};

TC.APP.constructItem = function(id, content){
    this.selectors.tableList.innerHTML += '<tr><td>'+id+'.</td><td>'+content+'</td><td><a href="#'+id+'" class="deleteBtn">delete</a></td></tr>';
};

TC.APP.resizeJson = function(){
    
    if (this.selectors.jsonField.clientHeight < this.selectors.jsonField.scrollHeight)
      {
        this.selectors.jsonField.style.height = this.selectors.jsonField.scrollHeight + "px";
        if (this.selectors.jsonField.clientHeight < this.selectors.jsonField.scrollHeight)
        {
          this.selectors.jsonField.style.height = 
            (this.selectors.jsonField.scrollHeight * 2 - this.selectors.jsonField.clientHeight) + "px";
        }
    }
    
};


// Events used on page

// click event on the add button which runs the addListItem Function
TC.APP.selectors.addItemBtn.addEventListener("click", function(e){
    e.preventDefault();
    TC.APP.addListItem();
}, false);


// add click event the tbody and check where the child clicked is the "a.deleteBtn" utilized classList for this
TC.APP.selectors.tableList.addEventListener("click", function(e) {
    e.preventDefault();
    
    // Replaced out the hash from href
    if(e.target.classList == "deleteBtn") TC.APP.removeFromList(e.target.getAttribute("href").replace("#",""));
}, false);

TC.APP.selectors.loadJsonBtn.addEventListener("click", function(e) {
     e.preventDefault();
     TC.APP.loadJson();
}, false);