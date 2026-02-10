import { createApp } from 'vue';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './assets/app.css';

createApp(App).use(Quasar, { plugins: {} }).use(store).use(router).mount('#app');
