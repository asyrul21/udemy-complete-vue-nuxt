// import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Store from './store/index';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
// async component / lazy loading
// DONT / ANTIPATTERN
// const CoachDetail = defineAsyncComponent(() =>
//   import('./pages/coaches/CoachDetail.vue')
// );
// DO:
const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');

// DONT:
// const CoachRegistration = defineAsyncComponent(() =>
//   import('./pages/coaches/CoachRegistration.vue')
// );
// DO:
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');

import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';

import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';

import UserAuth from './pages/auth/UserAuth.vue';

import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoach,
        },
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: {
        requiresUnauth: true,
      },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

// global navigation guards with metadata
router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !Store.getters.isAuthenticated) {
    // deny
    // next(false) // cancel
    next('/auth');
  } else if (to.meta.requiresUnauth && Store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
