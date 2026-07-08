<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

type Status = 'draft' | 'pending' | 'approved' | 'rejected' | 'live' | 'done'

interface Training {
  id: number
  title: string
  type: 'workshop' | 'course' | 'conseil'
  status: Status
  date: string
  participants: number
  capacity: number
  reviewer?: string
  rejectReason?: string
}

const filter = ref<'all' | Status>('all')

const trainings = ref<Training[]>([
  {
    id: 1,
    title: "Initiation à l'upcycling — Niveau 1",
    type: 'workshop',
    status: 'live',
    date: '2026-05-12 14:00',
    participants: 8,
    capacity: 12,
  },
  {
    id: 2,
    title: 'Restaurer un meuble en bois',
    type: 'workshop',
    status: 'approved',
    date: '2026-05-20 10:00',
    participants: 3,
    capacity: 10,
  },
  {
    id: 3,
    title: 'Atelier transformation textile',
    type: 'course',
    status: 'pending',
    date: '2026-06-02 14:00',
    participants: 0,
    capacity: 15,
    reviewer: 'Marie L.',
  },
  {
    id: 4,
    title: 'Conseils débutants — printemps',
    type: 'conseil',
    status: 'draft',
    date: '2026-06-10 09:00',
    participants: 0,
    capacity: 20,
  },
  {
    id: 5,
    title: 'Workshop palettes industrielles',
    type: 'workshop',
    status: 'rejected',
    date: '2026-04-30 14:00',
    participants: 0,
    capacity: 8,
    rejectReason: 'Capacité trop élevée pour cet espace.',
  },
  {
    id: 6,
    title: 'Formation animateurs Q1',
    type: 'course',
    status: 'done',
    date: '2026-03-15 10:00',
    participants: 12,
    capacity: 12,
  },
])

const statusMeta: Record<Status, { label: string; badge: string }> = {
  draft: { label: 'Brouillon', badge: 'badge--muted' },
  pending: { label: 'En validation', badge: 'badge--accent' },
  approved: { label: 'Validé', badge: 'badge--success' },
  rejected: { label: 'Refusé', badge: 'badge--danger' },
  live: { label: 'En cours', badge: 'badge--success' },
  done: { label: 'Terminé', badge: 'badge--muted' },
}

const stats = computed(() => ({
  total: trainings.value.length,
  pending: trainings.value.filter((t) => t.status === 'pending').length,
  approved: trainings.value.filter((t) => t.status === 'approved' || t.status === 'live').length,
  done: trainings.value.filter((t) => t.status === 'done').length,
}))

const filtered = computed(() =>
  filter.value === 'all'
    ? trainings.value
    : trainings.value.filter((t) => t.status === filter.value),
)

const draftForm = reactive({
  title: '',
  type: 'workshop' as Training['type'],
  date: '',
  capacity: 10,
  description: '',
})

const showForm = ref(false)

function submitDraft(forApproval: boolean) {
  if (!draftForm.title || !draftForm.date) return
  const next: Training = {
    id: Date.now(),
    title: draftForm.title,
    type: draftForm.type,
    status: forApproval ? 'pending' : 'draft',
    date: draftForm.date,
    participants: 0,
    capacity: draftForm.capacity,
    reviewer: forApproval ? 'À assigner' : undefined,
  }
  trainings.value.unshift(next)
  Object.assign(draftForm, { title: '', type: 'workshop', date: '', capacity: 10, description: '' })
  showForm.value = false
}

