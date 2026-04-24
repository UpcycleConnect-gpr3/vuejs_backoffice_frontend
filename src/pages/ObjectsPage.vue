<script setup lang="ts">
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

interface UpcycleObject {
  id: string
  name: string
  price: number
  quantity: number
  score: number
  sellBy: string
}

const objects = ref<UpcycleObject[]>([
  { id: 'obj-1', name: 'Wooden pallet', price: 15, quantity: 42, score: 8.2, sellBy: 'EcoLog' },
  { id: 'obj-2', name: 'Vintage chair', price: 80, quantity: 6, score: 7.5, sellBy: 'Recycl\'it' },
  { id: 'obj-3', name: 'Textile bulk', price: 5, quantity: 200, score: 9.1, sellBy: 'Textile+' },
  { id: 'obj-4', name: 'Glass bottles', price: 0.5, quantity: 1500, score: 8.8, sellBy: 'GreenBot' },
])

const search = ref('')
const filtered = computed(() => objects.value.filter((o) => `${o.name} ${o.sellBy}`.toLowerCase().includes(search.value.toLowerCase())))

function remove(id: string) {
  objects.value = objects.value.filter((o) => o.id !== id)
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <div class="dashboard-row" style="align-items: center; justify-content: space-between;">
        <h1 class="dashboard-title">Objets</h1>
        <span style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4);">
          {{ filtered.length }} objet{{ filtered.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div class="dashboard-row" style="flex-wrap: wrap;">
        <input v-model="search" type="text" placeholder="Rechercher un objet…" style="flex: 1; min-width: 200px;" />
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0;">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Score éco</th>
              <th>Vendeur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td colspan="6" style="text-align: center; color: oklch(from var(--white) l c h / 0.4); padding: var(--gap-extra-large);">
                Aucun objet trouvé
              </td>
            </tr>
            <tr v-for="o in filtered" :key="o.id">
              <td style="font-weight: 500;">{{ o.name }}</td>
              <td>{{ o.price }} €</td>
              <td>{{ o.quantity }}</td>
              <td>{{ o.score }}</td>
              <td>{{ o.sellBy }}</td>
              <td>
                <button class="small-square ghost destructive" title="Supprimer" @click="remove(o.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="16" height="16">
                    <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>
