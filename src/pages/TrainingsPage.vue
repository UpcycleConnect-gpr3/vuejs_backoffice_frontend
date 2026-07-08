<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import AppModal from '@/components/AppModal.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import Pagination from '@/components/Pagination.vue'
import { useTrainings } from '@/composables/useTrainings'

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
} = useTrainings()
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <div class="dashboard-row" style="align-items: center; justify-content: space-between">
        <h1 class="dashboard-title">Formations</h1>
        <div style="display: flex; align-items: center; gap: var(--gap-medium)">
          <span
            style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4)"
          >
            {{ filtered.length }} formation{{ filtered.length > 1 ? 's' : '' }}
          </span>
          <button class="secondary small" @click="openCreate">+ Créer une formation</button>
        </div>
      </div>

      <div class="dashboard-row" style="flex-wrap: wrap">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher une formation…"
          style="flex: 1; min-width: 200px"
        />
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Mode</th>
              <th>Durée</th>
              <th>Participants</th>
              <th>Lieu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td
                colspan="7"
                style="
                  text-align: center;
                  color: oklch(from var(--white) l c h / 0.4);
                  padding: var(--gap-extra-large);
                "
              >
                Aucune formation trouvée
              </td>
            </tr>
            <tr v-for="t in paginated" :key="t.id">
              <td style="font-weight: 500">{{ t.name }}</td>
              <td>{{ t.type }}</td>
              <td>{{ t.mode_of_delivery }}</td>
              <td>{{ t.duration }}</td>
              <td>
                {{ t.minimum_number_of_participants }} – {{ t.maximum_number_of_participants }}
              </td>
              <td>{{ t.location }}</td>
              <td>
                <div style="display: flex; gap: var(--gap-small)">
                  <button class="small-square ghost" title="Modifier" @click="openEdit(t)">
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
                    @click="askRemove(t.id)"
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
    :title="editingId ? 'Modifier la formation' : 'Créer une formation'"
    @close="closeModal"
  >
    <div class="form-group">
      <label class="required">
        Nom
        <input v-model="form.name" type="text" placeholder="Nom de la formation" />
      </label>
    </div>
    <div class="dashboard-row">
      <div class="form-group" style="flex: 1">
        <label>
          Type
          <input v-model="form.type" type="text" placeholder="Workshop, Course…" />
        </label>
      </div>
      <div class="form-group" style="flex: 1">
        <label>
          Mode
          <input v-model="form.mode_of_delivery" type="text" placeholder="On-site, Online…" />
        </label>
      </div>
    </div>
    <div class="form-group">
      <label>
        Durée
        <input v-model="form.duration" type="text" placeholder="2h, 40h…" />
      </label>
    </div>
    <div class="dashboard-row">
      <div class="form-group" style="flex: 1">
        <label>
          Participants min
          <input v-model.number="form.minimum_number_of_participants" type="number" min="0" />
        </label>
      </div>
      <div class="form-group" style="flex: 1">
        <label>
          Participants max
          <input v-model.number="form.maximum_number_of_participants" type="number" min="0" />
        </label>
      </div>
    </div>
    <div class="form-group">
      <label>
        Lieu
        <input v-model="form.location" type="text" placeholder="Ville…" />
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
    title="Supprimer la formation"
    message="Cette action est irréversible. Confirmer la suppression ?"
    confirm-label="Supprimer"
    @confirm="confirmRemove"
    @cancel="cancelRemove"
  />
</template>
