//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
//when clicked - adding a to do
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



//functions
function addTodo(event) {
    //preventing form from submiting when added a new addtodo
    event.preventDefault();
    //Creating the todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Creating a LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //adding to do to local storage
    savingTodosLocal(todoInput.value);
    //buttons
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append to do list
    todoList.appendChild(todoDiv);
    //clearing the text after each submit
    todoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;
    //deleting the todo on click
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation fo deleting the todo
        todo.classList.add('fall');
        removeLocalTodos(todo);
        //waiting until the animation finishes to delete the actual to do
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });

    }

    //check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle(`completed`);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function savingTodosLocal(todo) {
    //checking if there is already a todo list locally
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//function to check if there is already a list to load and keep it, 
//instead of creating a new list everytime
function getTodos() {
    //checking if there is already a todo list locally
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        //Creating the todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Creating a LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //buttons
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //append to do list
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    //checking if there is already a todo list locally
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}