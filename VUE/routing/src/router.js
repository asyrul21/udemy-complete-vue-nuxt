import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';
import TeamMembers from './components/teams/TeamMembers.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // redirects
    {
      path: '/',
      redirect: '/teams',
      meta: { needsAuth: true },
    },
    {
      name: 'teams',
      path: '/teams',
      //   component: TeamsList,
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
      // alias: '/', //alternative to redirect // url does not change
      // nested routes
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      //   component: UsersList,
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      beforeEnter(to, from, next) {
        console.log('/users beforeEnter:', to, from);
        next();
      },
    },
    // order matters
    // {
    //   path: '/teams/new',
    //   component: TeamsList,
    // },
    // {
    //   path: '/teams/:teamId',
    //   component: TeamMembers,
    //   //   send props via 'props' rather than this.$route.params
    //   props: true,
    // },
    // catch all routes
    // {
    //   path: '/:notFound(.*)',
    //   redirect: '/teams',
    // },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'active',
  //   linkExactActiveClass: ''
  scrollBehavior: (to, from, savedPosition) => {
    console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0,
    };
  },
});

//navigation guards
router.beforeEach((to, from, next) => {
  console.log('Global beforeEach');
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log('needs auth!');
    next();
  } else {
    next();
  }
  //   stop nav
  //   next(false);
  //   next('/users')
  //   if (to.name === 'team-members') {
  //     next();
  //   } else {
  //     //redirect
  //     next({ name: 'team-members', params: { teamId: 't2' } });
  //   }
});

router.afterEach((to, from) => {
  console.log('Global afterEach');
  console.log(to, from);
});

export default router;
