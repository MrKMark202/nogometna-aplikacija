import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/About us',
    name: 'About us',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About us.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
