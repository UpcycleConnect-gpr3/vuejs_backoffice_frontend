c<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { useSettings } from '@/composables/useSettings'

const { locale, account, setLocale, saveAccount } = useSettings()
</script>

<template>
  <div class="layout-app">
    <AppSidebar />

    <main class="dashboard-main">
      <h1 class="dashboard-title">Paramètres</h1>

      <div class="dashboard-card" style="display: flex; flex-direction: column; gap: var(--gap-large); max-width: 560px;">
        <div>
          <p style="font-weight: 500; font-size: var(--font-size-medium);">Langue</p>
          <p style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.5); margin-top: 4px;">
            Choisissez la langue de l'interface.
          </p>
        </div>
        <div style="display: flex; gap: var(--gap-medium);">
          <button :class="['small', locale === 'fr' ? 'secondary' : 'outline']" @click="setLocale('fr')">
            Français
          </button>
          <button :class="['small', locale === 'en' ? 'secondary' : 'outline']" @click="setLocale('en')">
            English
          </button>
        </div>
      </div>

      <div class="dashboard-card" style="display: flex; flex-direction: column; gap: var(--gap-large); max-width: 560px;">
        <div>
          <p style="font-weight: 500; font-size: var(--font-size-medium);">Mon compte</p>
          <p style="font-size: var(--font-size-small); color: oklch(from var(--white) l c h / 0.5); margin-top: 4px;">
            Modifiez vos informations personnelles.
          </p>
        </div>

        <form style="display: flex; flex-direction: column; gap: var(--gap-large);" @submit.prevent="saveAccount">
          <div class="form-group">
            <label>
              Nom
              <input v-model="account.name" type="text" placeholder="Votre nom" />
            </label>
          </div>

          <div class="form-group">
            <label>
              Adresse e-mail
              <input v-model="account.email" type="email" placeholder="votre@email.com" />
            </label>
          </div>

          <div style="height: 1px; background-color: oklch(from var(--white) l c h / 0.1);"></div>

          <div class="form-group">
            <label>
              Mot de passe actuel
              <input v-model="account.currentPassword" type="password" placeholder="••••••••" />
            </label>
          </div>

          <div class="form-group">
            <label>
              Nouveau mot de passe
              <input v-model="account.newPassword" type="password" placeholder="••••••••" />
            </label>
          </div>

          <div>
            <button type="submit" class="secondary small">Enregistrer</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>
