import { ref, computed, onMounted } from 'vue'
import { fetchEvents, createEvent, updateEvent, deleteEvent, type Event, type EventPayload } from '@/api/events'

const MOCK: Event[] = [
  { id: 1, title: 'Repair Café Paris 11e', description: 'Atelier de réparation collective.', location: 'Paris 11e', startDate: '2026-04-20T10:00', endDate: '2026-04-20T18:00', status: 'en-cours' },
  { id: 2, title: 'Troc & Échange Bordeaux', description: 'Échange d\'objets upcyclés.', location: 'Bordeaux', startDate: '2026-04-25T09:00', endDate: '2026-04-25T17:00', status: 'a-venir' },
  { id: 3, title: 'Atelier Textile Lyon', description: 'Création de vêtements à partir de tissus recyclés.', location: 'Lyon', startDate: '2026-03-15T14:00', endDate: '2026-03-15T19:00', status: 'termine' },
]

const emptyForm = (): EventPayload => ({
  title: '',
  description: '',
  location: '',
  startDate: '',
  endDate: '',
  status: 'a-venir',
})

export function useEvents() {
  const events = ref<Event[]>(MOCK)
  const loading = ref(false)
  const filterStatus = ref<Event['status'] | 'tous'>('tous')

  const showModal = ref(false)
  const editingId = ref<number | null>(null)
  const form = ref<EventPayload>(emptyForm())

  const filtered = computed(() =>
    events.value.filter((e) =>
      filterStatus.value === 'tous' ? true : e.status === filterStatus.value,
    ),
  )

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
    form.value = { title: event.title, description: event.description, location: event.location, startDate: event.startDate, endDate: event.endDate, status: event.status }
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  async function save() {
    if (editingId.value !== null) {
      const updated = await updateEvent(editingId.value, form.value)
      const idx = events.value.findIndex((e) => e.id === editingId.value)
      if (idx !== -1) events.value[idx] = updated
    } else {
      const created = await createEvent(form.value)
      events.value.unshift(created)
    }
    closeModal()
  }

  async function remove(id: number) {
    await deleteEvent(id)
    events.value = events.value.filter((e) => e.id !== id)
  }

  onMounted(load)

  return { filtered, loading, filterStatus, showModal, editingId, form, openCreate, openEdit, closeModal, save, remove }
}
