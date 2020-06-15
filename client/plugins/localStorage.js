import Cookies from "js-cookie";
import createPersistedState from 'vuex-persistedstate';

let cookieStorage = {
    getItem: function (key) {
        return Cookies.getJSON(key);
    },
    setItem: function (key, value) {
        return Cookies.set(key, value, { expires: 3, secure: false });
    },
    removeItem: function (key) {
        return Cookies.remove(key);
    }
};

export default (context) => {
    createPersistedState({
        storage: cookieStorage,
        getState: cookieStorage.getItem,
        setState: cookieStorage.setItem
    })(context.store);
};
