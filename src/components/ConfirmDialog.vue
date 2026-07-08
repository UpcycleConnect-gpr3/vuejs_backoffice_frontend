<script setup lang="ts">
import AppModal from '@/components/AppModal.vue'

withDefaults(
  defineProps<{
    open: boolean
    title?: string
    message?: string
    confirmLabel?: string
    cancelLabel?: string
  }>(),
  {
    title: 'Confirmer',
    message: 'Êtes-vous sûr ?',
    confirmLabel: 'Confirmer',
    cancelLabel: 'Annuler',
  },
)

const emit = defineEmits<{ confirm: []; cancel: [] }>()
</script>

<template>
  <AppModal :open="open" :title="title" @close="emit('cancel')">
    <p style="font-size: var(--font-size-small); color: var(--foreground-color)">{{ message }}</p>
    <template #footer>
      <button class="ghost small" @click="emit('cancel')">{{ cancelLabel }}</button>
      <button class="secondary small destructive" @click="emit('confirm')">
        {{ confirmLabel }}
      </button>
    </template>
  </AppModal>
</template>
