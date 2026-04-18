import { createRouter, createWebHistory } from 'vue-router'
import { DashboardPage, UsersPage, PrestatairePage } from '@/pages'

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
    {
      path: '/prestataire',
      component: PrestatairePage,
    },
  ],
})

export default router
