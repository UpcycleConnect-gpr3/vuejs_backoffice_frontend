<script setup lang="ts">
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

type ReportStatus = 'pending' | 'resolved' | 'dismissed'
type ReportTarget = 'talk' | 'message'

interface Report {
  id: number
  target: ReportTarget
  targetTitle: string
  excerpt: string
  reason: 'spam' | 'abuse' | 'offtopic' | 'duplicate' | 'other'
  reporter: string
  reportedUser: string
  createdAt: string
  status: ReportStatus
}

const reports = ref<Report[]>([
  {
    id: 1,
    target: 'message',
    targetTitle: 'Outils essentiels pour démarrer',
    excerpt: 'Allez voir mon site jamesbuyfast-deal.example pour des prix imbattables !!!',
    reason: 'spam',
    reporter: 'Marie L.',
    reportedUser: 'JamesBuyer',
    createdAt: '2026-04-26 14:32',
    status: 'pending',
  },
  {
    id: 2,
    target: 'talk',
    targetTitle: 'TON site est nul lol',
    excerpt: 'Discussion entière qui dénigre la communauté…',
    reason: 'abuse',
    reporter: 'Thomas M.',
    reportedUser: 'AnonUser92',
    createdAt: '2026-04-26 09:15',
    status: 'pending',
  },
  {
    id: 3,
    target: 'message',
    targetTitle: 'Comment réparer un meuble ?',
    excerpt: 'Hors sujet — parle de cuisine sur un thread restauration.',
    reason: 'offtopic',
    reporter: 'Julie B.',
    reportedUser: 'CookingFan',
    createdAt: '2026-04-25 18:42',
    status: 'pending',
  },
  {
    id: 4,
    target: 'message',
    targetTitle: 'Tutoriel palette',
    excerpt: "Doublon — ce tuto a été posté 3 fois aujourd'hui.",
    reason: 'duplicate',
    reporter: 'Alex D.',
    reportedUser: 'NewUser',
    createdAt: '2026-04-25 12:00',
    status: 'resolved',
  },
  {
    id: 5,
    target: 'talk',
    targetTitle: 'Question stupide sur les vis',
    excerpt: 'Insultes répétées dans la discussion.',
    reason: 'abuse',
    reporter: 'Marie L.',
    reportedUser: 'AngryDude',
    createdAt: '2026-04-24 21:10',
    status: 'dismissed',
  },
])

const filter = ref<'pending' | 'all' | 'resolved' | 'dismissed'>('pending')

const filtered = computed(() =>
  filter.value === 'all' ? reports.value : reports.value.filter((r) => r.status === filter.value),
)

const stats = computed(() => ({
  pending: reports.value.filter((r) => r.status === 'pending').length,
  resolved: reports.value.filter((r) => r.status === 'resolved').length,
  dismissed: reports.value.filter((r) => r.status === 'dismissed').length,
}))

const reasonLabel = {
  spam: 'Spam',
  abuse: 'Abus / Insultes',
  offtopic: 'Hors-sujet',
  duplicate: 'Doublon',
  other: 'Autre',
} as const

function resolve(id: number, action: 'delete' | 'warn' | 'ban') {
  const r = reports.value.find((x) => x.id === id)
  if (!r) return
  r.status = 'resolved'
  console.log(`Action: ${action} on report ${id}`)
}

function dismiss(id: number) {
  const r = reports.value.find((x) => x.id === id)
  if (r) r.status = 'dismissed'
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <header class="dashboard-header">
        <div>
          <span class="eyebrow">Staff · Modération</span>
          <h1 class="dashboard-title">File de modération</h1>
          <p class="muted measure">
            Examinez les signalements et appliquez les actions de modération.
          </p>
        </div>
        <div class="layout-flex layout-gap-medium">
          <button class="ghost medium">Règles</button>
          <button class="primary medium">Voir le forum</button>
        </div>
      </header>

      <div class="stats-row">
        <div class="stat-tile">
          <span class="stat-tile-label">En attente</span>
          <div class="stat-tile-value-row">
            <span class="stat-tile-value">{{ stats.pending }}</span>
            <span v-if="stats.pending > 0" class="badge badge--danger">Action</span>
          </div>
        </div>
        <div class="stat-tile">
          <span class="stat-tile-label">Résolus (7j)</span>
          <span class="stat-tile-value">{{ stats.resolved }}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-tile-label">Rejetés (7j)</span>
          <span class="stat-tile-value">{{ stats.dismissed }}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-tile-label">Total</span>
          <span class="stat-tile-value">{{ reports.length }}</span>
        </div>
      </div>

      <div class="layout-flex layout-gap-small" style="flex-wrap: wrap">
        <button
          class="forum-tab"
          :class="{ active: filter === 'pending' }"
          @click="filter = 'pending'"
        >
          En attente
        </button>
        <button
          class="forum-tab"
          :class="{ active: filter === 'resolved' }"
          @click="filter = 'resolved'"
        >
          Résolus
        </button>
        <button
          class="forum-tab"
          :class="{ active: filter === 'dismissed' }"
          @click="filter = 'dismissed'"
        >
          Rejetés
        </button>
        <button class="forum-tab" :class="{ active: filter === 'all' }" @click="filter = 'all'">
          Tout
        </button>
      </div>

      <div class="layout-flex layout-columns layout-gap-medium">
        <article
          v-for="r in filtered"
          :key="r.id"
          class="dashboard-card moderation-card"
          :class="{ 'is-resolved': r.status !== 'pending' }"
        >
          <div
            class="layout-flex layout-justify-between layout-items-center"
            style="flex-wrap: wrap; gap: var(--space-3)"
          >
            <div class="layout-flex layout-gap-small layout-items-center" style="flex-wrap: wrap">
              <span class="badge badge--danger">{{ reasonLabel[r.reason] }}</span>
              <span class="badge">{{ r.target === 'talk' ? 'Discussion' : 'Message' }}</span>
              <span
                class="badge"
                :class="{
                  'badge--accent': r.status === 'pending',
                  'badge--success': r.status === 'resolved',
                  'badge--muted': r.status === 'dismissed',
                }"
              >
                {{
                  r.status === 'pending'
                    ? 'En attente'
                    : r.status === 'resolved'
                      ? 'Résolu'
                      : 'Rejeté'
                }}
              </span>
              <span class="tiny muted">{{ r.createdAt }}</span>
            </div>
            <span class="tiny muted"
              >Signalé par {{ r.reporter }} · auteur :
              <strong style="color: var(--foreground-color)">{{ r.reportedUser }}</strong></span
            >
          </div>

          <h4 style="margin-top: var(--space-2)">{{ r.targetTitle }}</h4>
          <blockquote class="moderation-quote">{{ r.excerpt }}</blockquote>

          <div
            v-if="r.status === 'pending'"
            class="layout-flex layout-justify-end layout-gap-small"
            style="padding-top: var(--space-3); border-top: 1px solid var(--green-700)"
          >
            <button class="ghost small" @click="dismiss(r.id)">Rejeter</button>
            <button class="ghost small" @click="resolve(r.id, 'warn')">Avertir l'auteur</button>
            <button
              class="ghost small"
              style="color: var(--destructive-color)"
              @click="resolve(r.id, 'delete')"
            >
              Supprimer le contenu
            </button>
            <button class="destructive small" @click="resolve(r.id, 'ban')">Bannir l'auteur</button>
          </div>
        </article>

        <p v-if="filtered.length === 0" class="muted center" style="padding: var(--space-10)">
          Aucun signalement à afficher.
        </p>
      </div>
    </main>
  </div>
</template>
