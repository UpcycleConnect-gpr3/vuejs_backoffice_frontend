import { createRouter, createWebHistory } from 'vue-router'
import { DashboardPage, UsersPage } from '@/pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardPage,
    },
    {
      path: '/utilisateur',
      component: UsersPage,
    },
  ],
})

export default router
