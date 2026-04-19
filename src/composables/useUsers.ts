import { ref, computed, onMounted } from 'vue'
import { fetchUsers, deleteUser, updateUserStatus, type User } from '@/api/users'

const MOCK_USERS: User[] = [
  { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'admin', status: 'actif', createdAt: '2024-01-10T10:00:00Z' },
  { id: 2, name: 'Bob Dupont', email: 'bob@example.com', role: 'user', status: 'actif', createdAt: '2024-02-14T09:30:00Z' },
  { id: 3, name: 'Claire Moreau', email: 'claire@example.com', role: 'prestataire', status: 'inactif', createdAt: '2024-03-01T14:00:00Z' },
  { id: 4, name: 'David Leroy', email: 'david@example.com', role: 'user', status: 'suspendu', createdAt: '2024-03-20T11:00:00Z' },
  { id: 5, name: 'Emma Bernard', email: 'emma@example.com', role: 'user', status: 'actif', createdAt: '2024-04-05T16:00:00Z' },
]

export function useUsers() {
  const users = ref<User[]>(MOCK_USERS)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const search = ref('')
  const filterStatus = ref<User['status'] | 'tous'>('tous')

  const filtered = computed(() =>
    users.value.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.value.toLowerCase()) ||
        u.email.toLowerCase().includes(search.value.toLowerCase())
      const matchStatus = filterStatus.value === 'tous' || u.status === filterStatus.value
      return matchSearch && matchStatus
    }),
  )

  async function load() {
    loading.value = true
    error.value = null
    try {
      users.value = await fetchUsers()
    } catch {
    } finally {
      loading.value = false
    }
  }

  async function remove(id: number) {
    await deleteUser(id)
    users.value = users.value.filter((u) => u.id !== id)
  }

  async function changeStatus(id: number, status: User['status']) {
    const updated = await updateUserStatus(id, status)
    const idx = users.value.findIndex((u) => u.id === id)
    if (idx !== -1) users.value[idx] = updated
  }

  onMounted(load)

  return { filtered, loading, error, search, filterStatus, remove, changeStatus }
}
