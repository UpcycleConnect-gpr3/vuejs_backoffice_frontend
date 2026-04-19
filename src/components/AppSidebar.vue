<script setup lang="ts">
import { RouterLink } from 'vue-router'

const navItems = [
  { label: 'Tableau de bord', to: '/' },
  { label: 'Utilisateurs', to: '/users' },
  { label: 'Prestataires', to: '/providers' },
  { label: 'Catégories', to: '/categories' },
  { label: 'Événements', to: '/events' },
  { label: 'Journaux', to: '/logs' },
  { label: 'Demandes Dépôt', to: '/deposit-requests' },
  { label: 'Paramètres', to: '/settings' },
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <img src="/logo.png" alt="UpcycleConnect" class="sidebar-logo-img" />
    </div>

    <nav>
      <ul class="sidebar-nav sidebar-nav-list">
        <li v-for="item in navItems" :key="item.to" class="sidebar-nav-item">
          <RouterLink :to="item.to">{{ item.label }}</RouterLink>
        </li>
      </ul>
    </nav>

    <div class="sidebar-user">
      <div class="sidebar-user-avatar"></div>
      <div class="sidebar-user-info">
        <span class="sidebar-user-name">nom</span>
        <span class="sidebar-user-role">utilisateur</span>
      </div>
    </div>
  </aside>
</template>
