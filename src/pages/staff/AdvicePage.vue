<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

type AdviceStatus = 'draft' | 'published' | 'archived'

interface Advice {
  id: number
  title: string
  category: string
  status: AdviceStatus
  views: number
  publishedAt: string | null
  updatedAt: string
}

const items = ref<Advice[]>([
  {
    id: 1,
    title: '5 conseils pour bien démarrer votre premier projet',
    category: 'Débutant',
    status: 'published',
    views: 1247,
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-22',
  },
  {
    id: 2,
    title: "Outils essentiels pour l'upcycling de meubles",
    category: 'Outils',
    status: 'published',
    views: 856,
    publishedAt: '2026-04-10',
    updatedAt: '2026-04-10',
  },
  {
    id: 3,
    title: 'Tendances 2026 : matériaux à privilégier',
    category: 'Tendances',
    status: 'draft',
    views: 0,
    publishedAt: null,
    updatedAt: '2026-04-26',
  },
  {
    id: 4,
    title: 'Comment poncer correctement',
    category: 'Technique',
    status: 'published',
    views: 432,
    publishedAt: '2026-03-28',
    updatedAt: '2026-04-02',
  },
  {
    id: 5,
    title: 'Anciennes méthodes à éviter',
    category: 'Technique',
    status: 'archived',
    views: 89,
    publishedAt: '2025-12-20',
    updatedAt: '2026-04-26',
  },
])

const filter = ref<'all' | AdviceStatus>('all')
const search = ref('')

const filtered = computed(() =>
  items.value.filter((it) => {
    if (filter.value !== 'all' && it.status !== filter.value) return false
    if (search.value && !it.title.toLowerCase().includes(search.value.toLowerCase())) return false
    return true
  }),
)

const stats = computed(() => ({
  published: items.value.filter((i) => i.status === 'published').length,
  drafts: items.value.filter((i) => i.status === 'draft').length,
  views: items.value.reduce((sum, i) => sum + i.views, 0),
}))

const showEditor = ref(false)
const editorMode = ref<'create' | 'edit'>('create')
const editing = reactive<Partial<Advice & { content: string }>>({})

function openCreate() {
  editorMode.value = 'create'
  Object.assign(editing, { id: 0, title: '', category: '', status: 'draft', content: '' })
  showEditor.value = true
}

function openEdit(item: Advice) {
  editorMode.value = 'edit'
  Object.assign(editing, { ...item, content: '' })
  showEditor.value = true
}

function save(asPublished: boolean) {
  const status: AdviceStatus = asPublished ? 'published' : 'draft'
  if (editorMode.value === 'create') {
    items.value.unshift({
      id: Date.now(),
      title: editing.title ?? '',
      category: editing.category ?? '',
      status,
      views: 0,
      publishedAt: asPublished ? new Date().toISOString().slice(0, 10) : null,
      updatedAt: new Date().toISOString().slice(0, 10),
    })
  } else if (editing.id) {
    const idx = items.value.findIndex((i) => i.id === editing.id)
    const existing = items.value[idx]
    if (existing) {
      items.value[idx] = {
        ...existing,
        title: editing.title ?? existing.title,
        category: editing.category ?? existing.category,
        status,
        publishedAt:
          asPublished && !existing.publishedAt
            ? new Date().toISOString().slice(0, 10)
            : existing.publishedAt,
        updatedAt: new Date().toISOString().slice(0, 10),
      }
    }
  }
  showEditor.value = false
}

