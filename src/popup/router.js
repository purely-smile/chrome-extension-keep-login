import Vue from 'vue'
import VueRouter from 'vue-router'
import { userArea, history, paperData } from './views'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'user-area' },
  },
  {
    path: '/user-area',
    name: 'user-area',
    component: userArea,
  },
  {
    path: '/history',
    name: 'history',
    component: history,
  },
  {
    path: '/paper-data',
    name: 'paper-data',
    component: paperData,
  },
]

const router = new VueRouter({
  routes,
})

export default router
