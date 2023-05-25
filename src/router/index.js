import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'
import aboutUs from '../views/Aboutus.vue'
import login from '../views/Login.vue'
import signup from '../views/Signup.vue'
import k_ligu from '../views/KreirajLIGU.vue'
import k_klub from '../views/KreirajKLUB.vue'
import k_tekmu from '../views/KreirajTEKMU.vue'

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
    component: aboutUs
  },
  {
    path: '/Login',
    name: 'LogIn',
    component: login
  },
  {
    path: '/Signup',
    name: 'SignUp',
    component: signup
  },
  {
    path: '/KreirajLigu',
    name: 'KreirajLigu',
    component: k_ligu
  },
  {
    path: '/KreirajKlub',
    name: 'KreirajKlub',
    component: k_klub
  },
  {
    path: '/KreirajUtakmicu',
    name: 'KreirajUtakmicu',
    component: k_tekmu
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
