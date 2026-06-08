import { ref, computed, onMounted } from 'vue'
import { fetchUsers, deleteUser, updateUser, type User, type UserPayload } from '@/api/users'
import { useToasts } from '@/stores/toasts'

const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'amartin',
    firstname: 'Alice',
    lastname: 'Martin',
    email: 'alice@example.com',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z',
  },
  {
    id: 'u2',
    username: 'bdupont',
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob@example.com',
    created_at: '2024-02-14T09:30:00Z',
    updated_at: '2024-02-14T09:30:00Z',
  },
  {
    id: 'u3',
    username: 'cmoreau',
    firstname: 'Claire',
    lastname: 'Moreau',
    email: 'claire@example.com',
    created_at: '2024-03-01T14:00:00Z',
    updated_at: '2024-03-01T14:00:00Z',
  },
  {
    id: 'u4',
    username: 'dleroy',
    firstname: 'David',
    lastname: 'Leroy',
    email: 'david@example.com',
    created_at: '2024-03-20T11:00:00Z',
    updated_at: '2024-03-20T11:00:00Z',
  },
  {
    id: 'u5',
    username: 'ebernard',
    firstname: 'Emma',
    lastname: 'Bernard',
    email: 'emma@example.com',
    created_at: '2024-04-05T16:00:00Z',
    updated_at: '2024-04-05T16:00:00Z',
  },
]

const emptyForm = (): UserPayload => ({ username: '', firstname: '', lastname: '' })

export function useUsers() {
  const toasts = useToasts()
  const users = ref<User[]>(MOCK_USERS)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const search = ref('')

  // Read-only detail modal.
  const showDetail = ref(false)
  const detailUser = ref<User | null>(null)

  // Edit modal. NOTE: forum users API has GET/PUT/DELETE only — no POST create,
  // so user creation is not offered.
  const showModal = ref(false)
  const editingId = ref<string | null>(null)
  const form = ref<UserPayload>(emptyForm())

  const confirmId = ref<string | null>(null)

  const filtered = computed(() =>
    users.value.filter((u) => {
      const q = search.value.toLowerCase()
      return (
        (u.username ?? '').toLowerCase().includes(q) ||
        (u.firstname ?? '').toLowerCase().includes(q) ||
        (u.lastname ?? '').toLowerCase().includes(q) ||
        (u.email ?? '').toLowerCase().includes(q)
      )
    }),
  )

  async function load() {
    loading.value = true
    error.value = null
    try {
      users.value = await fetchUsers()
    } catch {
      // Fall back to mock data when the forum backend is unreachable.
    } finally {
      loading.value = false
    }
  }

  function openDetail(user: User) {
    detailUser.value = user
    showDetail.value = true
  }

  function closeDetail() {
    showDetail.value = false
  }

  function openEdit(user: User) {
    editingId.value = user.id
    form.value = { username: user.username, firstname: user.firstname, lastname: user.lastname }
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  async function save() {
    if (editingId.value === null) return
    try {
      const updated = await updateUser(editingId.value, form.value)
      const idx = users.value.findIndex((u) => u.id === editingId.value)
      if (idx !== -1) users.value[idx] = updated ?? { ...users.value[idx], ...form.value }
      toasts.success('Utilisateur mis à jour')
    } catch {
      toasts.error('Échec de la mise à jour')
    } finally {
      closeModal()
    }
  }

  function askRemove(id: string) {
    confirmId.value = id
  }

  function cancelRemove() {
    confirmId.value = null
  }

  async function confirmRemove() {
    if (confirmId.value === null) return
    const id = confirmId.value
    try {
      await deleteUser(id)
      users.value = users.value.filter((u) => u.id !== id)
      toasts.success('Utilisateur supprimé')
    } catch {
      toasts.error('Échec de la suppression')
    } finally {
      confirmId.value = null
    }
  }

  onMounted(load)

  return {
    filtered,
    loading,
    error,
    search,
    showDetail,
    detailUser,
    showModal,
    editingId,
    form,
    confirmId,
    openDetail,
    closeDetail,
    openEdit,
    closeModal,
    save,
    askRemove,
    cancelRemove,
    confirmRemove,
  }
}
