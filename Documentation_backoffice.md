# Documentation - API Upcycle Connect (Backoffice)

Documentation complète des routes API utilisées par le backoffice, générée à partir de l'analyse du projet (`src/api/*` et `src/types/*`).

---

## Règles générales

### Backends et URLs de base

Quatre backends distincts, configurés via `.env` :

| Backend  | Variable d'env      | URL par défaut              | Trailing slash |
|----------|---------------------|-----------------------------|----------------|
| auth     | `VITE_AUTH_URL`     | `http://auth.localhost`     | **Requis**     |
| forum    | `VITE_FORUM_URL`    | `http://forum.localhost`    | **Requis**     |
| training | `VITE_TRAINING_URL` | `http://training.localhost` | **Requis**     |
| upcycle  | `VITE_UPCYCLE_URL`  | `http://upcycle.localhost`  | **Interdit**   |

- Il n'y a **pas de préfixe `/api`** : les routes sont à la racine.
- Backends `auth` / `forum` / `training` : chaque chemin **doit** se terminer par `/` (matcher Go 1.22 `{$}`).
- Backend `upcycle` : chemin **sans** trailing slash.

### Authentification

- Le token JWT est stocké dans le cookie `bearer_token` (partagé sur `*.localhost`).
- Il est envoyé dans le header : `Authorization: token` (**sans** préfixe `Bearer `).

### Enveloppe de réponse

- Succès (un objet) :

```json
{
	"success": true,
	"data": {}
}
```

- Succès (plusieurs objets) :

```json
{
	"success": true,
	"data": []
}
```

- Suppression :

```json
{
	"success": true,
	"message": "<resource> deleted"
}
```

- Erreur :

```json
{
	"errors": [
		{
			"field": "<field>",
			"message": "<message>"
		}
	],
	"message": "<global_message>",
	"status": "<status_text>"
}
```

---

# Backend FORUM (`http://forum.localhost`)

## User

> ⚠️ Le backend forum expose uniquement GET / PUT / DELETE — il n'y a **pas** d'endpoint de création d'utilisateur depuis le backoffice. L'email est en lecture seule (absent du DTO de mise à jour).

### GET

```
GET /users/
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": "a1b2c3d4-0000-0000-0000-000000000000",
			"username": "example-user",
			"firstname": "Jean",
			"lastname": "Dupont",
			"email": "jean.dupont@example.com",
			"created_at": "2026-05-27 19:58:47",
			"updated_at": "2026-05-27 19:59:32"
		}
	]
}
```

---

### GET (par ID)

```
GET /users/{id}/
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": {
		"id": "a1b2c3d4-0000-0000-0000-000000000000",
		"username": "example-user",
		"firstname": "Jean",
		"lastname": "Dupont",
		"email": "jean.dupont@example.com",
		"created_at": "2026-05-27 19:58:47",
		"updated_at": "2026-05-27 19:59:32"
	}
}
```

---

### PUT

```
PUT /users/{id}/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

```json
{
	"username": "example-user",
	"firstname": "Jean",
	"lastname": "Dupont"
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": "a1b2c3d4-0000-0000-0000-000000000000",
		"username": "example-user",
		"firstname": "Jean",
		"lastname": "Dupont",
		"email": "jean.dupont@example.com",
		"created_at": "2026-05-27 19:58:47",
		"updated_at": "2026-05-27 19:59:32"
	}
}
```

---

### DELETE

```
DELETE /users/{id}/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"message": "User deleted"
}
```

---

## Category

### GET

```
GET /categories/
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"name": "example-text",
			"description": "example-text",
			"created_at": "2026-05-27 19:58:47",
			"updated_at": "2026-05-27 19:59:32"
		}
	]
}
```

---

### POST

```
POST /categories/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

```json
{
	"name": "example-text",
	"description": "example-text"
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": 1,
		"name": "example-text",
		"description": "example-text",
		"created_at": "2026-05-27 19:58:47",
		"updated_at": "2026-05-27 19:59:32"
	}
}
```

---

### PUT

