export const state = () => ({
    books: []
})


export const getters = {
    getBooks: state => state.books
}


export const actions = {

}

export const mutations = {
    addBook(state, book) {
        state.books = [...state.books, book]
    },
    setInitialBooks(state, arr) {
        state.books = [...arr]
    }
}
