//selectors
const todoInput = document.querySelector(".todo-input") //input
const todoButton = document.querySelector(".todo-button") //button
const todoList = document.querySelector(".todo-list") //ul

//functions
const addTodo = (event) => {
    //prevent form from submitting
    event.preventDefault()
    //creating todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todoDiv")
    //creating LI
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    //create complete button
    const completedButton = document.createElement("button")
    completedButton.innerHTML = "<i class='fas fa-check'></i>"
    completedButton.classList.add("completed-btn")
    todoDiv.appendChild(completedButton)
    //creating delete button
    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>"
    deleteButton.classList.add("delete-btn")
    todoDiv.appendChild(deleteButton)
    //append todoDiv to UL
    todoList.appendChild(todoDiv)
    todoInput.value = ""
} 

const deleteComplete = (event) => {
    const item = event.target;
    //console.log(item)
    if (item.classList.contains("delete-btn")) {
        const todo = item.parentElement;
        todo.classList.add("fall")
        todo.addEventListener("transitionend", () => {
            todo.remove()
        })
    } else if (item.classList.contains("completed-btn")) {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

//event-listeners
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteComplete)