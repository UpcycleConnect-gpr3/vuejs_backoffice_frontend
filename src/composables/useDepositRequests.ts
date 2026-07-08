import { ref, computed, onMounted } from 'vue'
import { fetchDepositedPackages, type DepositedPackage } from '@/api/deposit-requests'

export function useDepositRequests() {
  const items = ref<DepositedPackage[]>([])
  const loading = ref(false)
  const search = ref('')

  const filtered = computed(() => {
    const q = search.value.trim().toLowerCase()
    if (!q) return items.value
    return items.value.filter((d) =>
      `${d.object_name} ${d.category} ${d.locker_name} ${d.locker_city}`
        .toLowerCase()
        .includes(q),
    )
  })

  const count = computed(() => items.value.length)

  async function load() {
    loading.value = true
    try {
      items.value = await fetchDepositedPackages()
    } catch {
      items.value = []
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return { items, filtered, loading, search, count }
}
