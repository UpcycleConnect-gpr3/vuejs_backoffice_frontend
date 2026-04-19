<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { useLogs } from '@/composables/useLogs'
import type { LogAction, LogResource } from '@/api/logs'

const { filtered, filterAction, filterResource } = useLogs()

const actionLabels: Record<LogAction, string> = {
  create: 'Création',
  update: 'Modification',
  delete: 'Suppression',
  login: 'Connexion',
  logout: 'Déconnexion',
}

const resourceLabels: Record<LogResource, string> = {
  user: 'Utilisateur',
  prestataire: 'Prestataire',
  category: 'Catégorie',
  event: 'Événement',
  auth: 'Auth',
}

function actionBadgeClass(action: LogAction) {
  return {
    badge: true,
    'badge--success': action === 'create' || action === 'login',
    'badge--muted': action === 'logout',
    'badge--danger': action === 'delete',
    'badge--warning': action === 'update',
  }
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

const selectStyle = `
  height: var(--height-small);
  background-color: transparent;
  border: var(--border-width-layout) var(--border-style-layout) oklch(from var(--white) l c h / 0.15);
  color: var(--foreground-color);
  padding: 0 var(--padding-medium);
  font-size: var(--font-size-small);
  font-family: var(--font-sans);
  cursor: pointer;
`
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <div class="dashboard-row" style="align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: var(--gap-medium);">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="28" height="28" style="color: oklch(from var(--white) l c h / 0.5);">
            <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75a8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z" />
          </svg>
          <h1 class="dashboard-title" style="margin-bottom: 0;">Journaux</h1>
        </div>
        <span style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4);">
          {{ filtered.length }} entrée{{ filtered.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div class="dashboard-row" style="flex-wrap: wrap;">
        <select v-model="filterAction" :style="selectStyle">
          <option value="tous">Toutes les actions</option>
          <option value="create">Création</option>
          <option value="update">Modification</option>
          <option value="delete">Suppression</option>
          <option value="login">Connexion</option>
          <option value="logout">Déconnexion</option>
        </select>
        <select v-model="filterResource" :style="selectStyle">
          <option value="tous">Toutes les ressources</option>
          <option value="user">Utilisateur</option>
          <option value="prestataire">Prestataire</option>
          <option value="category">Catégorie</option>
          <option value="event">Événement</option>
          <option value="auth">Auth</option>
        </select>
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0;">
        <table>
          <thead>
            <tr>
              <th>Admin</th>
              <th>Action</th>
              <th>Ressource</th>
              <th>Détails</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td colspan="5" style="text-align: center; color: oklch(from var(--white) l c h / 0.4); padding: var(--gap-extra-large);">
                Aucun journal trouvé
              </td>
            </tr>
            <tr v-for="log in filtered" :key="log.id">
              <td>
                <div style="display: flex; align-items: center; gap: var(--gap-medium);">
                  <div class="avatar">{{ initials(log.adminName) }}</div>
                  <span style="font-weight: 500;">{{ log.adminName }}</span>
                </div>
              </td>
              <td>
                <span :class="actionBadgeClass(log.action)">{{ actionLabels[log.action] }}</span>
              </td>
              <td style="color: oklch(from var(--white) l c h / 0.7);">
                {{ resourceLabels[log.resource] }}
                <span v-if="log.resourceId" style="color: oklch(from var(--white) l c h / 0.35); font-size: var(--font-size-small);">
                  #{{ log.resourceId }}
                </span>
              </td>
              <td style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.7); max-width: 320px;">
                {{ log.details }}
              </td>
              <td style="font-size: var(--font-size-small); white-space: nowrap; color: oklch(from var(--white) l c h / 0.5);">
                {{ formatDate(log.createdAt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>
