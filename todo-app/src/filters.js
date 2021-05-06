const filters = {
    searchText: '',
    hideCompleted: false
}

// Get the filters object
const getFilters = () => filters


// Update and set the filters using the given updates
const setFilters = ({searchText, hideCompleted}) => {
    if (typeof searchText === 'string') {
        filters.searchText = searchText
    }

    if (typeof hideCompleted === 'boolean') {
        filters.hideCompleted = hideCompleted
    }
}
 
export {getFilters, setFilters}
