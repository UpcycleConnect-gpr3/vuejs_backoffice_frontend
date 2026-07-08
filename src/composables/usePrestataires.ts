import { ref, computed, onMounted, watch } from 'vue'
import {
  fetchPrestataires,
  createPrestataire,
  updatePrestataire,
  deletePrestataire,
  type Prestataire,
  type PrestatairePayload,
} from '@/api/prestataires'
import { useToasts } from '@/stores/toasts'

const emptyForm = (): PrestatairePayload => ({
  name: '',
  type: '',
  email: '',
  phone: '',
  city: '',
  status: 'active',
})

export function usePrestataires() {
  const toasts = useToasts()
  const prestataires = ref<Prestataire[]>([])
  const loading = ref(false)
  const search = ref('')

  const showModal = ref(false)
  const editingId = ref<number | null>(null)
  const form = ref<PrestatairePayload>(emptyForm())
  const confirmId = ref<number | null>(null)

  const page = ref(1)
  const pageSize = 10

  const filtered = computed(() => {
    const q = search.value.trim().toLowerCase()
    if (!q) return prestataires.value
    return prestataires.value.filter((p) =>
      `${p.name} ${p.type} ${p.city} ${p.email}`.toLowerCase().includes(q),
    )
  })

  const paginated = computed(() =>
    filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize),
  )

  watch(search, () => {
    page.value = 1
  })

  async function load() {
    loading.value = true
    try {
      prestataires.value = await fetchPrestataires()
    } catch {
      toasts.error('Impossible de charger les prestataires.')
    } finally {
      loading.value = false
    }
  }

  function openCreate() {
    editingId.value = null
    form.value = emptyForm()
    showModal.value = true
  }

  function openEdit(p: Prestataire) {
    editingId.value = p.id
    form.value = {
      name: p.name,
      type: p.type,
      email: p.email,
      phone: p.phone,
      city: p.city,
      status: p.status,
    }
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  async function save() {
    try {
      if (editingId.value === null) {
        await createPrestataire(form.value)
        toasts.success('Prestataire créé')
      } else {
        await updatePrestataire(editingId.value, form.value)
        toasts.success('Prestataire mis à jour')
      }
      closeModal()
      await load()
    } catch {
      toasts.error('Échec de l’enregistrement du prestataire')
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
      await deletePrestataire(id)
      toasts.success('Prestataire supprimé')
      await load()
    } catch {
      toasts.error('Échec de la suppression')
    } finally {
      confirmId.value = null
    }
  }

  onMounted(load)

  return {
    prestataires,
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
