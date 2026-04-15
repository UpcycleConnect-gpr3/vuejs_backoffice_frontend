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
            <svg
              class="dashboard-stat-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span class="dashboard-stat-value">{{ stats.usersCount }}</span>
          </div>

          <div class="dashboard-stat-divider"></div>

          <div class="dashboard-stat">
            <svg
              class="dashboard-stat-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
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
          <svg
            class="dashboard-action-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          <p class="dashboard-action-title">{{ action.title }}</p>
          <p class="dashboard-action-desc">{{ action.description }}</p>
          <RouterLink :to="action.link" class="dashboard-action-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m16 16 4-4m0 0-4-4m4 4H8" />
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
