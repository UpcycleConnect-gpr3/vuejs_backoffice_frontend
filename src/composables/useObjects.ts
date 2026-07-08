import { ref, computed, onMounted, watch } from 'vue'
import {
  fetchObjects,
  createObject,
  updateObject,
  deleteObject,
  type UpcycleObject,
  type CreateObjectRequest,
} from '@/api/objects'
import { useToasts } from '@/stores/toasts'

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

    } finally {
      loading.value = false
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
    askRemove,
    cancelRemove,
    confirmRemove,
  }
}
