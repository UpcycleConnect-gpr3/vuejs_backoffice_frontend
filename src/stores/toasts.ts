import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: number
  type: ToastType
  message: string
}

let nextId = 1

export const useToasts = defineStore('toasts', () => {
  const toasts = ref<Toast[]>([])

  function push(message: string, type: ToastType = 'info', duration = 4000) {
    const id = nextId++
    toasts.value.push({ id, message, type })
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration)
    }
    return id
  }

  function dismiss(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  const success = (message: string) => push(message, 'success')
  const error = (message: string) => push(message, 'error')
  const info = (message: string) => push(message, 'info')

  return { toasts, push, dismiss, success, error, info }
})
