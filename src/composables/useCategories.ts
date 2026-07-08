import { ref, onMounted } from 'vue'
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type Category,
  type CategoryPayload,
} from '@/api/categories'
import { useToasts } from '@/stores/toasts'

const MOCK: Category[] = [
  {
    id: 1,
    name: 'Mobilier',
    description: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Textile',
    description: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: 'Électronique',
    description: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 4,
    name: 'Bois',
    description: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 5,
    name: 'Métal',
    description: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 6,
    name: 'Verre',
    description: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 7,
    name: 'Papier / Carton',
    description: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 8,
    name: 'Autre',
    description: '',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

const emptyForm = (): CategoryPayload => ({ name: '', description: '' })

export function useCategories() {
  const toasts = useToasts()
  const categories = ref<Category[]>(MOCK)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const showModal = ref(false)
  const editingId = ref<number | null>(null)
  const form = ref<CategoryPayload>(emptyForm())

  const confirmId = ref<number | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      categories.value = await fetchCategories()
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

  function openEdit(cat: Category) {
    editingId.value = cat.id
    form.value = { name: cat.name, description: cat.description }
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  async function save() {
    const payload: CategoryPayload = {
      name: form.value.name,
      description: form.value.description,
    }
    try {
      if (editingId.value === null) {
        const created = await createCategory(payload)
        categories.value.unshift(created)
        toasts.success('Catégorie créée')
      } else {
        const updated = await updateCategory(editingId.value, payload)
        const idx = categories.value.findIndex((c) => c.id === editingId.value)
        if (idx !== -1) categories.value[idx] = updated
        toasts.success('Catégorie mise à jour')
      }
      closeModal()
    } catch {
      toasts.error('Échec de l’enregistrement de la catégorie')
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
      await deleteCategory(id)
      categories.value = categories.value.filter((c) => c.id !== id)
      toasts.success('Catégorie supprimée')
    } catch {
      toasts.error('Échec de la suppression')
    } finally {
      confirmId.value = null
    }
  }

  onMounted(load)

  return {
    categories,
    loading,
    error,
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
