import { createRouter, createWebHistory } from 'vue-router'
import { DashboardPage } from '@/pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardPage,
    },
  ],
})

export default router
