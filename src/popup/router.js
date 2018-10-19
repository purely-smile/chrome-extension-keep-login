import Vue from 'vue'
import VueRouter from 'vue-router'
import userArea from './views/user-area'
import history from './views/history'

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
]

const router = new VueRouter({
  routes,
})

export default router
