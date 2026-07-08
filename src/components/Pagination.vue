<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  total: number
  page: number
  pageSize: number
}>()

const emit = defineEmits<{ 'update:page': [page: number] }>()

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

function go(page: number) {
  if (page < 1 || page > pageCount.value || page === props.page) return
  emit('update:page', page)
}
</script>

<template>
  <div v-if="pageCount > 1" class="pagination">
    <button class="ghost small" :disabled="page <= 1" @click="go(page - 1)">Précédent</button>
    <span class="pagination__info">Page {{ page }} / {{ pageCount }}</span>
    <button class="ghost small" :disabled="page >= pageCount" @click="go(page + 1)">Suivant</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-medium);
  padding: var(--padding-medium);
}

.pagination__info {
  font-size: var(--font-size-small);
  color: oklch(from var(--white) l c h / 0.5);
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
