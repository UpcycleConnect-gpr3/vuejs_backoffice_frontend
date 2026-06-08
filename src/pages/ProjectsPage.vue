<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import AppModal from '@/components/AppModal.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import Pagination from '@/components/Pagination.vue'
import { useProjects } from '@/composables/useProjects'

const {
  filtered,
  paginated,
  search,
  page,
  pageSize,
  showModal,
  editingId,
  form,
  confirmId,
  openCreate,
  openEdit,
  closeModal,
  save,
  askRemove,
  cancelRemove,
  confirmRemove,
} = useProjects()

function formatDate(iso: string) {
  return iso ? new Date(iso).toLocaleDateString('fr-FR') : '–'
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <div class="dashboard-row" style="align-items: center; justify-content: space-between">
        <h1 class="dashboard-title">Projets</h1>
        <div style="display: flex; align-items: center; gap: var(--gap-medium)">
          <span
            style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4)"
          >
            {{ filtered.length }} projet{{ filtered.length > 1 ? 's' : '' }}
          </span>
          <button class="secondary small" @click="openCreate">+ Créer un projet</button>
        </div>
      </div>

      <div class="dashboard-row" style="flex-wrap: wrap">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher un projet…"
          style="flex: 1; min-width: 200px"
        />
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Auteur</th>
              <th>Créé le</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td
                colspan="5"
                style="
                  text-align: center;
                  color: oklch(from var(--white) l c h / 0.4);
                  padding: var(--gap-extra-large);
                "
              >
                Aucun projet trouvé
              </td>
            </tr>
            <tr v-for="p in paginated" :key="p.id">
              <td style="font-weight: 500">{{ p.name }}</td>
              <td>{{ p.description }}</td>
              <td>{{ p.user_id }}</td>
              <td>{{ formatDate(p.created_at) }}</td>
              <td>
                <div style="display: flex; gap: var(--gap-small)">
                  <button class="small-square ghost" title="Modifier" @click="openEdit(p)">
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
                    @click="askRemove(p.id)"
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
        <Pagination
          :total="filtered.length"
          :page="page"
          :page-size="pageSize"
          @update:page="page = $event"
        />
      </div>
    </main>
  </div>

  <AppModal
    :open="showModal"
    :title="editingId ? 'Modifier le projet' : 'Créer un projet'"
    @close="closeModal"
  >
    <div class="form-group">
      <label class="required">
        Nom
        <input v-model="form.name" type="text" placeholder="Nom du projet" />
      </label>
    </div>
    <div class="form-group">
      <label>
        Description
        <textarea v-model="form.description" rows="3" style="resize: vertical"></textarea>
      </label>
    </div>
    <div class="form-group">
      <label>
        Image (chemin)
        <input v-model="form.image_path" type="text" placeholder="/images/…" />
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
    title="Supprimer le projet"
    message="Cette action est irréversible. Confirmer la suppression ?"
    confirm-label="Supprimer"
    @confirm="confirmRemove"
    @cancel="cancelRemove"
  />
</template>
