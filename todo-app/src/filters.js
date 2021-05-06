const filters = {
    searchText: '',
    hideCompleted: false
}

// Get the filters object
const getFilters = () => filters


// Update and set the filters using the given updates
const setFilters = (updates) => {
    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }

    if (typeof updates.hideCompleted === 'boolean') {
        filters.hideCompleted = updates.hideCompleted
    }
}
 
export {getFilters, setFilters}