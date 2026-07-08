import { http } from '@/api/http'

export interface Event {
  id: number
  title: string
  date: string
  status?: string
}

export type EventPayload = Omit<Event, 'id'>

export function fetchEvents(): Promise<Event[]> {
  return http<Event[]>('forum', '/events/')
}

export function createEvent(data: EventPayload): Promise<Event> {
  return http<Event>('forum', '/events/', { method: 'POST', body: JSON.stringify(data) })
}

export function updateEvent(id: number, data: Partial<EventPayload>): Promise<Event> {
  return http<Event>('forum', `/events/${id}/`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteEvent(id: number): Promise<void> {
  return http<void>('forum', `/events/${id}/`, { method: 'DELETE' })
}

export function validateEvent(id: number): Promise<{ id: number; status: string }> {
  return http<{ id: number; status: string }>('forum', `/events/${id}/validate/`, { method: 'POST' })
}

export function rejectEvent(id: number): Promise<{ id: number; status: string }> {
  return http<{ id: number; status: string }>('forum', `/events/${id}/reject/`, { method: 'POST' })
}
