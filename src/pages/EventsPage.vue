<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { useEvents } from '@/composables/useEvents'
import type { Event } from '@/api/events'

const { filtered, filterStatus, showModal, editingId, form, openCreate, openEdit, closeModal, save, remove } = useEvents()

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function badgeClass(status: Event['status']) {
  return {
    badge: true,
    'badge--success': status === 'en-cours',
    'badge--muted': status === 'termine',
    'badge--warning': status === 'a-venir',
  }
}

function statusLabel(status: Event['status']) {
  return { 'en-cours': 'En cours', 'a-venir': 'À venir', termine: 'Terminé' }[status]
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <div class="dashboard-row" style="align-items: center; justify-content: space-between;">
        <h1 class="dashboard-title">Événements</h1>
        <button class="secondary small" @click="openCreate">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="16" height="16">
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
          </svg>
          Créer un événement
        </button>
      </div>

      <div class="dashboard-row">
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
          <option value="en-cours">En cours</option>
          <option value="a-venir">À venir</option>
          <option value="termine">Terminé</option>
        </select>
        <span style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4); margin-left: auto;">
          {{ filtered.length }} événement{{ filtered.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0;">
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Lieu</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td colspan="6" style="text-align: center; color: oklch(from var(--white) l c h / 0.4); padding: var(--gap-extra-large);">
                Aucun événement
              </td>
            </tr>
            <tr v-for="event in filtered" :key="event.id">
              <td>
                <div style="display: flex; align-items: center; gap: var(--gap-medium);">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="18" height="18" style="color: oklch(from var(--white) l c h / 0.4); flex-shrink: 0;">
                    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z" />
                  </svg>
                  <span style="font-weight: 500;">{{ event.title }}</span>
                </div>
              </td>
              <td style="color: oklch(from var(--white) l c h / 0.7);">{{ event.location }}</td>
              <td style="font-size: var(--font-size-small);">{{ formatDate(event.startDate) }}</td>
              <td style="font-size: var(--font-size-small);">{{ formatDate(event.endDate) }}</td>
              <td><span :class="badgeClass(event.status)">{{ statusLabel(event.status) }}</span></td>
              <td>
                <div style="display: flex; gap: var(--gap-small);">
                  <button class="small-square ghost" title="Modifier" @click="openEdit(event)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="16" height="16">
                      <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" />
                    </svg>
                  </button>
                  <button class="small-square ghost destructive" title="Supprimer" @click="remove(event.id)">
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

  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <span class="modal-title">{{ editingId ? 'Modifier l\'événement' : 'Créer un événement' }}</span>
          <button class="small-square ghost" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="16" height="16">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="required">
              Titre
              <input v-model="form.title" type="text" placeholder="Nom de l'événement" />
            </label>
          </div>

          <div class="form-group">
            <label>
              Description
              <textarea v-model="form.description" placeholder="Description de l'événement" rows="3" style="resize: vertical;"></textarea>
            </label>
          </div>

          <div class="form-group">
            <label class="required">
              Lieu
              <input v-model="form.location" type="text" placeholder="Ville, adresse…" />
            </label>
          </div>

          <div class="dashboard-row">
            <div class="form-group" style="flex: 1;">
              <label class="required">
                Date de début
                <input v-model="form.startDate" type="datetime-local" />
              </label>
            </div>
            <div class="form-group" style="flex: 1;">
              <label class="required">
                Date de fin
                <input v-model="form.endDate" type="datetime-local" />
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>
              Statut
              <select
              v-model="form.status"
              style="
                height: var(--height-small);
                background-color: transparent;
                border: var(--border-width-layout) var(--border-style-layout) oklch(from var(--white) l c h / 0.15);
                color: var(--foreground-color);
                padding: 0 var(--padding-medium);
                font-size: var(--font-size-small);
                font-family: var(--font-sans);
                width: 100%;
              "
            >
              <option value="a-venir">À venir</option>
              <option value="en-cours">En cours</option>
              <option value="termine">Terminé</option>
            </select>
            </label>
          </div>
        </div>

        <div class="modal-footer">
          <button class="ghost small" @click="closeModal">Annuler</button>
          <button class="secondary small" @click="save">
            {{ editingId ? 'Enregistrer' : 'Créer' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
