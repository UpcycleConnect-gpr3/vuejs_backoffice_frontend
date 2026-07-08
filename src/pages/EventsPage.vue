<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import AppModal from '@/components/AppModal.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useEvents } from '@/composables/useEvents'

const {
  filtered,
  showModal,
  editingId,
  form,
  confirmId,
  openCreate,
  openEdit,
  closeModal,
  save,
  validate,
  reject,
  askRemove,
  cancelRemove,
  confirmRemove,
} = useEvents()

function statusMeta(status?: string): { label: string; cls: string } {
  if (status === 'validated') return { label: 'Validé', cls: 'badge--success' }
  if (status === 'rejected') return { label: 'Refusé', cls: 'badge--danger' }
  return { label: 'En attente', cls: 'badge--accent' }
}

function formatDate(iso: string) {
  return iso
    ? new Date(iso).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '–'
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <div class="dashboard-row" style="align-items: center; justify-content: space-between">
        <h1 class="dashboard-title">Événements</h1>
        <button class="secondary small" @click="openCreate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            fill="currentColor"
            width="16"
            height="16"
          >
            <path
              d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
            />
          </svg>
          Créer un événement
        </button>
      </div>

      <div class="dashboard-row">
        <span
          style="
            font-size: var(--font-size-small);
            color: oklch(from var(--white) l c h / 0.4);
            margin-left: auto;
          "
        >
          {{ filtered.length }} événement{{ filtered.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0">
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td
                colspan="4"
                style="
                  text-align: center;
                  color: oklch(from var(--white) l c h / 0.4);
                  padding: var(--gap-extra-large);
                "
              >
                Aucun événement
              </td>
            </tr>
            <tr v-for="event in filtered" :key="event.id">
              <td>
                <div style="display: flex; align-items: center; gap: var(--gap-medium)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    width="18"
                    height="18"
                    style="color: oklch(from var(--white) l c h / 0.4); flex-shrink: 0"
                  >
                    <path
                      d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"
                    />
                  </svg>
                  <span style="font-weight: 500">{{ event.title }}</span>
                </div>
              </td>
              <td style="font-size: var(--font-size-small)">{{ formatDate(event.date) }}</td>
              <td>
                <span class="badge" :class="statusMeta(event.status).cls">{{
                  statusMeta(event.status).label
                }}</span>
              </td>
              <td>
                <div style="display: flex; gap: var(--gap-small)">
                  <button
                    v-if="event.status !== 'validated'"
                    class="small ghost"
                    title="Valider"
                    style="color: var(--lime-500, #7ac74f)"
                    @click="validate(event.id)"
                  >
                    Valider
                  </button>
                  <button
                    v-if="event.status !== 'rejected'"
                    class="small ghost"
                    title="Refuser"
                    @click="reject(event.id)"
                  >
                    Refuser
                  </button>
                  <button class="small-square ghost" title="Modifier" @click="openEdit(event)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"
                      />
                    </svg>
                  </button>
                  <button
                    class="small-square ghost destructive"
                    title="Supprimer"
                    @click="askRemove(event.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"
                      />
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

  <AppModal
    :open="showModal"
    :title="editingId ? 'Modifier l\'événement' : 'Créer un événement'"
    @close="closeModal"
  >
    <div class="form-group">
      <label class="required">
        Titre
        <input v-model="form.title" type="text" placeholder="Nom de l'événement" />
      </label>
    </div>

    <div class="form-group">
      <label class="required">
        Date
        <input v-model="form.date" type="date" />
      </label>
    </div>

    <template #footer>
      <button class="ghost small" @click="closeModal">Annuler</button>
      <button class="secondary small" @click="save">
        {{ editingId ? 'Enregistrer' : 'Créer' }}
      </button>
    </template>
  </AppModal>

  <ConfirmDialog
    :open="confirmId !== null"
    title="Supprimer l'événement"
    message="Cette action est irréversible. Confirmer la suppression ?"
    confirm-label="Supprimer"
    @confirm="confirmRemove"
    @cancel="cancelRemove"
  />
</template>
