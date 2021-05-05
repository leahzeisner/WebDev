const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

// Get the filters object
const getFilters = () => filters

// Update and set the filters using the given updates
const setFilters = (updates) => {

    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }

    if (typeof updates.sortBy === 'string') {
        filters.sortBy = updates.sortBy
    }
}

export {getFilters, setFilters}