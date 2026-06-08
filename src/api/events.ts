import { http } from '@/api/http'

// Events live on the FORUM backend (trailing slash required).
// The backend Event model is minimal: only { id, title, date } exist.
// There is no description, location, start/end date, or status field.
export interface Event {
  id: number
  title: string
  date: string
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
