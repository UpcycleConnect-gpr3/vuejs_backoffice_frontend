import { createRouter, createWebHistory } from 'vue-router'
import { DashboardPage, UsersPage, PrestatairePage, CategoriesPage, EventsPage } from '@/pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardPage,
    },
    {
      path: '/users',
      component: UsersPage,
    },
    {
      path: '/providers',
      component: PrestatairePage,
    },
    {
      path: '/categories',
      component: CategoriesPage,
    },
    {
      path: '/events',
      component: EventsPage,
    },
  ],
})

export default router
