import { getToken } from 'Api/LocalStorage'

const userState = {
    namespaced: true,

    state: {
        status: false,
        token: getToken() || '',
        currentUser: {}
    },

    mutations: {
        setUser: (state, user) => state.currentUser = user,
        setToken: (state, token) => state.token = token,
        setStatus: (state, value) => state.status = value,
        updateUser: (state, payload) => {
            return state.currentUser = {
                ...state.currentUser,
                ...payload
            }
        }
    },

    actions: {
        auth: {
            root: true,
            handler(ctx, payload) {
                if (payload.token) {
                    ctx.commit('setToken', payload.token);
                }

                ctx.commit('setUser', payload.user);
                ctx.commit('setStatus', true);
            }
        },

        logout(ctx) {
            ctx.commit('setUser', {});
            ctx.commit('setStatus', false);
            ctx.commit('setToken', '');
        },

        updateStoreUserProfile(ctx, payload) {
            ctx.commit('updateUser', payload);
        }
    },
}

export default userState;