<script setup lang="ts">
import { RouterLink } from 'vue-router'

const coreNav = [
  {
    label: 'Tableau de bord',
    to: '/',
    icon: 'M228.92,49.69a8,8,0,0,0-6.86-1.45L160.93,63.52,99.58,32.84a8,8,0,0,0-5.52-.6l-64,16A8,8,0,0,0,24,56V200a8,8,0,0,0,9.94,7.76l61.13-15.28,61.35,30.68A8,8,0,0,0,160,224a8.15,8.15,0,0,0,1.94-.24l64-16A8,8,0,0,0,232,200V56A8,8,0,0,0,228.92,49.69ZM104,52.94l48,24V203.06l-48-24ZM40,62.25l48-12v127.5L40,189.75ZM216,193.75l-48,12V78.25l48-12Z',
  },
]

const entitiesNav = [
  { label: 'Utilisateurs', to: '/users', icon: 'M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,96.1,96.1,0,0,1,52.22,42A8,8,0,0,1,250.14,206.7Z' },
  { label: 'Prestataires', to: '/providers', icon: 'M247.42,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V176a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,247.42,117ZM184,88h34.58l9.6,24H184ZM24,72H168v64H24ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208Zm81-32H103a32,32,0,0,0-62,0H24V152H168v12.31A32.11,32.11,0,0,0,153,176Zm31,32a16,16,0,1,1,16-16A16,16,0,0,1,184,208Zm48-32H215a32.06,32.06,0,0,0-31-24V128h48Z' },
  { label: 'Catégories', to: '/categories', icon: 'M224,48H160a8,8,0,0,0-6.4,3.2L128,85.33,102.4,51.2A8,8,0,0,0,96,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM96,64l19.2,25.6L96,115.2V64ZM32,64H80v64a16,16,0,0,0,28.8,9.6L128,112l19.2,25.6A16,16,0,0,0,176,128V64h48V192H32Z' },
  { label: 'Objets', to: '/objects', icon: 'M239.82,157l-12-96A16,16,0,0,0,212,47H44A16,16,0,0,0,28.18,61l-12,96A16,16,0,0,0,32,175H224A16,16,0,0,0,239.82,157ZM44,63H212l12,96H32ZM168,95a40,40,0,0,1-80,0,8,8,0,0,1,16,0,24,24,0,0,0,48,0,8,8,0,0,1,16,0Z' },
  { label: 'Projets', to: '/projects', icon: 'M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM88,128a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H80A8,8,0,0,1,88,128Zm112,0a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h80A8,8,0,0,1,200,128ZM88,96a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H80A8,8,0,0,1,88,96Zm112,0a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h80A8,8,0,0,1,200,96ZM88,160a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H80A8,8,0,0,1,88,160Zm112,0a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h80A8,8,0,0,1,200,160Z' },
]

const forumNav = [
  { label: 'Talks', to: '/talks', icon: 'M216,48H40A16,16,0,0,0,24,64V224a15.85,15.85,0,0,0,9.24,14.5A16.13,16.13,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78.69.69,0,0,0,.13-.11L82.5,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,224h0ZM216,192H82.5a16,16,0,0,0-10.3,3.75l-.12.11L40,224V64H216Z' },
  { label: 'Formations', to: '/trainings', icon: 'M226,66.34a8,8,0,0,0-3.34-1.14l-64-16a8,8,0,0,0-4.94.42L128,60.27,102.33,49.62a8,8,0,0,0-4.94-.42l-64,16A8,8,0,0,0,28,72V192a8,8,0,0,0,9.94,7.76l61.13-15.28,61.35,30.68A8,8,0,0,0,164,216a8.15,8.15,0,0,0,1.94-.24l64-16A8,8,0,0,0,236,192V72A8,8,0,0,0,226,66.34ZM108,64.81l48,19.8V199.19l-48-19.8ZM44,78.25l48-12v113.5l-48,12ZM220,185.75l-48,12V84.25l48-12Z' },
  { label: 'Événements', to: '/events', icon: 'M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z' },
]

const systemNav = [
  { label: 'Demandes de dépôt', to: '/deposit-requests', icon: 'M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z' },
  { label: 'Journaux', to: '/logs', icon: 'M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216v36H40ZM40,200V108H216v92Z' },
  { label: 'Paramètres', to: '/settings', icon: 'M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,192a64,64,0,1,1,64-64A64.07,64.07,0,0,1,128,192Z' },
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="logo-dot"></div>
      <span>UpcycleConnect</span>
    </div>

    <nav class="sidebar-nav-group">
      <ul class="sidebar-nav sidebar-nav-list">
        <li v-for="item in coreNav" :key="item.to" class="sidebar-nav-item">
          <RouterLink :to="item.to">
            <svg class="sidebar-icon" viewBox="0 0 256 256" fill="currentColor"><path :d="item.icon" /></svg>
            <span>{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>

      <div class="sidebar-section">
        <span class="sidebar-section-title">Entités</span>
        <ul class="sidebar-nav sidebar-nav-list">
          <li v-for="item in entitiesNav" :key="item.to" class="sidebar-nav-item">
            <RouterLink :to="item.to">
              <svg class="sidebar-icon" viewBox="0 0 256 256" fill="currentColor"><path :d="item.icon" /></svg>
              <span>{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="sidebar-section">
        <span class="sidebar-section-title">Forum &amp; Training</span>
        <ul class="sidebar-nav sidebar-nav-list">
          <li v-for="item in forumNav" :key="item.to" class="sidebar-nav-item">
            <RouterLink :to="item.to">
              <svg class="sidebar-icon" viewBox="0 0 256 256" fill="currentColor"><path :d="item.icon" /></svg>
              <span>{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="sidebar-section">
        <span class="sidebar-section-title">Système</span>
        <ul class="sidebar-nav sidebar-nav-list">
          <li v-for="item in systemNav" :key="item.to" class="sidebar-nav-item">
            <RouterLink :to="item.to">
              <svg class="sidebar-icon" viewBox="0 0 256 256" fill="currentColor"><path :d="item.icon" /></svg>
              <span>{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <div class="sidebar-user">
      <div class="sidebar-user-avatar">AD</div>
      <div class="sidebar-user-info">
        <span class="sidebar-user-name">Admin Demo</span>
        <span class="sidebar-user-role">Administrateur</span>
      </div>
      <button class="sidebar-user-action" title="Se déconnecter" aria-label="Se déconnecter">
        <svg viewBox="0 0 256 256" fill="currentColor"><path d="M120,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h64a8,8,0,0,1,0,16H48V208h64A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" /></svg>
      </button>
    </div>
  </aside>
</template>
