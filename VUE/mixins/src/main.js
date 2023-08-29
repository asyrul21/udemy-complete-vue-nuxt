import { createApp } from 'vue';
import LoggerMixin from './mixins/logger';

import App from './App.vue';

const app = createApp(App);

app.mixin(LoggerMixin);

app.mount('#app');
