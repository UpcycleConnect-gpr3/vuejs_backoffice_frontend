import { ref, computed, onMounted } from 'vue'
import {
  fetchPrestataires,
  deletePrestataire,
  updatePrestataire,
  type Prestataire,
  type PrestatairePayload,
} from '@/api/prestataires'
import { useToasts } from '@/stores/toasts'

// NOTE: no dedicated backend exists for prestataires — data is mocked
// (données de démonstration) and edits are applied optimistically client-side.
const MOCK: Prestataire[] = [
  {
    id: 1,
    name: 'Atelier Vert',
    siret: '12345678900010',
    contactName: 'Jean Dupont',
    contactEmail: 'jean@ateliervert.fr',
    contactPhone: '0612345678',
    categorie: null,
    status: 'actif',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'RecycloTech',
    siret: '98765432100023',
    contactName: 'Marie Lebon',
    contactEmail: 'marie@recyclotech.fr',
    contactPhone: '0698765432',
    categorie: null,
    status: 'actif',
    createdAt: '2024-02-20T09:00:00Z',
  },
  {
    id: 3,
    name: 'EcoRestore',
    siret: '55544433300001',
    contactName: 'Paul Girard',
    contactEmail: 'paul@ecorestore.fr',
    contactPhone: '0655544433',
    categorie: null,
    status: 'inactif',
    createdAt: '2024-03-10T14:00:00Z',
  },
]

const emptyForm = (): PrestatairePayload => ({
  name: '',
  siret: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  categorie: null,
  status: 'actif',
})

export function usePrestataires() {
  const toasts = useToasts()
  const prestataires = ref<Prestataire[]>(MOCK)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const search = ref('')

  const showModal = ref(false)
  const editingId = ref<number | null>(null)
  const form = ref<PrestatairePayload>(emptyForm())

  const confirmId = ref<number | null>(null)

  const filtered = computed(() =>
    prestataires.value.filter((p) => {
      const q = search.value.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.siret.includes(q) ||
        p.contactName.toLowerCase().includes(q) ||
        p.contactEmail.toLowerCase().includes(q)
      )
    }),
  )

  async function load() {
    loading.value = true
    error.value = null
    try {
      prestataires.value = await fetchPrestataires()
    } catch {
      // No backend — keep mock data.
    } finally {
      loading.value = false
    }
  }

  function openEdit(p: Prestataire) {
    editingId.value = p.id
    form.value = {
      name: p.name,
      siret: p.siret,
      contactName: p.contactName,
      contactEmail: p.contactEmail,
      contactPhone: p.contactPhone,
      categorie: p.categorie,
      status: p.status,
    }
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  async function save() {
    if (editingId.value === null) return
    try {
      const updated = await updatePrestataire(editingId.value, form.value)
      const idx = prestataires.value.findIndex((p) => p.id === editingId.value)
      const existing = prestataires.value[idx]
      if (existing) {
        prestataires.value[idx] = updated ?? { ...existing, ...form.value }
      }
      toasts.success('Prestataire mis à jour')
    } catch {
      toasts.error('Échec de la mise à jour')
    } finally {
      closeModal()
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
      prestataires.value = prestataires.value.filter((p) => p.id !== id)
      toasts.success('Prestataire supprimé')
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
    showModal,
    editingId,
    form,
    confirmId,
    openEdit,
    closeModal,
    save,
    askRemove,
    cancelRemove,
    confirmRemove,
  }
}
