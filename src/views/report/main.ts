import 'core-js/stable';
import { createApp } from 'vue';
import App from './page';
import i18n from './i18n';

const app = createApp(App);
app.use(i18n);

app.mount('#app');
