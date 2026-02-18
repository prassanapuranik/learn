import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import quasarLang from 'quasar/lang/en-US';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(Quasar, {
  plugins: { Notify },
  lang: quasarLang
});
app.use(store);
app.use(router);

app.mount('#app');
