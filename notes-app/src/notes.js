import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

// Expose the data stored in the notes array
const getNotes = () => notes



// Read existing notes from local storage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}



// Save the notes to local storage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}



// Create a note at this moment
const createNote = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        createdAt: timestamp,
        updatedAt: timestamp,
        id: id,
        title: '',
        body: ''
    })
    saveNotes()

    return id
}



// Update the note with the given id using the given updates
const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return
    }

    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    } 

    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()

    return note
}



// Remove a note from the list
const removeNote = (id) => {
    const index = notes.findIndex((note) => note.id === id)

    if (index >= 0) {
        notes.splice(index, 1)
        saveNotes()
    }
}



// Sort the notes by 1 of 3 ways
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byAlpha') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}




notes = loadNotes()

export {getNotes, createNote, removeNote, sortNotes, updateNote}