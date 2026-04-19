<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import AppSidebar from '@/components/AppSidebar.vue'
import { useDashboard } from '@/composables/useDashboard'

ChartJS.register(ArcElement, Tooltip, Legend)

const { stats, pendingActions, activityLogs } = useDashboard()

const chartData = computed(() => ({
  labels: stats.value.prestatairesDistribution.labels,
  datasets: [
    {
      data: stats.value.prestatairesDistribution.values,
      backgroundColor: ['#3b82f6', '#d97706', '#22c55e'],
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
        font: { size: 12 },
      },
    },
  },
}
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <h1 class="dashboard-title">Tableau de bord</h1>

      <div class="dashboard-row">
        <div class="dashboard-card dashboard-card--chart">
          <div class="dashboard-chart-wrapper">
            <Pie :data="chartData" :options="chartOptions" />
          </div>
        </div>

        <div class="dashboard-card dashboard-card--stats">
          <div class="dashboard-stat">
            <svg class="dashboard-stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
            </svg>
            <span class="dashboard-stat-value">{{ stats.usersCount }}</span>
          </div>

          <div class="dashboard-stat-divider"></div>

          <div class="dashboard-stat">
            <svg class="dashboard-stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
              <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z" />
            </svg>
            <span class="dashboard-stat-value">{{ stats.prestatairesCount }}</span>
          </div>
        </div>
      </div>

      <div class="dashboard-row dashboard-row--actions">
        <div
          v-for="action in pendingActions"
          :key="action.id"
          class="dashboard-card dashboard-card--action"
        >
          <svg class="dashboard-action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
            <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z" />
          </svg>
          <p class="dashboard-action-title">{{ action.title }}</p>
          <p class="dashboard-action-desc">{{ action.description }}</p>
          <RouterLink :to="action.link" class="dashboard-action-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
            </svg>
          </RouterLink>
        </div>
      </div>

      <div class="dashboard-card dashboard-card--activity">
        <h2 class="dashboard-activity-title">Flux d'activité Récente</h2>
        <ul class="dashboard-activity-list">
          <li v-for="log in activityLogs" :key="log.id" class="dashboard-activity-item">
            <div class="dashboard-activity-avatar"></div>
            <span class="dashboard-activity-text"> {{ log.adminName }} - {{ log.action }} </span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>
