<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToastHost from '@/components/ToastHost.vue'
import '@/css/style.css'
</script>

<template>
  <RouterView />
  <ToastHost />
</template>
