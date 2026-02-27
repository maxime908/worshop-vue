import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { recupId } from '@/store/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/post/',
      name: 'post',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NewView.vue'),
      children: [
        {
          path: 'update/:id',
          name: 'update',
          component: () => import('../views/NewView.vue'),
        },
      ]
    },
    {
        path: '/delete/:id',
        name: 'delete',
        component: () => import('../views/DeleteView.vue'),
        beforeEnter: (to, from, next) => {
            if (recupId(to.params.id).id_user !== JSON.parse(localStorage.getItem("is_authentificated"))["id"]) {
              next({name: 'home'})
            } else {
              next(true)
            }
        },
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/log/',
      name: 'log',
      children: [
        {
          path: 'logup',
          name: 'logup',
          component: () => import('../views/LogupView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/LoginView.vue'),
        },
      ],
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("is_authentificated")) {
          next({ name: 'home' });
        } else {
          next(true)
        }
      },
    },
    {
      path: '/logout',
      name: 'logout',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("is_authentificated")) {
          localStorage.removeItem("is_authentificated");
          window.location.href = "/log/login"
        }
      },
    },
    {
      path: '/search',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Search.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'logup' && !localStorage.getItem("is_authentificated")) next({ name: 'login' })
  else next(true)
})

export default router