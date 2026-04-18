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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  <button
                    class="small-square ghost"
                    title="Supprimer"
                    @click="remove(p.id)"
                    style="--button-hover-bg-color: oklch(from var(--destructive-color) l c h / 0.15); --button-hover-text-color: var(--destructive-color);"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
