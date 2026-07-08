import { createRouter, createWebHistory } from 'vue-router'
import { isAdmin, redirectToLogin } from '@/auth/session'
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

// Garde globale : le back office est reserve aux administrateurs connectes.
// Sans session admin valide (cookie bearer_token, role administrator, non
// expire), on redirige vers le portail de connexion.
router.beforeEach(() => {
  if (!isAdmin()) {
    redirectToLogin()
    return false
  }
  return true
})

export default router
