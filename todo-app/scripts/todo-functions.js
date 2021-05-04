'use strict'

// Fetch existing todos from local storage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    } 
}


// Save todos to local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}


// Remove the todo with the given id
const removeTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id === id)

    if (index >= 0) {
        todos.splice(index, 1)
    }
}


// Toggle the completed value for the todo with the given id
const toggleTodo = function (id) {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !(todo.completed)
    }
}


// Render application todos based on filters 
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')

    const filteredTodos = todos.filter((todo) => 
        todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        && (!filters.hideCompleted || !todo.completed))

    const incompletedTodos = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompletedTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const emptyMessageEl = document.createElement('p')
        emptyMessageEl.classList.add('empty-message')
        emptyMessageEl.textContent = 'You have no todo items.'
        todoEl.appendChild(emptyMessageEl)
    }
    
}


// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const textEl = document.createElement('span')
    const deleteButton = document.createElement('button')

    // set up the checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    containerEl.appendChild(checkbox)

    // set up the todo title text
    textEl.textContent = todo.text
    containerEl.appendChild(textEl)

    // set up container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // set up the delete button
    deleteButton.textContent = 'Delete'
    deleteButton.classList.add('button', 'button--text')
    deleteButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    todoEl.appendChild(deleteButton)

    return todoEl
}


// Get the DOM elements for list summary
const generateSummaryDOM = (incompletedTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')

    const plural = incompletedTodos.length === 1 ? '' : 's'
    summary.textContent = `You have ${incompletedTodos.length} todo${plural} left to complete.`

    return summary
}