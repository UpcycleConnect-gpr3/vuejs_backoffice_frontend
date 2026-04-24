<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { RouterLink } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import { useDashboard } from '@/composables/useDashboard'

ChartJS.register(ArcElement, Tooltip, Legend)

const { stats, pendingActions, activityLogs } = useDashboard()

const chartData = computed(() => ({
  labels: stats.value.prestatairesDistribution.labels,
  datasets: [
    {
      data: stats.value.prestatairesDistribution.values,
      backgroundColor: ['#D8FF4F', '#8E4EC6', '#1F5F58'],
      borderWidth: 0,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: '#ffffff',
        font: { size: 12, family: 'Inter' },
        padding: 16,
      },
    },
  },
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <header class="dashboard-header">
        <div>
          <span class="eyebrow">Overview</span>
          <h1 class="dashboard-title">Tableau de bord</h1>
        </div>
        <div class="layout-flex layout-gap-medium">
          <button class="ghost medium">Export</button>
          <button class="primary medium">+ Nouveau</button>
        </div>
      </header>

      <!-- Top stats row -->
      <div class="stats-row">
        <div class="stat-tile">
          <span class="stat-tile-label">Utilisateurs</span>
          <div class="stat-tile-value-row">
            <span class="stat-tile-value">{{ stats.usersCount }}</span>
            <span class="badge badge--success">+12%</span>
          </div>
          <p class="small muted">ce mois-ci</p>
        </div>

        <div class="stat-tile">
          <span class="stat-tile-label">Prestataires</span>
          <div class="stat-tile-value-row">
            <span class="stat-tile-value">{{ stats.prestatairesCount }}</span>
            <span class="badge badge--success">+4%</span>
          </div>
          <p class="small muted">ce mois-ci</p>
        </div>

        <div class="stat-tile">
          <span class="stat-tile-label">Dépôts en attente</span>
          <div class="stat-tile-value-row">
            <span class="stat-tile-value">{{ pendingActions.length }}</span>
            <span class="badge badge--accent">Action</span>
          </div>
          <p class="small muted">à traiter</p>
        </div>

        <div class="stat-tile">
          <span class="stat-tile-label">Activité</span>
          <div class="stat-tile-value-row">
            <span class="stat-tile-value">{{ activityLogs.length }}</span>
            <span class="badge badge--muted">7 jours</span>
          </div>
          <p class="small muted">événements récents</p>
        </div>
      </div>

      <!-- Chart + pending actions -->
      <div class="dashboard-grid">
        <div class="dashboard-card dashboard-card--chart">
          <div class="card-header">
            <span class="eyebrow">Répartition</span>
            <h3>Prestataires par catégorie</h3>
          </div>
          <div class="dashboard-chart-wrapper">
            <Pie :data="chartData" :options="chartOptions" />
          </div>
        </div>

        <div class="dashboard-card dashboard-card--activity">
          <div class="card-header">
            <span class="eyebrow">Activité</span>
            <h3>Flux récent</h3>
          </div>
          <ul class="dashboard-activity-list">
            <li v-for="log in activityLogs" :key="log.id" class="dashboard-activity-item">
              <div class="dashboard-activity-avatar"></div>
              <div class="layout-flex layout-columns" style="gap: 2px; flex: 1; min-width: 0;">
                <span class="small" style="font-weight: 500;">{{ log.adminName }}</span>
                <span class="tiny muted">{{ log.action }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Pending actions -->
      <div v-if="pendingActions.length" class="layout-flex layout-columns layout-gap-medium">
        <span class="eyebrow">Actions en attente</span>
        <div class="actions-grid">
          <RouterLink
            v-for="action in pendingActions"
            :key="action.id"
            :to="action.link"
            class="dashboard-card dashboard-card--action"
          >
            <svg class="dashboard-action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
              <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Z" />
            </svg>
            <p class="dashboard-action-title">{{ action.title }}</p>
            <p class="dashboard-action-desc">{{ action.description }}</p>
            <span class="dashboard-action-arrow">→</span>
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>
