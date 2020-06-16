export const state = () => ({
    loans: null
})


export const getters = {
    getLoans: state => state.loans
}


export const actions = {
}

export const mutations = {
    setLoans(state, arr) {
        state.loans = arr
    },
    addLoan(state, loan) {
        state.loans = [loan, ...state.loans]
    }
}
