import uuidv4 from 'uuid/v4'


// Setup the empty todos array
let todos = []



// Fetch existing todos from local storage
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    } 
}



// Save todos to local storage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}



// Expose the data stored in the todos array
const getTodos = () => todos



// Create a new todo with the given text
const createTodo = (text) => {
    todos.push({
        id: uuidv4(),
        text,
        completed: false
    })
    saveTodos()
}



// Remove the todo with the given id
const removeTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id === id)

    if (index >= 0) {
        todos.splice(index, 1)
        saveTodos()
    } 
}



// Toggle the completed value for the todo with the given id
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !(todo.completed)
        saveTodos()
    }   
}



loadTodos()
export {loadTodos, getTodos, createTodo, removeTodo, toggleTodo}