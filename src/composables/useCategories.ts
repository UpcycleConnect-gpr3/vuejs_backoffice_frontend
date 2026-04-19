import { ref, onMounted } from 'vue'
import { fetchCategories, deleteCategory, type Category } from '@/api/categories'

const MOCK: Category[] = [
  { id: 1, name: 'Mobilier', slug: 'mobilier', objectCount: 0, createdAt: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'Textile', slug: 'textile', objectCount: 0, createdAt: '2024-01-01T00:00:00Z' },
  { id: 3, name: 'Électronique', slug: 'electronique', objectCount: 0, createdAt: '2024-01-01T00:00:00Z' },
  { id: 4, name: 'Bois', slug: 'bois', objectCount: 0, createdAt: '2024-01-01T00:00:00Z' },
  { id: 5, name: 'Métal', slug: 'metal', objectCount: 0, createdAt: '2024-01-01T00:00:00Z' },
  { id: 6, name: 'Verre', slug: 'verre', objectCount: 0, createdAt: '2024-01-01T00:00:00Z' },
  { id: 7, name: 'Papier / Carton', slug: 'papier-carton', objectCount: 0, createdAt: '2024-01-01T00:00:00Z' },
  { id: 8, name: 'Autre', slug: 'autre', objectCount: 0, createdAt: '2024-01-01T00:00:00Z' },
]

export function useCategories() {
  const categories = ref<Category[]>(MOCK)
  const loading = ref(false)
  const error = ref<string | null>(null)

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

  async function remove(id: number) {
    await deleteCategory(id)
    categories.value = categories.value.filter((c) => c.id !== id)
  }

  onMounted(load)

  return { categories, loading, error, remove }
}
