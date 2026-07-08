import { ref, computed, onMounted, watch } from 'vue'
import {
  fetchTalks,
  createTalk,
  updateTalk,
  deleteTalk,
  type Talk,
  type CreateTalkPayload,
} from '@/api/talks'
import { useToasts } from '@/stores/toasts'

const MOCK: Talk[] = [
  {
    id: 1,
    title: 'How to upcycle pallets',
    type: 'discussion',
    status: 'open',
    description: 'Astuces palettes',
    created_at: '2026-03-10T00:00:00Z',
    updated_at: '2026-03-10T00:00:00Z',
  },
  {
    id: 2,
    title: 'Textile waste collection tips',
    type: 'discussion',
    status: 'open',
    description: 'Collecte textile',
    created_at: '2026-03-12T00:00:00Z',
    updated_at: '2026-03-12T00:00:00Z',
  },
  {
    id: 3,
    title: 'Electronic components sourcing',
    type: 'discussion',
    status: 'closed',
    description: 'Sourcing composants',
    created_at: '2026-03-14T00:00:00Z',
    updated_at: '2026-03-14T00:00:00Z',
  },
]

const emptyForm = (): CreateTalkPayload => ({
  title: '',
  type: 'discussion',
  status: 'open',
  description: '',
})

export function useTalks() {
  const toasts = useToasts()
  const talks = ref<Talk[]>(MOCK)
  const loading = ref(false)
  const search = ref('')

  const showModal = ref(false)
  const editingId = ref<number | null>(null)
  const form = ref<CreateTalkPayload>(emptyForm())
  const confirmId = ref<number | null>(null)

  const page = ref(1)
  const pageSize = 10

  const filtered = computed(() =>
    talks.value.filter((t) =>
      `${t.title} ${t.description}`.toLowerCase().includes(search.value.toLowerCase()),
    ),
  )

  const paginated = computed(() =>
    filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize),
  )

  watch(search, () => {
    page.value = 1
  })
  watch(
    () => Math.max(1, Math.ceil(filtered.value.length / pageSize)),
    (pc) => {
      if (page.value > pc) page.value = pc
    },
  )

  async function load() {
    loading.value = true
    try {
      talks.value = await fetchTalks()
    } catch {

    } finally {
      loading.value = false
    }
  }

  function openCreate() {
    editingId.value = null
    form.value = emptyForm()
    showModal.value = true
  }

  function openEdit(t: Talk) {
    editingId.value = t.id

    form.value = { title: t.title, type: t.type, status: t.status, description: t.description }
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  async function save() {
    try {
      if (editingId.value === null) {
        const created = await createTalk(form.value)
        talks.value.unshift(created)
        toasts.success('Talk créé')
      } else {

        const updated = await updateTalk(editingId.value, {
          title: form.value.title,
          status: form.value.status,
        })
        const idx = talks.value.findIndex((t) => t.id === editingId.value)
        if (idx !== -1) talks.value[idx] = updated
        toasts.success('Talk mis à jour')
      }
      closeModal()
    } catch {
      toasts.error('Échec de l’enregistrement du talk')
    }
  }

  function askRemove(id: number) {
    confirmId.value = id
  }

  function cancelRemove() {
    confirmId.value = null
  }

  async function confirmRemove() {
    if (confirmId.value === null) return
    const id = confirmId.value
    try {
      await deleteTalk(id)
      talks.value = talks.value.filter((t) => t.id !== id)
      toasts.success('Talk supprimé')
    } catch {
      toasts.error('Échec de la suppression')
    } finally {
      confirmId.value = null
    }
  }

  onMounted(load)

  return {
    talks,
    filtered,
    paginated,
    loading,
    search,
    page,
    pageSize,
    showModal,
    editingId,
    form,
    confirmId,
    openCreate,
    openEdit,
    closeModal,
    save,
    askRemove,
    cancelRemove,
    confirmRemove,
  }
}
