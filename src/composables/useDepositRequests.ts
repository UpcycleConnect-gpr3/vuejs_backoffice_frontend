import { ref, computed, onMounted } from 'vue'
import { fetchDepositRequests, updateDepositStatus, type DepositRequest, type DepositStatus } from '@/api/deposit-requests'

const MOCK: DepositRequest[] = [
  { id: 1, objectName: 'Chaise en bois', objectDescription: 'Chaise ancienne en chêne, quelques égratignures.', category: null, requesterName: 'Marc Lefebvre', requesterEmail: 'marc@email.fr', status: 'en-attente', createdAt: '2026-04-19T10:30:00Z' },
  { id: 2, objectName: 'Veste en cuir', objectDescription: 'Veste homme taille L, bon état général.', category: null, requesterName: 'Sophie Renard', requesterEmail: 'sophie@email.fr', status: 'en-attente', createdAt: '2026-04-19T08:15:00Z' },
  { id: 3, objectName: 'Lampe de bureau', objectDescription: 'Lampe articulée vintage, fonctionne parfaitement.', category: null, requesterName: 'Pierre Morel', requesterEmail: 'pierre@email.fr', status: 'validee', createdAt: '2026-04-18T14:00:00Z' },
  { id: 4, objectName: 'Téléphone Nokia 3310', objectDescription: 'Téléphone rétro en état de marche.', category: null, requesterName: 'Julie Blanc', requesterEmail: 'julie@email.fr', status: 'validee', createdAt: '2026-04-17T11:20:00Z' },
  { id: 5, objectName: 'Cartons d\'emballage', objectDescription: 'Lot de 20 cartons de taille variée.', category: null, requesterName: 'Thomas Petit', requesterEmail: 'thomas@email.fr', status: 'fermee', createdAt: '2026-04-15T09:00:00Z' },
]

export function useDepositRequests() {
  const requests = ref<DepositRequest[]>(MOCK)
  const loading = ref(false)
  const filterStatus = ref<DepositStatus | 'tous'>('tous')

  const filtered = computed(() =>
    requests.value.filter((r) =>
      filterStatus.value === 'tous' ? true : r.status === filterStatus.value,
    ),
  )

  const pendingCount = computed(() => requests.value.filter((r) => r.status === 'en-attente').length)

  async function load() {
    loading.value = true
    try {
      requests.value = await fetchDepositRequests()
    } catch {
    } finally {
      loading.value = false
    }
  }

  async function validate(id: number) {
    const updated = await updateDepositStatus(id, 'validee')
    const idx = requests.value.findIndex((r) => r.id === id)
    if (idx !== -1) requests.value[idx] = updated
  }

  async function close(id: number) {
    const updated = await updateDepositStatus(id, 'fermee')
    const idx = requests.value.findIndex((r) => r.id === id)
    if (idx !== -1) requests.value[idx] = updated
  }

  onMounted(load)

  return { filtered, loading, filterStatus, pendingCount, validate, close }
}
