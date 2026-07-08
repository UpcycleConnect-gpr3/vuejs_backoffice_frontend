<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import AppModal from '@/components/AppModal.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import Pagination from '@/components/Pagination.vue'
import { useObjects } from '@/composables/useObjects'

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
  validate,
  reject,
  askRemove,
  cancelRemove,
  confirmRemove,
} = useObjects()
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <div class="dashboard-row" style="align-items: center; justify-content: space-between">
        <h1 class="dashboard-title">Objets</h1>
        <div style="display: flex; align-items: center; gap: var(--gap-medium)">
          <span
            style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.4)"
          >
            {{ filtered.length }} objet{{ filtered.length > 1 ? 's' : '' }}
          </span>
          <button class="secondary small" @click="openCreate">+ Créer un objet</button>
        </div>
      </div>

      <div class="dashboard-row" style="flex-wrap: wrap">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher un objet…"
          style="flex: 1; min-width: 200px"
        />
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Score éco</th>
              <th>Vendeur</th>
              <th>Statut</th>
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
                Aucun objet trouvé
              </td>
            </tr>
            <tr v-for="o in paginated" :key="o.id">
              <td style="font-weight: 500">{{ o.name }}</td>
              <td>{{ o.price }} €</td>
              <td>{{ o.quantity }}</td>
              <td>{{ o.score }}</td>
              <td>{{ o.sell_by }}</td>
              <td>
                <span
                  class="badge"
                  :class="o.is_ad_validated ? 'badge--success' : 'badge--accent'"
                >
                  {{ o.is_ad_validated ? 'Validée' : 'En attente' }}
                </span>
              </td>
              <td>
                <div style="display: flex; gap: var(--gap-small)">
                  <button
                    v-if="!o.is_ad_validated"
                    class="small ghost"
                    title="Valider l'annonce"
                    style="color: var(--lime-500, #7ac74f)"
                    @click="validate(o.id)"
                  >
                    Valider
                  </button>
                  <button
                    v-else
                    class="small ghost"
                    title="Invalider l'annonce"
                    @click="reject(o.id)"
                  >
                    Invalider
                  </button>
                  <button class="small-square ghost" title="Modifier" @click="openEdit(o)">
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
                    @click="askRemove(o.id)"
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
    :title="editingId ? 'Modifier l\'objet' : 'Créer un objet'"
    @close="closeModal"
  >
    <div class="form-group">
      <label class="required">
        Nom
        <input v-model="form.name" type="text" placeholder="Nom de l'objet" />
      </label>
    </div>
    <div class="form-group">
      <label>
        Description
        <textarea v-model="form.description" rows="3" style="resize: vertical"></textarea>
      </label>
    </div>
    <div class="dashboard-row">
      <div class="form-group" style="flex: 1">
        <label class="required">
          Prix (€)
          <input v-model.number="form.price" type="number" min="0" step="0.01" />
        </label>
      </div>
      <div class="form-group" style="flex: 1">
        <label class="required">
          Quantité
          <input v-model.number="form.quantity" type="number" min="0" />
        </label>
      </div>
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
    title="Supprimer l'objet"
    message="Cette action est irréversible. Confirmer la suppression ?"
    confirm-label="Supprimer"
    @confirm="confirmRemove"
    @cancel="cancelRemove"
  />
</template>
