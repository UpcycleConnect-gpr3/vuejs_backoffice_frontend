<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { usePrestataires } from '@/composables/usePrestataires'

const { filtered, search, remove } = usePrestataires()
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <div class="dashboard-row" style="align-items: center; justify-content: space-between;">
        <h1 class="dashboard-title">Prestataires</h1>
        <span style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4);">
          {{ filtered.length }} prestataire{{ filtered.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div class="dashboard-row">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher par nom, SIRET ou contact…"
          style="flex: 1;"
        />
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0;">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>SIRET</th>
              <th>Contact</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td colspan="5" style="text-align: center; color: oklch(from var(--white) l c h / 0.4); padding: var(--gap-extra-large);">
                Aucun prestataire trouvé
              </td>
            </tr>
            <tr v-for="p in filtered" :key="p.id">
              <td style="font-weight: 500;">{{ p.name }}</td>
              <td style="font-family: monospace; font-size: var(--font-size-small);">{{ p.siret }}</td>
              <td>
                <div style="font-weight: 500;">{{ p.contactName }}</div>
                <div style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.5);">{{ p.contactEmail }}</div>
                <div style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.5);">{{ p.contactPhone }}</div>
              </td>
              <td style="color: oklch(from var(--white) l c h / 0.4);">
                {{ p.categorie ?? '–' }}
              </td>
              <td>
                <div style="display: flex; gap: var(--gap-small);">
                  <button class="small-square ghost" title="Modifier">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="16" height="16">
                      <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" />
                    </svg>
                  </button>
                  <button
                    class="small-square ghost destructive"
                    title="Supprimer"
                    @click="remove(p.id)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="16" height="16">
                      <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>
