<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { useUsers } from '@/composables/useUsers'
import type { User } from '@/api/users'

const { filtered, search, filterStatus, remove } = useUsers()

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function badgeClass(status: User['status']) {
  return {
    badge: true,
    'badge--success': status === 'actif',
    'badge--muted': status === 'inactif',
    'badge--danger': status === 'suspendu',
  }
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
        <h1 class="dashboard-title">Utilisateurs</h1>
        <span style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4);">
          {{ filtered.length }} utilisateur{{ filtered.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div class="dashboard-row" style="flex-wrap: wrap;">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher par nom ou email…"
          style="flex: 1; min-width: 200px;"
        />
        <select
          v-model="filterStatus"
          style="
            height: var(--height-small);
            background-color: transparent;
            border: var(--border-width-layout) var(--border-style-layout) oklch(from var(--white) l c h / 0.15);
            color: var(--foreground-color);
            padding: 0 var(--padding-medium);
            font-size: var(--font-size-small);
            font-family: var(--font-sans);
            cursor: pointer;
          "
        >
          <option value="tous">Tous les statuts</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
          <option value="suspendu">Suspendu</option>
        </select>
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0;">
        <table>
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Inscription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td colspan="5" style="text-align: center; color: oklch(from var(--white) l c h / 0.4); padding: var(--gap-extra-large);">
                Aucun utilisateur trouvé
              </td>
            </tr>
            <tr v-for="user in filtered" :key="user.id">
              <td>
                <div style="display: flex; align-items: center; gap: var(--gap-medium);">
                  <div class="avatar">{{ initials(user.name) }}</div>
                  <div>
                    <div style="font-weight: 500;">{{ user.name }}</div>
                    <div style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.5);">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td>{{ user.role }}</td>
              <td>
                <span :class="badgeClass(user.status)">{{ user.status }}</span>
              </td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <td>
                <div style="display: flex; gap: var(--gap-small);">
                  <button class="small-square ghost" title="Voir">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </button>
                  <button class="small-square ghost" title="Supprimer" @click="remove(user.id)" style="--button-hover-bg-color: oklch(from var(--destructive-color) l c h / 0.15); --button-hover-text-color: var(--destructive-color);">
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
