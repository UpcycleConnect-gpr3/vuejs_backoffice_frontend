import { createRouter, createWebHistory } from 'vue-router'
import { TabBordPage } from '@/pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TabBordPage,
    },
  ],
})

export default router
