export const state = () => ({
    status: false,
    authToken: null,
    user: null
})


export const getters = {
    user: state => state.user,
    status: state => state.status,
    getToken: state => state.authToken,
    getUsername: state => state.user.username
}


export const actions = {

}

export const mutations = {
    setUser(state, user) {
        state.user = user
        state.status = true
    },
    setToken(state, token) {
        state.authToken = token
    },
    clearData(state) {
        state.authToken = null
        state.user = null
        state.status = false
    }
}