```
PUT /categories/{id}/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

*(Champs partiels acceptés)*

```json
{
	"name": "example-text",
	"description": "example-text"
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": 1,
		"name": "example-text",
		"description": "example-text",
		"created_at": "2026-05-27 19:58:47",
		"updated_at": "2026-05-27 19:59:32"
	}
}
```

---

### DELETE

```
DELETE /categories/{id}/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"message": "Category deleted"
}
```

---

## Event

> ⚠️ Le modèle Event du backend est minimal : uniquement `{ id, title, date }`. Pas de description, lieu, dates de début/fin ni statut.

### GET

```
GET /events/
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"title": "example-text",
			"date": "2026-05-27 19:58:47"
		}
	]
}
```

---

### POST

```
POST /events/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

```json
{
	"title": "example-text",
	"date": "2026-05-27 19:58:47"
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": 1,
		"title": "example-text",
		"date": "2026-05-27 19:58:47"
	}
}
```

---

### PUT

```
PUT /events/{id}/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

*(Champs partiels acceptés)*

```json
{
	"title": "example-text",
	"date": "2026-05-27 19:58:47"
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": 1,
		"title": "example-text",
		"date": "2026-05-27 19:58:47"
	}
}
```

---

### DELETE

```
DELETE /events/{id}/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"message": "Event deleted"
}
```

---

## Talk

> La création accepte `{ title, type, status, description }` ; la mise à jour accepte uniquement `{ title, status }`.

### GET

```
GET /talks/
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"title": "example-text",
			"type": "example-text",
			"status": "example-text",
			"description": "example-text",
			"created_at": "2026-05-27 19:58:47",
			"updated_at": "2026-05-27 19:59:32"
		}
	]
}
```

---

### POST

```
POST /talks/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

```json
{
	"title": "example-text",
	"type": "example-text",
	"status": "example-text",
	"description": "example-text"
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": 1,
		"title": "example-text",
		"type": "example-text",
		"status": "example-text",
		"description": "example-text",
		"created_at": "2026-05-27 19:58:47",
		"updated_at": "2026-05-27 19:59:32"
	}
}
```

---

### PUT

```
PUT /talks/{id}/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

```json
{
	"title": "example-text",
	"status": "example-text"
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": 1,
		"title": "example-text",
		"type": "example-text",
		"status": "example-text",
		"description": "example-text",
		"created_at": "2026-05-27 19:58:47",
		"updated_at": "2026-05-27 19:59:32"
	}
}
```

---

### DELETE

```
DELETE /talks/{id}/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"message": "Talk deleted"
}
```

---

### GET (messages d'un talk)

```
GET /talks/{id}/messages/
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"content": "example-text",
			"user_id": "a1b2c3d4-0000-0000-0000-000000000000",
			"talk_id": 1,
			"created_at": "2026-05-27 19:58:47"
		}
	]
}
```

---

### GET (membres d'un talk)

```
GET /talks/{id}/users/
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": "a1b2c3d4-0000-0000-0000-000000000000",
			"username": "example-user"
		}
	]
}
```

---

# Backend TRAINING (`http://training.localhost`)

## Training

### GET

```
GET /trainings/
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"name": "example-text",
			"type": "example-text",
			"mode_of_delivery": "example-text",
			"duration": "example-text",
			"minimum_number_of_participants": 1,
			"maximum_number_of_participants": 10,
			"location": "example-text"
		}
	]
}
```

---

### POST

```
POST /trainings/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

*(Seul `name` est obligatoire)*

```json
{
	"name": "example-text",
	"type": "example-text",
	"mode_of_delivery": "example-text",
	"duration": "example-text",
	"minimum_number_of_participants": 1,
	"maximum_number_of_participants": 10,
	"location": "example-text"
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": 1,
		"name": "example-text",
		"type": "example-text",
		"mode_of_delivery": "example-text",
		"duration": "example-text",
		"minimum_number_of_participants": 1,
		"maximum_number_of_participants": 10,
		"location": "example-text"
	}
}
```

---

### PUT

```
PUT /trainings/{id}/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

*(Champs partiels acceptés)*

