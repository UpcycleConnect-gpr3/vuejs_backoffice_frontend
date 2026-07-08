import { http } from '@/api/http'

export interface User {
  id: string
  username: string
  firstname: string
  lastname: string
  email: string
  created_at: string
  updated_at: string
}

export interface UserPayload {
  username: string
  firstname: string
  lastname: string
}

export function fetchUsers(): Promise<User[]> {
  return http<User[]>('forum', '/users/')
}

export function fetchUser(id: string): Promise<User> {
  return http<User>('forum', `/users/${id}/`)
}

export function updateUser(id: string, data: UserPayload): Promise<User> {
  return http<User>('forum', `/users/${id}/`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteUser(id: string): Promise<void> {
  return http<void>('forum', `/users/${id}/`, { method: 'DELETE' })
}
