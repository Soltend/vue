import { createApp } from 'vue';
import createDictionary from '../Dictionary';
import createRouter from '../Router';
import store from '../Store/'
import App from '../../App.vue';
import './Axios';

import Notification from "../../BaseComponents/Notification/BaseNotification";
import Preloader from "../../BaseComponents/Preloader/BasePreloader";
import Error from "../../BaseComponents/Error/BaseError";
import Popup from "../../BaseComponents/Popup/BasePopup";

const app = createApp(App);
const dictionary = createDictionary();
const router = createRouter(store, dictionary);

app.component('Notification', Notification);
app.component('Preloader', Preloader);
app.component('Error', Error);
app.component('Popup', Popup);

app.use(dictionary).use(store).use(router);
app.mount('#app');