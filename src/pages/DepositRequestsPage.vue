<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { useDepositRequests } from '@/composables/useDepositRequests'
import type { DepositStatus } from '@/api/deposit-requests'

const { filtered, filterStatus, pendingCount, validate, close } = useDepositRequests()

const statusLabels: Record<DepositStatus, string> = {
  'en-attente': 'En attente',
  validee: 'Validée',
  fermee: 'Fermée',
}

function statusBadgeClass(status: DepositStatus) {
  return {
    badge: true,
    'badge--warning': status === 'en-attente',
    'badge--success': status === 'validee',
    'badge--muted': status === 'fermee',
  }
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
            <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56l80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z" />
          </svg>
          <h1 class="dashboard-title" style="margin-bottom: 0;">Demandes de dépôt</h1>
        </div>
        <div style="display: flex; align-items: center; gap: var(--gap-medium);">
          <span v-if="pendingCount > 0" class="badge badge--warning">
            {{ pendingCount }} en attente
          </span>
          <span style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4);">
            {{ filtered.length }} demande{{ filtered.length > 1 ? 's' : '' }}
          </span>
        </div>
      </div>

      <div class="dashboard-row">
        <select v-model="filterStatus" :style="selectStyle">
          <option value="tous">Tous les statuts</option>
          <option value="en-attente">En attente</option>
          <option value="validee">Validée</option>
          <option value="fermee">Fermée</option>
        </select>
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0;">
        <table>
          <thead>
            <tr>
              <th>Objet</th>
              <th>Demandeur</th>
              <th>Catégorie</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td colspan="6" style="text-align: center; color: oklch(from var(--white) l c h / 0.4); padding: var(--gap-extra-large);">
                Aucune demande
              </td>
            </tr>
            <tr v-for="req in filtered" :key="req.id">
              <td>
                <div style="font-weight: 500;">{{ req.objectName }}</div>
                <div style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.5); margin-top: 2px; max-width: 240px;">
                  {{ req.objectDescription }}
                </div>
              </td>
              <td>
                <div style="font-weight: 500;">{{ req.requesterName }}</div>
                <div style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.5);">{{ req.requesterEmail }}</div>
              </td>
              <td style="color: oklch(from var(--white) l c h / 0.4);">
                {{ req.category ?? '–' }}
              </td>
              <td>
                <span :class="statusBadgeClass(req.status)">{{ statusLabels[req.status] }}</span>
              </td>
              <td style="font-size: var(--font-size-small); white-space: nowrap; color: oklch(from var(--white) l c h / 0.5);">
                {{ formatDate(req.createdAt) }}
              </td>
              <td>
                <div style="display: flex; gap: var(--gap-small);">
                  <button
                    v-if="req.status === 'en-attente'"
                    class="small-square ghost success"
                    title="Valider"
                    @click="validate(req.id)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="16" height="16">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                  </button>
                  <button
                    v-if="req.status !== 'fermee'"
                    class="small-square ghost destructive"
                    title="Fermer"
                    @click="close(req.id)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="16" height="16">
                      <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
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
