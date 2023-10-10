import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'
import aboutUs from '../views/Aboutus.vue'
import login from '../views/Login.vue'
import signup from '../views/Signup.vue'
import Liga from '../views/Liga.vue'
import Igrac from '../views/Igrac.vue'
import game from '../views/Game.vue'
import passReset from '../views/passReset.vue'
import Table from '../views/Tablica.vue'
import PartijaPodaci from '../views/PartijaPodaci.vue'

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
    path: '/passReset',
    name: 'Reset your password',
    component: passReset
  },
  {
    path: '/Liga',
    name: 'Kreiranje lige',
    component: Liga
  },
  {
    path: '/Igrac',
    name: 'Kreiranje igraca',
    component: Igrac
  },
  {
    path: '/Game',
    name: 'Kreiranje Partije',
    component: game
  },
  {
    path: '/Tablica',
    name: 'Tablica',
    component: Table
  },
  {
    path: '/PartijaPodaci',
    name: 'Podaci za utakmice',
    component: PartijaPodaci
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
