<script setup lang="ts">
import { useToasts } from '@/stores/toasts'

const toasts = useToasts()
</script>

<template>
  <Teleport to="body">
    <div class="toast-host">
      <div
        v-for="toast in toasts.toasts"
        :key="toast.id"
        :class="['toast', `toast--${toast.type}`]"
        @click="toasts.dismiss(toast.id)"
      >
        {{ toast.message }}
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-host {
  position: fixed;
  top: var(--padding-large);
  right: var(--padding-large);
  display: flex;
  flex-direction: column;
  gap: var(--gap-small);
  z-index: 200;
  max-width: 360px;
}

.toast {
  padding: var(--padding-medium) var(--padding-large);
  font-size: var(--font-size-small);
  color: var(--foreground-color);
  background-color: var(--background-color);
  border: var(--border-width-layout) var(--border-style-layout)
    oklch(from var(--white) l c h / 0.15);
  cursor: pointer;
  box-shadow: 0 8px 24px oklch(from var(--black) l c h / 0.4);
}

.toast--success {
  border-left: 3px solid #4ade80;
}

.toast--error {
  border-left: 3px solid #f87171;
}

.toast--info {
  border-left: 3px solid #60a5fa;
}
</style>
