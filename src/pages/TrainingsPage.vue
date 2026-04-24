<script setup lang="ts">
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

interface Training {
  id: number
  name: string
  type: string
  mode: string
  duration: string
  minParticipants: number
  maxParticipants: number
  location: string
}

const trainings = ref<Training[]>([
  { id: 1, name: 'Upcycling intro', type: 'Workshop', mode: 'On-site', duration: '2h', minParticipants: 4, maxParticipants: 12, location: 'Paris' },
  { id: 2, name: 'Circular economy certification', type: 'Course', mode: 'Hybrid', duration: '40h', minParticipants: 8, maxParticipants: 20, location: 'Lyon' },
  { id: 3, name: 'Textile recycling', type: 'Workshop', mode: 'Online', duration: '3h', minParticipants: 5, maxParticipants: 30, location: 'Remote' },
])

const search = ref('')
const filtered = computed(() => trainings.value.filter((t) => `${t.name} ${t.type} ${t.location}`.toLowerCase().includes(search.value.toLowerCase())))

function remove(id: number) {
  trainings.value = trainings.value.filter((t) => t.id !== id)
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <div class="dashboard-row" style="align-items: center; justify-content: space-between;">
        <h1 class="dashboard-title">Formations</h1>
        <span style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4);">
          {{ filtered.length }} formation{{ filtered.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div class="dashboard-row" style="flex-wrap: wrap;">
        <input v-model="search" type="text" placeholder="Rechercher une formation…" style="flex: 1; min-width: 200px;" />
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0;">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Mode</th>
              <th>Durée</th>
              <th>Participants</th>
              <th>Lieu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td colspan="7" style="text-align: center; color: oklch(from var(--white) l c h / 0.4); padding: var(--gap-extra-large);">
                Aucune formation trouvée
              </td>
            </tr>
            <tr v-for="t in filtered" :key="t.id">
              <td style="font-weight: 500;">{{ t.name }}</td>
              <td>{{ t.type }}</td>
              <td>{{ t.mode }}</td>
              <td>{{ t.duration }}</td>
              <td>{{ t.minParticipants }} – {{ t.maxParticipants }}</td>
              <td>{{ t.location }}</td>
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
