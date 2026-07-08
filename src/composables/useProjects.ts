import { ref, computed, onMounted, watch } from 'vue'
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  type Project,
  type CreateProjectRequest,
} from '@/api/projects'
import { useToasts } from '@/stores/toasts'

// MOCK fallback (données de démonstration) used when the upcycle backend is unreachable.
const MOCK: Project[] = [
  {
    id: 1,
    name: 'Eco-desk collection',
    description: 'Bureau recyclé à partir de palettes',
    image_path: '',
    user_id: 'u1',
    created_at: '2026-03-02T00:00:00Z',
    updated_at: '2026-03-02T00:00:00Z',
  },
  {
    id: 2,
    name: 'Wardrobe reboot',
    description: "Upcycling d'armoires anciennes",
    image_path: '',
    user_id: 'u2',
    created_at: '2026-03-08T00:00:00Z',
    updated_at: '2026-03-08T00:00:00Z',
  },
  {
    id: 3,
    name: 'Light up',
    description: 'Création de lampes avec des bouteilles',
    image_path: '',
    user_id: 'u3',
    created_at: '2026-03-15T00:00:00Z',
    updated_at: '2026-03-15T00:00:00Z',
  },
]

const emptyForm = (): CreateProjectRequest => ({ name: '', description: '', image_path: '' })

export function useProjects() {
  const toasts = useToasts()
  const projects = ref<Project[]>(MOCK)
  const loading = ref(false)
  const search = ref('')

  const showModal = ref(false)
  const editingId = ref<number | null>(null)
  const form = ref<CreateProjectRequest>(emptyForm())
  const confirmId = ref<number | null>(null)

  const page = ref(1)
  const pageSize = 10

  const filtered = computed(() =>
    projects.value.filter((p) =>
      `${p.name} ${p.description}`.toLowerCase().includes(search.value.toLowerCase()),
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
      projects.value = await fetchProjects()
    } catch {
      // Fall back to mock data.
    } finally {
      loading.value = false
    }
  }

  function openCreate() {
    editingId.value = null
    form.value = emptyForm()
    showModal.value = true
  }

  function openEdit(p: Project) {
    editingId.value = p.id
    form.value = { name: p.name, description: p.description, image_path: p.image_path }
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  async function save() {
    try {
      if (editingId.value === null) {
        const created = await createProject(form.value)
        projects.value.unshift(created)
        toasts.success('Projet créé')
      } else {
        const updated = await updateProject(editingId.value, form.value)
        const idx = projects.value.findIndex((p) => p.id === editingId.value)
        if (idx !== -1) projects.value[idx] = updated
        toasts.success('Projet mis à jour')
      }
      closeModal()
    } catch {
      toasts.error('Échec de l’enregistrement du projet')
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
      await deleteProject(id)
      projects.value = projects.value.filter((p) => p.id !== id)
      toasts.success('Projet supprimé')
    } catch {
      toasts.error('Échec de la suppression')
    } finally {
      confirmId.value = null
    }
  }

  onMounted(load)

  return {
    projects,
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
