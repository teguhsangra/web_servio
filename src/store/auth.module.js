import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user 
    ? { status: { loggedIn: true, isMember: user.access_token != null ? true : false }, user }
    : { status: { loggedIn: false, isMember: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        guest({ commit }) {
           
            commit('loginGuest');
            return Promise.resolve(true);
        },
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        },
        me({ commit }, id) {
            return AuthService.getDataProfile(id).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        loginGuest(state) {
            state.status.loggedIn = true;
            state.status.isMember = false;
            state.user = null
            localStorage.setItem('user', JSON.stringify({
                nama: 'Guest',
                access_token: null
            }));
        },
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.status.isMember = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.status.isMember = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.status.isMember = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
            state.status.isMember = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
            state.status.isMember = false;
        }
    }
};