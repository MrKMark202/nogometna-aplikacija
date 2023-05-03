import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/AboutUs',
    name: 'About us',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutUs.vue')
  },
  {
    path: '/LogIN',
    name: 'LogIn',
    component: () => import(/* webpackChunkName: "about" */ '../views/LogIN.vue')
  },
  {
    path: '/SignUP',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUP.vue')
  },
  {
    path: '/KreirajLigu',
    name: 'KreirajLigu',
    component: () => import(/* webpackChunkName: "about" */ '../views/KreirajLIGU.vue')
  },
  {
    path: '/KreirajKlub',
    name: 'KreirajKlub',
    component: () => import(/* webpackChunkName: "about" */ '../views/KreirajKLUB.vue')
  },
  {
    path: '/KreirajUtakmicu',
    name: 'KreirajUtakmicu',
    component: () => import(/* webpackChunkName: "about" */ '../views/KreirajTEKMU.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
