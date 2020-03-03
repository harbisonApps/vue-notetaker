import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/notes',
    name: 'notes-page',
    component: () => import(/* webpackChunkName: "notes-page" */ '../views/Notes.vue')
  },
  {
    path: '/facts',
    name: 'facts-page',
    component: () => import(/* webpackChunkName: "facts-page" */ '../views/Facts.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/DashBoard.vue')
  },
  {
    path: '/login',
    name: 'login-page',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'register-page',
    component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
