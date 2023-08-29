import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import BaseModal from './components/BaseModal.vue';
import AllUsers from './pages/AllUsers.vue';
import CoarseGoals from './pages/CourseGoals.vue';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AllUsers,
    },
    {
      path: '/goals',
      component: CoarseGoals,
    },
  ],
});
app.use(router);
app.component('base-modal', BaseModal);

// prevent animation on page load/start up
router.isReady().then(() => {
  app.mount('#app');
});