function requestApproval(id: number) {
  const t = trainings.value.find((x) => x.id === id)
  if (t && t.status === 'draft') {
    t.status = 'pending'
    t.reviewer = 'À assigner'
  }
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <header class="dashboard-header">
        <div>
          <span class="eyebrow">Staff · Animation</span>
          <h1 class="dashboard-title">Mes formations</h1>
          <p class="muted measure">
            Créez vos formations, soumettez-les à validation et animez vos sessions.
          </p>
        </div>
        <div class="layout-flex layout-gap-medium">
          <button class="ghost medium">Importer</button>
          <button class="primary medium" @click="showForm = !showForm">+ Nouvelle formation</button>
        </div>
      </header>

      <section v-if="showForm" class="dashboard-card">
        <div class="card-header">
          <span class="eyebrow">Nouvelle formation</span>
          <h3>Décrivez votre session</h3>
        </div>
        <form class="layout-flex layout-columns layout-gap-medium" @submit.prevent>
          <div class="form-group">
            <label class="uppercase">Titre</label>
            <input
              v-model="draftForm.title"
              type="text"
              class="primary medium full-width"
              placeholder="Ex: Atelier transformation palettes"
              required
            />
          </div>
          <div class="layout-flex layout-gap-medium">
            <div class="form-group" style="flex: 1">
              <label class="uppercase">Type</label>
              <select v-model="draftForm.type" class="primary medium full-width">
                <option value="workshop">Atelier</option>
                <option value="course">Formation</option>
                <option value="conseil">Conseil</option>
              </select>
            </div>
            <div class="form-group" style="flex: 1">
              <label class="uppercase">Date &amp; heure</label>
              <input
                v-model="draftForm.date"
                type="datetime-local"
                class="primary medium full-width"
              />
            </div>
            <div class="form-group" style="width: 140px">
              <label class="uppercase">Capacité</label>
              <input
                v-model.number="draftForm.capacity"
                type="number"
                min="1"
                class="primary medium full-width"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="uppercase">Description</label>
            <textarea
              v-model="draftForm.description"
              class="primary full-width"
              rows="4"
              placeholder="Détaillez le contenu, les prérequis, le matériel…"
            ></textarea>
          </div>
          <div
            class="layout-flex layout-justify-end layout-gap-medium"
            style="padding-top: var(--space-3); border-top: 1px solid var(--green-700)"
          >
            <button class="ghost medium" type="button" @click="showForm = false">Annuler</button>
            <button class="ghost medium" type="button" @click="submitDraft(false)">
              Enregistrer brouillon
            </button>
            <button class="primary medium" type="button" @click="submitDraft(true)">
              Soumettre à validation
            </button>
          </div>
        </form>
      </section>

      <div class="stats-row">
        <div class="stat-tile">
          <span class="stat-tile-label">Total</span>
          <span class="stat-tile-value">{{ stats.total }}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-tile-label">En validation</span>
          <span class="stat-tile-value">{{ stats.pending }}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-tile-label">Validées / Live</span>
          <span class="stat-tile-value">{{ stats.approved }}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-tile-label">Terminées</span>
          <span class="stat-tile-value">{{ stats.done }}</span>
        </div>
      </div>

      <div class="layout-flex layout-gap-small" style="flex-wrap: wrap">
        <button class="forum-tab" :class="{ active: filter === 'all' }" @click="filter = 'all'">
          Tout
        </button>
        <button
          v-for="(meta, key) in statusMeta"
          :key="key"
          class="forum-tab"
          :class="{ active: filter === key }"
          @click="filter = key as Status"
        >
          {{ meta.label }}
        </button>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Formation</th>
              <th>Type</th>
              <th>Date</th>
              <th>Inscrits</th>
              <th>Statut</th>
              <th>Validateur</th>
              <th style="text-align: right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in filtered" :key="t.id">
              <td>
                <div style="font-weight: 600">{{ t.title }}</div>
                <div v-if="t.rejectReason" class="tiny" style="color: var(--destructive-color)">
                  Refusé : {{ t.rejectReason }}
                </div>
              </td>
              <td>
                <span class="badge">{{ t.type }}</span>
              </td>
              <td class="mono">{{ t.date }}</td>
              <td class="mono">{{ t.participants }} / {{ t.capacity }}</td>
              <td>
                <span class="badge" :class="statusMeta[t.status].badge">{{
                  statusMeta[t.status].label
                }}</span>
              </td>
              <td>{{ t.reviewer ?? '—' }}</td>
              <td style="text-align: right">
                <div class="layout-flex layout-justify-end layout-gap-small">
                  <button
                    v-if="t.status === 'draft'"
                    class="ghost small"
                    @click="requestApproval(t.id)"
                  >
                    Soumettre
                  </button>
                  <button
                    v-if="t.status === 'live' || t.status === 'approved'"
                    class="primary small"
                  >
                    Animer
                  </button>
                  <button class="ghost small">Modifier</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>
