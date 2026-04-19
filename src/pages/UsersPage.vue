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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="16" height="16">
                      <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
                    </svg>
                  </button>
                  <button class="small-square ghost" title="Supprimer" @click="remove(user.id)" style="--button-hover-bg-color: oklch(from var(--destructive-color) l c h / 0.15); --button-hover-text-color: var(--destructive-color);">
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
