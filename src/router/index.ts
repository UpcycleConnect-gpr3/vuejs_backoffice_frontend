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
  MyTrainingsPage,
  PlanningPage,
  AdvicePage,
  ModerationPage,
} from '@/pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: DashboardPage },

    // Entités
    { path: '/users', component: UsersPage },
    { path: '/providers', component: PrestatairePage },
    { path: '/categories', component: CategoriesPage },
    { path: '/objects', component: ObjectsPage },
    { path: '/projects', component: ProjectsPage },

    // Forum & Training
    { path: '/talks', component: TalksPage },
    { path: '/trainings', component: TrainingsPage },
    { path: '/events', component: EventsPage },

    // Système
    { path: '/deposit-requests', component: DepositRequestsPage },
    { path: '/logs', component: LogsPage },
    { path: '/settings', component: SettingsPage },

    // Staff (animateurs/formateurs)
    { path: '/staff/trainings', component: MyTrainingsPage },
    { path: '/staff/planning', component: PlanningPage },
    { path: '/staff/advice', component: AdvicePage },
    { path: '/staff/moderation', component: ModerationPage },
  ],
})

export default router
