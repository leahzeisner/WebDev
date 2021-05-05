import { updateNote, removeNote } from './notes'
import {initializeEditPage, generateLastEdited} from './views'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const timeElement = document.querySelector('#last-edited')
const deleteElement = document.querySelector('#delete-note')

const noteId = location.hash.substring(1)
initializeEditPage(noteId)

titleElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value,
    })
    timeElement.textContent = generateLastEdited(note.updatedAt)
    
}) 

bodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value,
    })
    timeElement.textContent = generateLastEdited(note.updatedAt)
}) 

deleteElement.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})