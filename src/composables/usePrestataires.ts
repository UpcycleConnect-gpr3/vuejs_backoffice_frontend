import { ref, computed, onMounted } from 'vue'
import { fetchPrestataires, deletePrestataire, type Prestataire } from '@/api/prestataires'

const MOCK: Prestataire[] = [
  { id: 1, name: 'Atelier Vert', siret: '12345678900010', contactName: 'Jean Dupont', contactEmail: 'jean@ateliervert.fr', contactPhone: '0612345678', categorie: null, status: 'actif', createdAt: '2024-01-15T10:00:00Z' },
  { id: 2, name: 'RecycloTech', siret: '98765432100023', contactName: 'Marie Lebon', contactEmail: 'marie@recyclotech.fr', contactPhone: '0698765432', categorie: null, status: 'actif', createdAt: '2024-02-20T09:00:00Z' },
  { id: 3, name: 'EcoRestore', siret: '55544433300001', contactName: 'Paul Girard', contactEmail: 'paul@ecorestore.fr', contactPhone: '0655544433', categorie: null, status: 'inactif', createdAt: '2024-03-10T14:00:00Z' },
]

export function usePrestataires() {
  const prestataires = ref<Prestataire[]>(MOCK)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const search = ref('')

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
    } finally {
      loading.value = false
    }
  }

  async function remove(id: number) {
    await deletePrestataire(id)
    prestataires.value = prestataires.value.filter((p) => p.id !== id)
  }

  onMounted(load)

  return { filtered, loading, error, search, remove }
}
