import { ref, computed, onMounted } from 'vue'
import { fetchLogs, type Log, type LogAction, type LogResource } from '@/api/logs'

const MOCK: Log[] = [
  { id: 1, adminName: 'Alice Martin', action: 'create', resource: 'event', resourceId: 3, details: 'Création de l\'événement "Repair Café Paris 11e"', createdAt: '2026-04-19T09:12:00Z' },
  { id: 2, adminName: 'Alice Martin', action: 'update', resource: 'user', resourceId: 4, details: 'Suspension du compte de David Leroy', createdAt: '2026-04-19T09:05:00Z' },
  { id: 3, adminName: 'Bob Dupont', action: 'delete', resource: 'category', resourceId: 8, details: 'Suppression de la catégorie "Autre"', createdAt: '2026-04-18T17:44:00Z' },
  { id: 4, adminName: 'Alice Martin', action: 'login', resource: 'auth', resourceId: null, details: 'Connexion au backoffice', createdAt: '2026-04-18T08:30:00Z' },
  { id: 5, adminName: 'Bob Dupont', action: 'update', resource: 'prestataire', resourceId: 2, details: 'Mise à jour du contact de RecycloTech', createdAt: '2026-04-17T14:20:00Z' },
  { id: 6, adminName: 'Bob Dupont', action: 'login', resource: 'auth', resourceId: null, details: 'Connexion au backoffice', createdAt: '2026-04-17T08:55:00Z' },
  { id: 7, adminName: 'Alice Martin', action: 'create', resource: 'prestataire', resourceId: 3, details: 'Création du prestataire "EcoRestore"', createdAt: '2026-04-16T11:10:00Z' },
  { id: 8, adminName: 'Alice Martin', action: 'delete', resource: 'user', resourceId: 7, details: 'Suppression du compte utilisateur #7', createdAt: '2026-04-15T15:33:00Z' },
]

export function useLogs() {
  const logs = ref<Log[]>(MOCK)
  const loading = ref(false)
  const filterAction = ref<LogAction | 'tous'>('tous')
  const filterResource = ref<LogResource | 'tous'>('tous')

  const filtered = computed(() =>
    logs.value.filter((l) => {
      const matchAction = filterAction.value === 'tous' || l.action === filterAction.value
      const matchResource = filterResource.value === 'tous' || l.resource === filterResource.value
      return matchAction && matchResource
    }),
  )

  async function load() {
    loading.value = true
    try {
      logs.value = await fetchLogs()
    } catch {
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return { filtered, loading, filterAction, filterResource }
}
