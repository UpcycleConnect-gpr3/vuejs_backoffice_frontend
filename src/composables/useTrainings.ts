import { ref, computed, onMounted, watch } from 'vue'
import {
  fetchTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
  validateTraining,
  rejectTraining,
  type Training,
  type TrainingPayload,
} from '@/api/trainings'
import { useToasts } from '@/stores/toasts'

const MOCK: Training[] = [
  {
    id: 1,
    name: 'Upcycling intro',
    type: 'Workshop',
    mode_of_delivery: 'On-site',
    duration: '2h',
    minimum_number_of_participants: 4,
    maximum_number_of_participants: 12,
    location: 'Paris',
  },
  {
    id: 2,
    name: 'Circular economy certification',
    type: 'Course',
    mode_of_delivery: 'Hybrid',
    duration: '40h',
    minimum_number_of_participants: 8,
    maximum_number_of_participants: 20,
    location: 'Lyon',
  },
  {
    id: 3,
    name: 'Textile recycling',
    type: 'Workshop',
    mode_of_delivery: 'Online',
    duration: '3h',
    minimum_number_of_participants: 5,
    maximum_number_of_participants: 30,
    location: 'Remote',
  },
]

const emptyForm = (): TrainingPayload => ({
  name: '',
  type: '',
  mode_of_delivery: '',
  duration: '',
  minimum_number_of_participants: 0,
  maximum_number_of_participants: 0,
  location: '',
})

export function useTrainings() {
  const toasts = useToasts()
  const trainings = ref<Training[]>(MOCK)
  const loading = ref(false)
  const search = ref('')

  const showModal = ref(false)
  const editingId = ref<number | null>(null)
  const form = ref<TrainingPayload>(emptyForm())
  const confirmId = ref<number | null>(null)

  const page = ref(1)
  const pageSize = 10

  const filtered = computed(() =>
    trainings.value.filter((t) =>
      `${t.name} ${t.type} ${t.location}`.toLowerCase().includes(search.value.toLowerCase()),
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
      trainings.value = await fetchTrainings()
    } catch {

    } finally {
      loading.value = false
    }
  }

  async function validate(id: number) {
    try {
      await validateTraining(id)
      toasts.success('Formation validée')
      await load()
    } catch {
      toasts.error('Validation impossible (rôle responsable requis).')
    }
  }

  async function reject(id: number) {
    try {
      await rejectTraining(id)
      toasts.success('Formation refusée')
      await load()
    } catch {
      toasts.error('Action impossible (rôle responsable requis).')
    }
  }

  function openCreate() {
    editingId.value = null
    form.value = emptyForm()
    showModal.value = true
  }

  function openEdit(t: Training) {
    editingId.value = t.id
    form.value = {
      name: t.name,
      type: t.type,
      mode_of_delivery: t.mode_of_delivery,
      duration: t.duration,
      minimum_number_of_participants: t.minimum_number_of_participants,
      maximum_number_of_participants: t.maximum_number_of_participants,
      location: t.location,
    }
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  async function save() {
    try {
      if (editingId.value === null) {
        const created = await createTraining(form.value)
        trainings.value.unshift(created)
        toasts.success('Formation créée')
      } else {
        const updated = await updateTraining(editingId.value, form.value)
        const idx = trainings.value.findIndex((t) => t.id === editingId.value)
        if (idx !== -1) trainings.value[idx] = updated
        toasts.success('Formation mise à jour')
      }
      closeModal()
    } catch {
      toasts.error('Échec de l’enregistrement de la formation')
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
      await deleteTraining(id)
      trainings.value = trainings.value.filter((t) => t.id !== id)
      toasts.success('Formation supprimée')
    } catch {
      toasts.error('Échec de la suppression')
    } finally {
      confirmId.value = null
    }
  }

  onMounted(load)

  return {
    trainings,
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
    validate,
    reject,
    askRemove,
    cancelRemove,
    confirmRemove,
  }
}
