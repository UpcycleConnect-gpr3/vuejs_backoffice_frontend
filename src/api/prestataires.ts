import { http } from '@/api/http'

// Prestataires : CRUD réel sur le backend UPCYCLE (pas de trailing slash).
export interface Prestataire {
  id: number
  name: string
  type: string
  email: string
  phone: string
  city: string
  status: string
  created_at?: string
  updated_at?: string
}

export type PrestatairePayload = {
  name: string
  type?: string
  email?: string
  phone?: string
  city?: string
  status?: string
}

export function fetchPrestataires(): Promise<Prestataire[]> {
  return http<Prestataire[]>('upcycle', '/prestataires')
}

export function createPrestataire(data: PrestatairePayload): Promise<{ id: number }> {
  return http<{ id: number }>('upcycle', '/prestataires', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updatePrestataire(id: number, data: PrestatairePayload): Promise<{ id: number }> {
  return http<{ id: number }>('upcycle', `/prestataires/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deletePrestataire(id: number): Promise<void> {
  return http<void>('upcycle', `/prestataires/${id}`, { method: 'DELETE' })
}
