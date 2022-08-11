import { userCheckRequest } from 'Api/Auth';
import { getToken, removeToken } from 'Api/LocalStorage'

const entryCheckUser = async ({ next, store, nextMiddleware }) => {
    const token = getToken();

    if (!token || store.state.user.status) {
        return nextMiddleware();
    }

    const { result } = await userCheckRequest({
        token: token
    });

    if (result) {
        store.dispatch('auth', {
            user: result
        });
    } else {
        removeToken();
        return next('/auth');
    }

    return nextMiddleware();
}

const entryCheckPersonal = ({ next, store, nextMiddleware }) => {
    if (!store.state.user.status) {
        return next('/auth');
    }

    return nextMiddleware();
}

const entryCheckAuth = ({ next, store, nextMiddleware }) => {
    if (store.state.user.status) {
        return next('/');
    }
    return nextMiddleware();
}

export { entryCheckUser, entryCheckPersonal, entryCheckAuth }