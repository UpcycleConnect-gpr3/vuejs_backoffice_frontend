<script setup lang="ts">
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

interface Project {
  id: number
  name: string
  description: string
  userId: string
  userName: string
  objectCount: number
  createdAt: string
}

const projects = ref<Project[]>([
  { id: 1, name: 'Eco-desk collection', description: 'Bureau recyclé à partir de palettes', userId: 'u1', userName: 'Marie L.', objectCount: 4, createdAt: '2026-03-02' },
  { id: 2, name: 'Wardrobe reboot', description: 'Upcycling d\'armoires anciennes', userId: 'u2', userName: 'Alex D.', objectCount: 7, createdAt: '2026-03-08' },
  { id: 3, name: 'Light up', description: 'Création de lampes avec des bouteilles', userId: 'u3', userName: 'Thomas M.', objectCount: 12, createdAt: '2026-03-15' },
])

const search = ref('')
const filtered = computed(() => projects.value.filter((p) => `${p.name} ${p.userName}`.toLowerCase().includes(search.value.toLowerCase())))

function remove(id: number) {
  projects.value = projects.value.filter((p) => p.id !== id)
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
        <h1 class="dashboard-title">Projets</h1>
        <span style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4);">
          {{ filtered.length }} projet{{ filtered.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div class="dashboard-row" style="flex-wrap: wrap;">
        <input v-model="search" type="text" placeholder="Rechercher un projet…" style="flex: 1; min-width: 200px;" />
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0;">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Auteur</th>
              <th>Objets</th>
              <th>Créé le</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td colspan="6" style="text-align: center; color: oklch(from var(--white) l c h / 0.4); padding: var(--gap-extra-large);">
                Aucun projet trouvé
              </td>
            </tr>
            <tr v-for="p in filtered" :key="p.id">
              <td style="font-weight: 500;">{{ p.name }}</td>
              <td>{{ p.description }}</td>
              <td>{{ p.userName }}</td>
              <td>{{ p.objectCount }}</td>
              <td>{{ formatDate(p.createdAt) }}</td>
              <td>
                <button class="small-square ghost destructive" title="Supprimer" @click="remove(p.id)">
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
