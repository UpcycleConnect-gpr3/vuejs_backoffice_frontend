<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import AppModal from '@/components/AppModal.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useUsers } from '@/composables/useUsers'

const {
  filtered,
  search,
  showDetail,
  detailUser,
  showModal,
  form,
  confirmId,
  openDetail,
  closeDetail,
  openEdit,
  closeModal,
  save,
  askRemove,
  cancelRemove,
  confirmRemove,
} = useUsers()

function initials(firstname: string, lastname: string) {
  return `${firstname?.[0] ?? ''}${lastname?.[0] ?? ''}`.toUpperCase() || '?'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR')
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <div class="dashboard-row" style="align-items: center; justify-content: space-between">
        <h1 class="dashboard-title">Utilisateurs</h1>
        <span
          style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4)"
        >
          {{ filtered.length }} utilisateur{{ filtered.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div class="dashboard-row" style="flex-wrap: wrap">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher par nom, identifiant ou email…"
          style="flex: 1; min-width: 200px"
        />
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0">
        <table>
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Identifiant</th>
              <th>Inscription</th>
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
                Aucun utilisateur trouvé
              </td>
            </tr>
            <tr v-for="user in filtered" :key="user.id">
              <td>
                <div style="display: flex; align-items: center; gap: var(--gap-medium)">
                  <div class="avatar">{{ initials(user.firstname, user.lastname) }}</div>
                  <div>
                    <div style="font-weight: 500">{{ user.firstname }} {{ user.lastname }}</div>
                    <div
                      style="
                        font-size: var(--font-size-small);
                        color: oklch(from var(--white) l c h / 0.5);
                      "
                    >
                      {{ user.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td>{{ user.username }}</td>
              <td>{{ formatDate(user.created_at) }}</td>
              <td>
                <div style="display: flex; gap: var(--gap-small)">
                  <button class="small-square ghost" title="Voir" @click="openDetail(user)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"
                      />
                    </svg>
                  </button>
                  <button class="small-square ghost" title="Modifier" @click="openEdit(user)">
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
                    @click="askRemove(user.id)"
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

  <!-- Read-only detail modal -->
  <AppModal :open="showDetail" title="Détail de l'utilisateur" @close="closeDetail">
    <div v-if="detailUser" style="display: flex; flex-direction: column; gap: var(--gap-medium)">
      <div>
        <p style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.5)">
          Nom
        </p>
        <p style="font-weight: 500">{{ detailUser.firstname }} {{ detailUser.lastname }}</p>
      </div>
      <div>
        <p style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.5)">
          Identifiant
        </p>
        <p>{{ detailUser.username }}</p>
      </div>
      <div>
        <p style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.5)">
          E-mail
        </p>
        <p>{{ detailUser.email }}</p>
      </div>
      <div>
        <p style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.5)">
          Inscription
        </p>
        <p>{{ formatDate(detailUser.created_at) }}</p>
      </div>
    </div>
    <template #footer>
      <button class="secondary small" @click="closeDetail">Fermer</button>
    </template>
  </AppModal>

  <!-- Edit modal (forum PUT /users/{id}/ — no create endpoint; only username/firstname/lastname are writable) -->
  <AppModal :open="showModal" title="Modifier l'utilisateur" @close="closeModal">
    <div class="form-group">
      <label class="required">
        Identifiant
        <input v-model="form.username" type="text" placeholder="Identifiant" />
      </label>
    </div>
    <div class="dashboard-row">
      <div class="form-group" style="flex: 1">
        <label class="required">
          Prénom
          <input v-model="form.firstname" type="text" placeholder="Prénom" />
        </label>
      </div>
      <div class="form-group" style="flex: 1">
        <label class="required">
          Nom
          <input v-model="form.lastname" type="text" placeholder="Nom" />
        </label>
      </div>
    </div>
    <template #footer>
      <button class="ghost small" @click="closeModal">Annuler</button>
      <button class="secondary small" @click="save">Enregistrer</button>
    </template>
  </AppModal>

  <ConfirmDialog
    :open="confirmId !== null"
    title="Supprimer l'utilisateur"
    message="Cette action est irréversible. Confirmer la suppression ?"
    confirm-label="Supprimer"
    @confirm="confirmRemove"
    @cancel="cancelRemove"
  />
</template>
