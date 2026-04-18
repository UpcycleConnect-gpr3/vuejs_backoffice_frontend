import { ref, onMounted } from 'vue'
import {
  fetchDashboardStats,
  fetchPendingActions,
  fetchActivityLogs,
  type DashboardStats,
  type PendingAction,
  type ActivityLog,
} from '@/api/dashboard'

const MOCK_STATS: DashboardStats = {
  usersCount: 19,
  prestatairesCount: 19,
  prestatairesDistribution: {
    labels: ['Validés', 'En attente', 'Rejetés'],
    values: [8, 7, 4],
  },
}

const MOCK_PENDING: PendingAction[] = [
  {
    id: 1,
    icon: 'briefcase',
    title: 'Valider Prestataires',
    description: 'lorem fbehjrgbe grhjbegejhgb regbelgjhkrb:',
    link: '/prestataire',
  },
]

const MOCK_LOGS: ActivityLog[] = [
  { id: 1, adminName: "Nom d'admin", action: 'logs', createdAt: new Date().toISOString() },
  { id: 2, adminName: "Nom d'admin", action: 'logs', createdAt: new Date().toISOString() },
  { id: 3, adminName: "Nom d'admin", action: 'logs', createdAt: new Date().toISOString() },
]

export function useDashboard() {
  const stats = ref<DashboardStats>(MOCK_STATS)
  const pendingActions = ref<PendingAction[]>(MOCK_PENDING)
  const activityLogs = ref<ActivityLog[]>(MOCK_LOGS)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      const [s, p, l] = await Promise.all([
        fetchDashboardStats(),
        fetchPendingActions(),
        fetchActivityLogs(),
      ])
      stats.value = s
      pendingActions.value = p
      activityLogs.value = l
    } catch {
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return { stats, pendingActions, activityLogs, loading, error }
}
