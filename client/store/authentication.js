export const state = () => ({
    status: false,
    authToken: null,
    user: null
})


export const getters = {
    user: state => state.user,
    status: state => state.status,
    getToken: state => state.authToken,
    getUsername: state => state.user.username,
    getUserGroup: state => state.user.group
}


export const actions = {
    async setUserAction({ commit }, token) {
        await this.$axios
            .$get("https://nuxt-library.herokuapp.com/api/user/login", {
                withCredentials: true,
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    commit("setUser", res.user);
                }
            });
    }
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
