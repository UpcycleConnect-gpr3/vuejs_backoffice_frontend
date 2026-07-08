<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { useDepositRequests } from '@/composables/useDepositRequests'

const { filtered, loading, search, count } = useDepositRequests()
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <div class="dashboard-row" style="align-items: center; justify-content: space-between">
        <div class="layout-flex layout-gap-medium" style="align-items: center">
          <h1 class="dashboard-title" style="margin-bottom: 0">Conteneurs</h1>
          <span class="badge badge--accent">{{ count }} objet(s) déposé(s)</span>
        </div>
      </div>
      <p class="small muted" style="margin-top: var(--gap-small)">
        Objets actuellement dans les conteneurs, en attente de récupération par un professionnel.
      </p>

      <div class="dashboard-row" style="flex-wrap: wrap">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher un objet, une catégorie, une ville…"
          style="flex: 1; min-width: 200px"
        />
      </div>

      <div class="dashboard-card table-wrapper" style="padding: 0">
        <table>
          <thead>
            <tr>
              <th>Objet</th>
              <th>Catégorie</th>
              <th>Conteneur</th>
              <th>Code</th>
              <th>Score éco</th>
              <th>Expire le</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!loading && filtered.length === 0">
              <td
                colspan="6"
                style="
                  text-align: center;
                  color: oklch(from var(--white) l c h / 0.4);
                  padding: var(--gap-extra-large);
                "
              >
                Aucun objet en conteneur
              </td>
            </tr>
            <tr v-for="d in filtered" :key="d.package_id">
              <td style="font-weight: 500">{{ d.object_name }}</td>
              <td>{{ d.category }}</td>
              <td>{{ d.locker_name }} · {{ d.locker_city }}</td>
              <td><span class="mono">{{ d.code }}</span></td>
              <td>+{{ d.score }} kg CO₂</td>
              <td>{{ (d.expiry_date || '').slice(0, 10) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>