```json
{
	"name": "example-text",
	"location": "example-text"
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": 1,
		"name": "example-text",
		"type": "example-text",
		"mode_of_delivery": "example-text",
		"duration": "example-text",
		"minimum_number_of_participants": 1,
		"maximum_number_of_participants": 10,
		"location": "example-text"
	}
}
```

---

### DELETE

```
DELETE /trainings/{id}/
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"message": "Training deleted"
}
```

---

### GET (curricula d'une formation)

```
GET /trainings/{id}/curricula/
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"name": "example-text"
		}
	]
}
```

---

### GET (contenu d'une formation)

```
GET /trainings/{id}/content/
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"title": "example-text"
		}
	]
}
```

---

### GET (créneaux d'une formation)

```
GET /trainings/{id}/schedules/
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"starts_at": "2026-05-27 19:58:47",
			"ends_at": "2026-05-27 21:58:47"
		}
	]
}
```

---

# Backend UPCYCLE (`http://upcycle.localhost`)

> ⚠️ Pas de trailing slash sur ce backend.

## Object

### GET

```
GET /objects
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": "a1b2c3d4-0000-0000-0000-000000000000",
			"name": "example-text",
			"description": "example-text",
			"price": 10.5,
			"image_path": "example-text",
			"colomn_for_calc_the_score": "example-text",
			"quantity": 1,
			"score": 42,
			"buy_by": "example-text",
			"sell_by": "example-text",
			"created_at": "2026-05-27 19:58:47",
			"updated_at": "2026-05-27 19:59:32"
		}
	]
}
```

---

### POST

```
POST /objects
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

*(`name`, `price` et `quantity` sont obligatoires)*

```json
{
	"name": "example-text",
	"description": "example-text",
	"price": 10.5,
	"image_path": "example-text",
	"colomn_for_calc_the_score": "example-text",
	"quantity": 1,
	"buy_by": "example-text",
	"sell_by": "example-text"
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": "a1b2c3d4-0000-0000-0000-000000000000",
		"name": "example-text",
		"description": "example-text",
		"price": 10.5,
		"image_path": "example-text",
		"colomn_for_calc_the_score": "example-text",
		"quantity": 1,
		"score": 42,
		"buy_by": "example-text",
		"sell_by": "example-text",
		"created_at": "2026-05-27 19:58:47",
		"updated_at": "2026-05-27 19:59:32"
	}
}
```

---

### PUT

```
PUT /objects/{id}
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

*(`name`, `price` et `quantity` sont obligatoires ; pas de `buy_by` / `sell_by` en update)*

```json
{
	"name": "example-text",
	"description": "example-text",
	"price": 10.5,
	"image_path": "example-text",
	"colomn_for_calc_the_score": "example-text",
	"quantity": 1
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": "a1b2c3d4-0000-0000-0000-000000000000",
		"name": "example-text",
		"description": "example-text",
		"price": 10.5,
		"image_path": "example-text",
		"colomn_for_calc_the_score": "example-text",
		"quantity": 1,
		"score": 42,
		"buy_by": "example-text",
		"sell_by": "example-text",
		"created_at": "2026-05-27 19:58:47",
		"updated_at": "2026-05-27 19:59:32"
	}
}
```

---

### DELETE

```
DELETE /objects/{id}
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"message": "Object deleted"
}
```

---

### GET (score d'un objet)

```
GET /objects/{id}/score
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": {
		"score": 42
	}
}
```

---

### GET (méthodes de livraison d'un objet)

```
GET /objects/{id}/delivery-methods
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"name": "example-text"
		}
	]
}
```

---

### GET (projets d'un objet)

```
GET /objects/{id}/projects
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"name": "example-text"
		}
	]
}
```

---

### GET (utilisateurs d'un objet)

```
GET /objects/{id}/users
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": "a1b2c3d4-0000-0000-0000-000000000000",
			"username": "example-user"
		}
	]
}
```

---

## Project

### GET

```
GET /projects
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"name": "example-text",
			"description": "example-text",
			"image_path": "example-text",
			"user_id": "a1b2c3d4-0000-0000-0000-000000000000",
			"created_at": "2026-05-27 19:58:47",
			"updated_at": "2026-05-27 19:59:32"
		}
	]
}
```

---

### POST

