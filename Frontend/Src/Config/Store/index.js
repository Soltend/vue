import { createStore } from 'vuex';
import user from './Modules/User';

export default createStore({
    modules: {
        user
    }
})