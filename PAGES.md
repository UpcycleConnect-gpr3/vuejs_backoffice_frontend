# vuejs_backoffice_frontend — Pages

Interface d'administration (back-office) pour gérer toutes les entités métier.

Accès : `http://backoffice.localhost` (Docker) ou `http://localhost:5173`

## Routes

| Chemin | Composant | Entité backend | Description |
|---|---|---|---|
| `/` | `DashboardPage` | — | Tableau de bord, KPIs, activité récente |
| `/users` | `UsersPage` | `USERS` (tous backends) | Liste + filtres + recherche utilisateurs |
| `/providers` | `PrestatairePage` | — | Prestataires / fournisseurs |
| `/categories` | `CategoriesPage` | `CATEGORIES` (forum, training) | Catégories avec icônes |
| `/objects` | `ObjectsPage` | `OBJECTS` (upcycle) | Objets upcycling (prix, score, vendeur) |
| `/projects` | `ProjectsPage` | `PROJECTS` (forum, upcycle) | Projets d'upcycling |
| `/talks` | `TalksPage` | `TALKS` (forum) | Talks du forum avec messages |
| `/trainings` | `TrainingsPage` | `TRAININGS` (training) | Formations (workshop, cours) |
| `/events` | `EventsPage` | `EVENTS` (forum) | Événements |
| `/deposit-requests` | `DepositRequestsPage` | — | Demandes de dépôt |
| `/logs` | `LogsPage` | — | Journaux système |
| `/settings` | `SettingsPage` | — | Paramètres de l'application |

## Architecture

```
src/
├── api/           # Appels HTTP vers les backends
├── components/    # Composants UI (AppSidebar, etc.)
├── composables/   # Hooks métier (useUsers, useCategories, …)
├── css/           # components / styles / layouts / themes
├── pages/         # Pages (1 par route)
├── router/        # Configuration vue-router
├── stores/        # Pinia stores
└── types/         # Types TypeScript par domaine
    ├── auth/
    ├── forum/
    ├── upcycle-connect/
    └── auth-backend/
```

## API backends consommés

| Backend | Base URL Docker | Port local |
|---|---|---|
| `go_auth_backend` | `http://auth.localhost` | `8081` |
| `go_forum_backend` | `http://forum.localhost` | `8082` |
| `go_training_backend` | `http://training.localhost` | `8083` |
| `go_upcycle_connect_backend` | `http://upcycle.localhost` | `8084` |

## Conventions

- Chaque page utilise `<AppSidebar />` + `<main class="dashboard-main">`.
- Les listes sont dans un `.dashboard-card.table-wrapper` avec filtres `dashboard-row` au-dessus.
- Actions : boutons `small-square ghost` avec icônes Phosphor inline.
- Badges de statut : classes `badge badge--success|muted|danger`.
