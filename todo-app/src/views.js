import {getTodos, toggleTodo, removeTodo} from './todos'
import {getFilters} from './filters'

// Render application todos based on filters 
const renderTodos = () => {
    const todoEl = document.querySelector('#todos')
    const {searchText, hideCompleted} = getFilters() 
    
    const filteredTodos = getTodos().filter((todo) => 
        todo.text.toLowerCase().includes(searchText.toLowerCase())
        && (!hideCompleted || !todo.completed))

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
        renderTodos()
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
        renderTodos()
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


export {renderTodos, generateTodoDOM, generateSummaryDOM}
