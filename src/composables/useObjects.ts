import { ref, computed, onMounted, watch } from 'vue'
import {
  fetchObjects,
  createObject,
  updateObject,
  deleteObject,
  validateObject,
  rejectObject,
  type UpcycleObject,
  type CreateObjectRequest,
} from '@/api/objects'
import { useToasts } from '@/stores/toasts'

// MOCK fallback (données de démonstration) used when the upcycle backend is unreachable.
const MOCK: UpcycleObject[] = [
  {
    id: 'obj-1',
    name: 'Wooden pallet',
    description: '',
    price: 15,
    image_path: '',
    colomn_for_calc_the_score: '',
    quantity: 42,
    score: 8.2,
    buy_by: '',
    sell_by: 'EcoLog',
    created_at: '',
    updated_at: '',
  },
  {
    id: 'obj-2',
    name: 'Vintage chair',
    description: '',
    price: 80,
    image_path: '',
    colomn_for_calc_the_score: '',
    quantity: 6,
    score: 7.5,
    buy_by: '',
    sell_by: "Recycl'it",
    created_at: '',
    updated_at: '',
  },
  {
    id: 'obj-3',
    name: 'Textile bulk',
    description: '',
    price: 5,
    image_path: '',
    colomn_for_calc_the_score: '',
    quantity: 200,
    score: 9.1,
    buy_by: '',
    sell_by: 'Textile+',
    created_at: '',
    updated_at: '',
  },
]

const emptyForm = (): CreateObjectRequest => ({
  name: '',
  description: '',
  price: 0,
  quantity: 0,
})

export function useObjects() {
  const toasts = useToasts()
  const objects = ref<UpcycleObject[]>(MOCK)
  const loading = ref(false)
  const search = ref('')

  const showModal = ref(false)
  const editingId = ref<string | null>(null)
  const form = ref<CreateObjectRequest>(emptyForm())
  const confirmId = ref<string | null>(null)

  const page = ref(1)
  const pageSize = 10

  const filtered = computed(() =>
    objects.value.filter((o) =>
      `${o.name} ${o.sell_by}`.toLowerCase().includes(search.value.toLowerCase()),
    ),
  )

  const paginated = computed(() =>
    filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize),
  )

  // Reset to the first page whenever the search filter changes so the table
  // never lands on an out-of-range (blank) page, and clamp when the list shrinks.
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
      objects.value = await fetchObjects()
    } catch {
      // Fall back to mock data.
    } finally {
      loading.value = false
    }
  }

  async function validate(id: string) {
    try {
      await validateObject(id)
      toasts.success('Annonce validée')
      await load()
    } catch {
      toasts.error('Validation impossible (rôle responsable requis).')
    }
  }

  async function reject(id: string) {
    try {
      await rejectObject(id)
      toasts.success('Annonce invalidée')
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

  function openEdit(o: UpcycleObject) {
    editingId.value = o.id
    form.value = { name: o.name, description: o.description, price: o.price, quantity: o.quantity }
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  async function save() {
    try {
      if (editingId.value === null) {
        const created = await createObject(form.value)
        objects.value.unshift(created)
        toasts.success('Objet créé')
      } else {
        const updated = await updateObject(editingId.value, form.value)
        const idx = objects.value.findIndex((o) => o.id === editingId.value)
        if (idx !== -1) objects.value[idx] = updated
        toasts.success('Objet mis à jour')
      }
      closeModal()
    } catch {
      toasts.error('Échec de l’enregistrement de l’objet')
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
      await deleteObject(id)
      objects.value = objects.value.filter((o) => o.id !== id)
      toasts.success('Objet supprimé')
    } catch {
      toasts.error('Échec de la suppression')
    } finally {
      confirmId.value = null
    }
  }

  onMounted(load)

  return {
    objects,
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
