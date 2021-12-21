//selectors
const todoInput = document.querySelector(".todo-input") //input
const todoButton = document.querySelector(".todo-button") //button
const todoList = document.querySelector(".todo-list") //ul
const filterOption = document.querySelector(".filter-todo")//select
const alert = document.querySelector(".alert")

//functions
const addTodo = (event) => {
    //prevent button from submitting form
    event.preventDefault()
    if (!todoInput.value) {
        alert.innerText = "Please enter a valid input"
        alert.classList.add("error")
        alert.style.visibility = "visible"
        setTimeout(() => {
            alert.style.visibility = "hidden"
            alert.classList.remove("error")
        }, 1500);
    } else {
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todoDiv")
        todoDiv.innerHTML = `<li class="todo-item">${todoInput.value}</li>
        <button class="completed-btn"><i class='fas fa-check'></i></button>
        <button class="delete-btn"><i class='fas fa-trash'></i></button>`
        saveLocalTodos(todoInput.value)
        todoList.appendChild(todoDiv)
        todoInput.value = ""
        alert.innerText = "Item succesfully added!"
        alert.classList.add("success")
        alert.style.visibility = "visible"
        setTimeout(() => {
            alert.style.visibility = "hidden"
            alert.classList.remove("success")
        }, 1500)
    }
} 

//creating delete and complete function
const deleteComplete = (event) => {
    const item = event.target;
    //console.log(item)
    if (item.classList.contains("delete-btn")) {
        const todo = item.parentElement; //div
        todo.classList.add("fall") //fall
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", () => {
            todo.remove()
        })
    } else if (item.classList.contains("completed-btn")) {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

//creating filter option func
const filterTodo = (event) => {
    const todos = todoList.childNodes; //all DIVs inside UL
    todos.forEach(function(todo){
        console.log(event.target.value)
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
        }
    })
}

const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

const getTodos = () => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todoDiv")
        todoDiv.innerHTML = `<li class="todo-item">${todo}</li>
        <button class="completed-btn"><i class='fas fa-check'></i></button>
        <button class="delete-btn"><i class='fas fa-trash'></i></button>`
        todoList.appendChild(todoDiv)
    })
}

const removeLocalTodos = (todo) => {
    //splice(startIndex, deleteCount)
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const text = todo.children[0].innerText
    //const index = todos.indexOf(text)
    //console.log(index, "number")
    todos.splice(todos.indexOf(text), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}
//event-listeners
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteComplete)
filterOption.addEventListener("click", filterTodo)
document.addEventListener("DOMContentLoaded", getTodos)