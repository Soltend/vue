import { entryCheckUser, entryCheckAuth } from '../Middleware/Entry';

import Lobby from 'Pages/Lobby/BaseLobby.vue';
import Auth from 'Pages/Lobby/Components/LobbyAuth.vue';
import Registration from 'Pages/Lobby/Components/LobbyRegistration.vue';
import Recovery from 'Pages/Lobby/Components/LobbyRecovery.vue';

const lobbyRoutes = {
    path: '/auth',
    name: 'Lobby',
    component: Lobby,
    meta: {
        title: 'auth',
        middleware: [
            entryCheckUser,
            entryCheckAuth
        ]
    },
    children: [
        {
            path: '/auth',
            name: 'Auth',
            component: Auth,
            meta: {
                title: 'login',
            },
        },
        {
            path: '/registration',
            name: 'Registration',
            component: Registration,
            meta: {
                title: 'registration',
            },
        },
        {
            path: '/recovery',
            name: 'Recovery',
            component: Recovery,
            meta: {
                title: 'recovery',
            }
        }
    ]
}

export default lobbyRoutes;