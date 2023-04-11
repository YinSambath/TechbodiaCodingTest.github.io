import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
const routes = [
  { path: '/', name: 'list-country', component: () => import('./../view/list/index') },
]

const router = createRouter({
  history: process.env.NODE_ENV === 'development'
      ? createWebHashHistory(process.env.VUE_APP_BASE_URL)
      : createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

export default router