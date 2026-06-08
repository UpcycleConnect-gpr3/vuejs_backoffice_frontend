<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Chargement…' })
</script>

<template>
  <div class="loading-spinner">
    <span class="loading-spinner__dot"></span>
    <span class="loading-spinner__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-medium);
  padding: var(--gap-extra-large);
  color: oklch(from var(--white) l c h / 0.5);
  font-size: var(--font-size-small);
}

.loading-spinner__dot {
  width: 16px;
  height: 16px;
  border: 2px solid oklch(from var(--white) l c h / 0.2);
  border-top-color: var(--foreground-color);
  border-radius: 50%;
  animation: loading-spinner-rotate 0.7s linear infinite;
}

@keyframes loading-spinner-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