```
POST /projects
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

*(Seul `name` est obligatoire)*

```json
{
	"name": "example-text",
	"description": "example-text",
	"image_path": "example-text"
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": 1,
		"name": "example-text",
		"description": "example-text",
		"image_path": "example-text",
		"user_id": "a1b2c3d4-0000-0000-0000-000000000000",
		"created_at": "2026-05-27 19:58:47",
		"updated_at": "2026-05-27 19:59:32"
	}
}
```

---

### PUT

```
PUT /projects/{id}
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Body

```json
{
	"name": "example-text",
	"description": "example-text",
	"image_path": "example-text"
}
```

#### Response

```json
{
	"success": true,
	"data": {
		"id": 1,
		"name": "example-text",
		"description": "example-text",
		"image_path": "example-text",
		"user_id": "a1b2c3d4-0000-0000-0000-000000000000",
		"created_at": "2026-05-27 19:58:47",
		"updated_at": "2026-05-27 19:59:32"
	}
}
```

---

### DELETE

```
DELETE /projects/{id}
```

#### Headers

```
Authorization: token
```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"message": "Project deleted"
}
```

---

### GET (objets d'un projet)

```
GET /projects/{id}/objects
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": "a1b2c3d4-0000-0000-0000-000000000000",
			"name": "example-text",
			"score": 42
		}
	]
}
```

---

### GET (étapes d'un projet)

```
GET /projects/{id}/steps
```

#### Headers

```

```

#### Query Parameters

*(Aucun)*

#### Response

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"name": "example-text"
		}
	]
}
```

---

# Modèles présents dans les types mais non câblés dans le backoffice

Ces modèles existent dans `src/types/` avec leurs DTOs, mais aucun module `src/api/` ne les utilise encore.

## DeliveryMethode (backend upcycle)

```ts
interface DeliveryMethode {
	id: number
	name: string
	created_at: string
	updated_at: string
}

interface CreateDeliveryMethodeRequest { name: string }
interface UpdateDeliveryMethodeRequest { name: string }
```

Routes attendues (non câblées) :

```
GET /delivery-methods
GET /delivery-methods/{id}
POST /delivery-methods          (Authorization: token)
PUT /delivery-methods/{id}      (Authorization: token)
DELETE /delivery-methods/{id}   (Authorization: token)
```

## Step (backend upcycle)

```ts
interface Step {
	id: number
	name: string
	description: string
	image_path: string
	user_id: string
	project_id: number
	created_at: string
	updated_at: string
}

interface CreateStepRequest {
	name: string
	description?: string
	image_path?: string
	project_id: number
}

interface UpdateStepRequest {
	name: string
	description?: string
	image_path?: string
}
```

## Liaisons Object ↔ Project / DeliveryMethode (backend upcycle)

DTOs présents dans les types, sans fonction API associée :

```ts
interface LinkDeliveryMethodeRequest { delivery_methode_id: number }
interface LinkObjectRequest { object_id: string }
interface LinkProjectRequest { project_id: number }
```

## Auth (backend auth)

Types présents (`src/types/auth-backend`), non câblés dans le backoffice :

```ts
interface LoginRequest {
	email: string
	password: string
}

interface RegisterRequest {
	email: string
	password: string
}

interface LoginResponse {
	bearer_token: string
}
```

Le token retourné est stocké dans le cookie `bearer_token`, ensuite envoyé sur chaque requête via `Authorization: token`.

---

# Ressources sans backend (données mockées)

Aucun endpoint n'existe sur les quatre backends pour ces ressources. Les données restent **mockées** côté frontend (les fonctions de `src/api/` rejettent volontairement pour que les composables retombent sur les données de démonstration). **Ne pas inventer d'endpoints.**

| Ressource        | Fichier API                   | Composable          |
|------------------|-------------------------------|---------------------|
| Dashboard (stats, actions en attente, activité) | `src/api/dashboard.ts` | `useDashboard` |
| Prestataires     | `src/api/prestataires.ts`     | `usePrestataires`   |
| Demandes de dépôt | `src/api/deposit-requests.ts` | `useDepositRequests` |
| Logs             | `src/api/logs.ts`             | `useLogs`           |
