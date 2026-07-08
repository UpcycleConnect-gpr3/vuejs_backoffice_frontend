<script setup lang="ts">
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

type EventType = 'workshop' | 'course' | 'conseil' | 'meeting'

interface PlanningEvent {
  id: number
  title: string
  type: EventType
  start: string
  duration: number
  location: string
  participants: number
}

const events = ref<PlanningEvent[]>([
  {
    id: 1,
    title: 'Atelier upcycling N1',
    type: 'workshop',
    start: '2026-04-27 14:00',
    duration: 120,
    location: 'Salle A · Atelier',
    participants: 8,
  },
  {
    id: 2,
    title: 'Réunion équipe formateurs',
    type: 'meeting',
    start: '2026-04-28 10:00',
    duration: 60,
    location: 'Visio',
    participants: 6,
  },
  {
    id: 3,
    title: 'Restaurer un meuble bois',
    type: 'workshop',
    start: '2026-04-29 14:00',
    duration: 180,
    location: 'Salle A · Atelier',
    participants: 5,
  },
  {
    id: 4,
    title: 'Conseil débutants',
    type: 'conseil',
    start: '2026-04-30 11:00',
    duration: 45,
    location: 'En ligne',
    participants: 23,
  },
  {
    id: 5,
    title: 'Formation animateurs',
    type: 'course',
    start: '2026-05-02 09:00',
    duration: 240,
    location: 'Salle plénière',
    participants: 12,
  },
])

const view = ref<'week' | 'list'>('week')

const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const hours = Array.from({ length: 11 }, (_, i) => i + 8)

const weekStart = ref(new Date('2026-04-27'))

const weekDays = computed(() => {
  return days.map((d, i) => {
    const date = new Date(weekStart.value)
    date.setDate(date.getDate() + i)
    return { name: d, date, iso: date.toISOString().slice(0, 10) }
  })
})

const eventsByDay = computed(() => {
  const map: Record<string, PlanningEvent[]> = {}
  for (const e of events.value) {
    const day = e.start.slice(0, 10)
    if (!map[day]) map[day] = []
    map[day].push(e)
  }
  return map
})

function eventStyle(e: PlanningEvent) {
  const h = parseInt(e.start.slice(11, 13))
  const m = parseInt(e.start.slice(14, 16))
  const top = (h - 8) * 60 + m
  return {
    top: `${top}px`,
    height: `${e.duration}px`,
  }
}

function shiftWeek(delta: number) {
  const next = new Date(weekStart.value)
  next.setDate(next.getDate() + delta * 7)
  weekStart.value = next
}

const typeColors: Record<EventType, string> = {
  workshop: 'var(--lime-500)',
  course: 'var(--purple-500)',
  conseil: 'var(--lime-300)',
  meeting: 'var(--text-tertiary)',
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <header class="dashboard-header">
        <div>
          <span class="eyebrow">Staff · Planning</span>
          <h1 class="dashboard-title">Planning</h1>
          <p class="muted measure">Vos sessions, ateliers et réunions à venir.</p>
        </div>
        <div class="layout-flex layout-gap-medium">
          <button class="ghost medium" @click="view = view === 'week' ? 'list' : 'week'">
            Vue {{ view === 'week' ? 'liste' : 'semaine' }}
          </button>
          <button class="primary medium">+ Bloquer un créneau</button>
        </div>
      </header>

      <div class="planning-toolbar">
        <button class="ghost small" @click="shiftWeek(-1)"> Semaine précédente</button>
        <span style="font-weight: 600">
          Semaine du {{ weekDays[0]?.date.toLocaleDateString('fr-FR') }} au
          {{ weekDays[6]?.date.toLocaleDateString('fr-FR') }}
        </span>
        <button class="ghost small" @click="shiftWeek(1)">Semaine suivante </button>
      </div>

      <div v-if="view === 'week'" class="planning-grid">
        <div class="planning-hours">
          <div class="planning-day-head">&nbsp;</div>
          <div v-for="h in hours" :key="h" class="planning-hour">{{ h }}h</div>
        </div>

        <div v-for="d in weekDays" :key="d.iso" class="planning-day">
          <div class="planning-day-head">
            <span class="tiny muted uppercase" style="font-weight: 600">{{ d.name }}</span>
            <span style="font-weight: 700; font-size: var(--font-size-large)">{{
              d.date.getDate()
            }}</span>
          </div>
          <div class="planning-day-body">
            <div v-for="h in hours" :key="h" class="planning-slot"></div>
            <article
              v-for="e in eventsByDay[d.iso] ?? []"
              :key="e.id"
              class="planning-event"
              :style="eventStyle(e)"
            >
              <span
                class="planning-event-dot"
                :style="{ backgroundColor: typeColors[e.type] }"
              ></span>
              <div class="planning-event-body">
                <span class="planning-event-title">{{ e.title }}</span>
                <span class="tiny muted">{{ e.start.slice(11, 16) }} · {{ e.location }}</span>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div v-else class="layout-flex layout-columns layout-gap-medium">
        <article
          v-for="e in events"
          :key="e.id"
          class="dashboard-card"
          style="flex-direction: row; align-items: center; gap: var(--space-5)"
        >
          <div class="planning-list-time">
            <div style="font-weight: 700; font-size: var(--font-size-xlarge)">
              {{ e.start.slice(11, 16) }}
            </div>
            <div class="tiny muted">{{ e.duration }} min</div>
          </div>
          <div style="flex: 1">
            <div class="layout-flex layout-gap-small layout-items-center">
              <span class="badge">{{ e.type }}</span>
              <span class="tiny muted">{{ e.start.slice(0, 10) }}</span>
            </div>
            <div style="font-weight: 600; margin-top: 4px">{{ e.title }}</div>
            <div class="tiny muted">{{ e.location }} · {{ e.participants }} inscrits</div>
          </div>
          <button class="ghost small">Détail</button>
        </article>
      </div>
    </main>
  </div>
</template>
