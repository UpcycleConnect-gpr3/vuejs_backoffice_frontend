import { ref, computed, onMounted } from 'vue'
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  type Event,
  type EventPayload,
} from '@/api/events'
import { useToasts } from '@/stores/toasts'

const MOCK: Event[] = [
  { id: 1, title: 'Repair Café Paris 11e', date: '2026-04-20' },
  { id: 2, title: 'Troc & Échange Bordeaux', date: '2026-04-25' },
  { id: 3, title: 'Atelier Textile Lyon', date: '2026-03-15' },
]

const emptyForm = (): EventPayload => ({
  title: '',
  date: '',
})

export function useEvents() {
  const toasts = useToasts()
  const events = ref<Event[]>(MOCK)
  const loading = ref(false)

  const showModal = ref(false)
  const editingId = ref<number | null>(null)
  const form = ref<EventPayload>(emptyForm())

  const confirmId = ref<number | null>(null)

  const filtered = computed(() => events.value)

  async function load() {
    loading.value = true
    try {
      events.value = await fetchEvents()
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

  function openEdit(event: Event) {
    editingId.value = event.id
    form.value = { title: event.title, date: event.date }
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  async function save() {
    try {
      if (editingId.value === null) {
        const created = await createEvent(form.value)
        events.value.unshift(created)
        toasts.success('Événement créé')
      } else {
        const updated = await updateEvent(editingId.value, form.value)
        const idx = events.value.findIndex((e) => e.id === editingId.value)
        if (idx !== -1) events.value[idx] = updated
        toasts.success('Événement mis à jour')
      }
      closeModal()
    } catch {
      toasts.error('Échec de l’enregistrement de l’événement')
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
      await deleteEvent(id)
      events.value = events.value.filter((e) => e.id !== id)
      toasts.success('Événement supprimé')
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
