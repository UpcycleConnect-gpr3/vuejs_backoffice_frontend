const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export interface Event {
  id: number
  title: string
  description: string
  location: string
  startDate: string
  endDate: string
  status: 'en-cours' | 'a-venir' | 'termine'
}

export type EventPayload = Omit<Event, 'id'>

export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(`${BASE_URL}/api/events`)
  if (!res.ok) throw new Error('Failed to fetch events')
  return res.json()
}

export async function createEvent(data: EventPayload): Promise<Event> {
  const res = await fetch(`${BASE_URL}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create event')
  return res.json()
}

export async function updateEvent(id: number, data: Partial<EventPayload>): Promise<Event> {
  const res = await fetch(`${BASE_URL}/api/events/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update event')
  return res.json()
}

export async function deleteEvent(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/events/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete event')
}
