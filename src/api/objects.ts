import { http } from '@/api/http'
import type {
  Object as UpcycleObject,
  CreateObjectRequest,
  UpdateObjectRequest,
  ObjectDeliveryMethodeSummary,
  ObjectProjectSummary,
  ObjectUserSummary,
} from '@/types/upcycle-connect'

// Objects live on the UPCYCLE backend (NO trailing slash).
export type { UpcycleObject, CreateObjectRequest, UpdateObjectRequest }

export function fetchObjects(): Promise<UpcycleObject[]> {
  return http<UpcycleObject[]>('upcycle', '/objects')
}

export function createObject(data: CreateObjectRequest): Promise<UpcycleObject> {
  return http<UpcycleObject>('upcycle', '/objects', { method: 'POST', body: JSON.stringify(data) })
}

export function updateObject(id: string, data: UpdateObjectRequest): Promise<UpcycleObject> {
  return http<UpcycleObject>('upcycle', `/objects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteObject(id: string): Promise<void> {
  return http<void>('upcycle', `/objects/${id}`, { method: 'DELETE' })
}

export function fetchObjectScore(id: string): Promise<{ score: number }> {
  return http<{ score: number }>('upcycle', `/objects/${id}/score`)
}

export function fetchObjectDeliveryMethods(id: string): Promise<ObjectDeliveryMethodeSummary[]> {
  return http<ObjectDeliveryMethodeSummary[]>('upcycle', `/objects/${id}/delivery-methods`)
}

export function fetchObjectProjects(id: string): Promise<ObjectProjectSummary[]> {
  return http<ObjectProjectSummary[]>('upcycle', `/objects/${id}/projects`)
}

export function fetchObjectUsers(id: string): Promise<ObjectUserSummary[]> {
  return http<ObjectUserSummary[]>('upcycle', `/objects/${id}/users`)
}
