<script setup lang="ts">
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

interface Talk {
  id: number
  title: string
  author: string
  categoryId: number
  categoryName: string
  messageCount: number
  createdAt: string
}

const talks = ref<Talk[]>([
  { id: 1, title: 'How to upcycle pallets', author: 'Marie L.', categoryId: 2, categoryName: 'Bois', messageCount: 12, createdAt: '2026-03-10' },
  { id: 2, title: 'Textile waste collection tips', author: 'Alex D.', categoryId: 1, categoryName: 'Textile', messageCount: 8, createdAt: '2026-03-12' },
  { id: 3, title: 'Electronic components sourcing', author: 'Thomas M.', categoryId: 3, categoryName: 'Électronique', messageCount: 24, createdAt: '2026-03-14' },
  { id: 4, title: 'Paper pulp experiments', author: 'Julie B.', categoryId: 4, categoryName: 'Papier-carton', messageCount: 5, createdAt: '2026-03-18' },
])

const search = ref('')

const filtered = computed(() =>
  talks.value.filter((t) =>
    `${t.title} ${t.author} ${t.categoryName}`.toLowerCase().includes(search.value.toLowerCase())
  )
)

function remove(id: number) {
  talks.value = talks.value.filter((t) => t.id !== id)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR')
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <div class="dashboard-row" style="align-items: center; justify-content: space-between;">
        <h1 class="dashboard-title">Talks</h1>
        <span style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4);">
          {{ filtered.length }} talk{{ filtered.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div class="dashboard-row" style="flex-wrap: wrap;">
        <input v-model="search" type="text" placeholder="Rechercher un talk…" style="flex: 1; min-width: 200px;" />
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0;">
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Catégorie</th>
              <th>Messages</th>
              <th>Créé le</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td colspan="6" style="text-align: center; color: oklch(from var(--white) l c h / 0.4); padding: var(--gap-extra-large);">
                Aucun talk trouvé
              </td>
            </tr>
            <tr v-for="t in filtered" :key="t.id">
              <td style="font-weight: 500;">{{ t.title }}</td>
              <td>{{ t.author }}</td>
              <td>{{ t.categoryName }}</td>
              <td>{{ t.messageCount }}</td>
              <td>{{ formatDate(t.createdAt) }}</td>
              <td>
                <button class="small-square ghost destructive" title="Supprimer" @click="remove(t.id)">
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