function archive(id: number) {
  const it = items.value.find((i) => i.id === id)
  if (it) it.status = 'archived'
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <header class="dashboard-header">
        <div>
          <span class="eyebrow">Staff · Contenu</span>
          <h1 class="dashboard-title">Conseils &amp; News</h1>
          <p class="muted measure">Rédigez, publiez et gérez les conseils et actualités du site.</p>
        </div>
        <button class="primary medium" @click="openCreate">+ Nouveau conseil</button>
      </header>

      <section v-if="showEditor" class="dashboard-card">
        <div class="card-header">
          <span class="eyebrow">{{ editorMode === 'create' ? 'Nouveau' : 'Modification' }}</span>
          <h3>
            {{ editorMode === 'create' ? 'Rédiger un nouveau conseil' : 'Modifier le conseil' }}
          </h3>
        </div>
        <form class="layout-flex layout-columns layout-gap-medium" @submit.prevent>
          <div class="form-group">
            <label class="uppercase">Titre</label>
            <input
              v-model="editing.title"
              type="text"
              class="primary medium full-width"
              placeholder="Titre accrocheur du conseil"
              required
            />
          </div>
          <div class="form-group">
            <label class="uppercase">Catégorie</label>
            <select v-model="editing.category" class="primary medium full-width">
              <option value="" disabled>Choisir…</option>
              <option>Débutant</option>
              <option>Outils</option>
              <option>Technique</option>
              <option>Tendances</option>
              <option>Inspiration</option>
            </select>
          </div>
          <div class="form-group">
            <label class="uppercase">Contenu (markdown)</label>
            <textarea
              v-model="editing.content"
              class="primary full-width"
              rows="12"
              placeholder="# Introduction&#10;&#10;Décrivez le conseil ici…"
            ></textarea>
          </div>
          <div
            class="layout-flex layout-justify-end layout-gap-medium"
            style="padding-top: var(--space-3); border-top: 1px solid var(--green-700)"
          >
            <button class="ghost medium" type="button" @click="showEditor = false">Annuler</button>
            <button class="ghost medium" type="button" @click="save(false)">
              Enregistrer brouillon
            </button>
            <button class="primary medium" type="button" @click="save(true)">Publier</button>
          </div>
        </form>
      </section>

      <div class="stats-row">
        <div class="stat-tile">
          <span class="stat-tile-label">Publiés</span>
          <span class="stat-tile-value">{{ stats.published }}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-tile-label">Brouillons</span>
          <span class="stat-tile-value">{{ stats.drafts }}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-tile-label">Vues totales</span>
          <span class="stat-tile-value">{{ stats.views.toLocaleString('fr-FR') }}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-tile-label">Total</span>
          <span class="stat-tile-value">{{ items.length }}</span>
        </div>
      </div>

      <div class="layout-flex layout-gap-medium layout-items-center" style="flex-wrap: wrap">
        <input
          v-model="search"
          type="search"
          class="primary medium"
          placeholder="Rechercher un conseil…"
          style="flex: 1; min-width: 240px"
        />
        <div class="layout-flex layout-gap-small">
          <button class="forum-tab" :class="{ active: filter === 'all' }" @click="filter = 'all'">
            Tout
          </button>
          <button
            class="forum-tab"
            :class="{ active: filter === 'published' }"
            @click="filter = 'published'"
          >
            Publiés
          </button>
          <button
            class="forum-tab"
            :class="{ active: filter === 'draft' }"
            @click="filter = 'draft'"
          >
            Brouillons
          </button>
          <button
            class="forum-tab"
            :class="{ active: filter === 'archived' }"
            @click="filter = 'archived'"
          >
            Archivés
          </button>
        </div>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Statut</th>
              <th>Vues</th>
              <th>Publié le</th>
              <th>Modifié</th>
              <th style="text-align: right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="it in filtered" :key="it.id">
              <td style="font-weight: 600">{{ it.title }}</td>
              <td>
                <span class="badge">{{ it.category }}</span>
              </td>
              <td>
                <span
                  class="badge"
                  :class="{
                    'badge--success': it.status === 'published',
                    'badge--accent': it.status === 'draft',
                    'badge--muted': it.status === 'archived',
                  }"
                >
                  {{
                    it.status === 'published'
                      ? 'Publié'
                      : it.status === 'draft'
                        ? 'Brouillon'
                        : 'Archivé'
                  }}
                </span>
              </td>
              <td class="mono">{{ it.views.toLocaleString('fr-FR') }}</td>
              <td class="mono">{{ it.publishedAt ?? '—' }}</td>
              <td class="mono">{{ it.updatedAt }}</td>
              <td style="text-align: right">
                <div class="layout-flex layout-justify-end layout-gap-small">
                  <button class="ghost small" @click="openEdit(it)">Modifier</button>
                  <button
                    v-if="it.status !== 'archived'"
                    class="ghost small"
                    style="color: var(--destructive-color)"
                    @click="archive(it.id)"
                  >
                    Archiver
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
