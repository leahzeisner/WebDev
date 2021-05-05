import moment from 'moment'
import { getFilters } from './filters.js'
import {sortNotes, getNotes} from './notes.js'


// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // set up the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed Note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // set up the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    // set up the status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl) 

    return noteEl
}



// Render application notes
const renderNotes = () => {
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)

    const notesEl = document.querySelector('#notes')

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'You have no notes.'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    } 
}



// Initialize the edit page
const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const timeElement = document.querySelector('#last-edited')

    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)

    if (!note) {
        location.assign('/index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    timeElement.textContent = generateLastEdited(note.updatedAt)
}



// Generate the 'last edited' message
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}.`


export {generateNoteDOM, renderNotes, initializeEditPage, generateLastEdited}