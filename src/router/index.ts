import { createRouter, createWebHistory } from 'vue-router'
import {
  DashboardPage,
  UsersPage,
  PrestatairePage,
  CategoriesPage,
  EventsPage,
  LogsPage,
  DepositRequestsPage,
  SettingsPage,
  TalksPage,
  ProjectsPage,
  TrainingsPage,
  ObjectsPage,
} from '@/pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: DashboardPage },
    { path: '/users', component: UsersPage },
    { path: '/providers', component: PrestatairePage },
    { path: '/categories', component: CategoriesPage },
    { path: '/events', component: EventsPage },
    { path: '/logs', component: LogsPage },
    { path: '/deposit-requests', component: DepositRequestsPage },
    { path: '/settings', component: SettingsPage },
    { path: '/talks', component: TalksPage },
    { path: '/projects', component: ProjectsPage },
    { path: '/trainings', component: TrainingsPage },
    { path: '/objects', component: ObjectsPage },
  ],
})

export default router
