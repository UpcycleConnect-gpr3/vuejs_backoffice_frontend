# vuejs_backoffice_frontend — Pages

Interface d'administration (back-office) pour gérer toutes les entités métier.

Accès : `http://backoffice.localhost` (Docker) ou `http://localhost:5173`

## Routes

### Admin

| Chemin | Composant | Entité backend | Description | Liens |
|---|---|---|---|---|
| `/` | `DashboardPage` | — | KPIs, stats tiles, chart, activité, actions | [docker](http://backoffice.localhost/) · [local](http://localhost:5173/) |
| `/users` | `UsersPage` | `USERS` | Table utilisateurs filtre + recherche | [docker](http://backoffice.localhost/users) · [local](http://localhost:5173/users) |
| `/providers` | `PrestatairePage` | — | Prestataires / fournisseurs | [docker](http://backoffice.localhost/providers) · [local](http://localhost:5173/providers) |
| `/categories` | `CategoriesPage` | `CATEGORIES` | Cards icônes Phosphor par catégorie | [docker](http://backoffice.localhost/categories) · [local](http://localhost:5173/categories) |
| `/objects` | `ObjectsPage` | `OBJECTS` | Table objets (prix, score éco, vendeur) | [docker](http://backoffice.localhost/objects) · [local](http://localhost:5173/objects) |
| `/projects` | `ProjectsPage` | `PROJECTS` | Table projets | [docker](http://backoffice.localhost/projects) · [local](http://localhost:5173/projects) |
| `/talks` | `TalksPage` | `TALKS` | Table talks + messages count | [docker](http://backoffice.localhost/talks) · [local](http://localhost:5173/talks) |
| `/trainings` | `TrainingsPage` | `TRAININGS` | Table formations | [docker](http://backoffice.localhost/trainings) · [local](http://localhost:5173/trainings) |
| `/events` | `EventsPage` | `EVENTS` | Calendrier événements | [docker](http://backoffice.localhost/events) · [local](http://localhost:5173/events) |
| `/deposit-requests` | `DepositRequestsPage` | — | Demandes de dépôt à valider | [docker](http://backoffice.localhost/deposit-requests) · [local](http://localhost:5173/deposit-requests) |
| `/logs` | `LogsPage` | — | Journaux système | [docker](http://backoffice.localhost/logs) · [local](http://localhost:5173/logs) |
| `/settings` | `SettingsPage` | — | Paramètres | [docker](http://backoffice.localhost/settings) · [local](http://localhost:5173/settings) |

### Animation (staff — animateurs / formateurs)

Partie dédiée aux salariés à temps partiels qui créent et animent les évènements.

| Chemin | Composant | Description | Liens |
|---|---|---|---|
| `/staff/trainings` | `MyTrainingsPage` | CRUD formations avec workflow validation (brouillon → en validation → validé/refusé → live → terminé) | [docker](http://backoffice.localhost/staff/trainings) · [local](http://localhost:5173/staff/trainings) |
| `/staff/planning` | `PlanningPage` | Vue semaine (grille 8h-18h × 7j) ou liste. Events colorés par type | [docker](http://backoffice.localhost/staff/planning) · [local](http://localhost:5173/staff/planning) |
| `/staff/advice` | `AdvicePage` | CRUD conseils & news. États : brouillon / publié / archivé | [docker](http://backoffice.localhost/staff/advice) · [local](http://localhost:5173/staff/advice) |
| `/staff/moderation` | `ModerationPage` | File de signalements. Actions : Rejeter / Avertir / Supprimer / Bannir | [docker](http://backoffice.localhost/staff/moderation) · [local](http://localhost:5173/staff/moderation) |

## Composants

### `AppSidebar.vue`

Sidebar 260px sticky avec :
- Logo lime + brand "UpcycleConnect"
- Nav groupée en 3 sections avec titres uppercase :
  - **Entités** : Utilisateurs, Prestataires, Catégories, Objets, Projets
  - **Forum & Training** : Talks, Formations, Événements
  - **Système** : Demandes de dépôt, Journaux, Paramètres
- Icônes SVG Phosphor 18px à gauche de chaque label
- Active state : bg lime + black text + barre lime 3px à gauche
- User block bottom : avatar lime + nom + rôle + bouton logout (hover destructive)
- Custom scrollbar 6px

## Architecture

```
src/
├── api/           # Calls HTTP vers les backends Go
├── components/    # AppSidebar, etc.
├── composables/   # useUsers, useCategories, useDashboard, ...
├── css/           # components / styles / layouts / themes
├── pages/         # 1 page par route
├── router/        # vue-router
├── stores/        # Pinia
└── types/         # Types TypeScript par domaine
    ├── auth-backend/
    ├── forum/
    └── upcycle-connect/
```

## Design tokens

Mêmes tokens que `vuejs_upcycle_connect_frontend` :
- Fond page `#1F2021`, cards `#142726` (green-800)
- Sidebar `#142726` avec border green-700
- Stat tiles hover bordure lime
- Action cards `#D8FF4F` lime cliquables avec lift
- Inter 400-900, no border-radius

## Backends consommés

| Backend | Hostname Docker | Port direct |
|---|---|---|
| `go_auth_backend` | `http://auth.localhost` | `8081` |
| `go_forum_backend` | `http://forum.localhost` | `8082` |
| `go_training_backend` | `http://training.localhost` | `8083` |
| `go_upcycle_connect_backend` | `http://upcycle.localhost` | `8084` |

## Conventions

- Page = `<AppSidebar />` + `<main class="dashboard-main">`
- Header de page = eyebrow + `<h1 class="dashboard-title">` + actions
- Stat tiles `.stats-row > .stat-tile` avec label uppercase + value black + badge variation
- Cards données = `.dashboard-card` (green-800, hover green-600 border)
- Tables = `.table-wrapper` avec headers uppercase tracking + row hover green-700
- Actions tile = `.dashboard-card--action` (lime + lift hover)
- Avatars = `.avatar` (green-700 bg, lime text)
- Badges = `.badge` + variantes `--success | --muted | --danger | --accent`
- Icon boxes = `.icon-box` (lime tinted bg)
