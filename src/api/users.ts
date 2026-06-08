import { http } from '@/api/http'

// Users live on the FORUM backend (trailing slash required).
// The forum users API exposes GET / PUT / DELETE only — there is NO POST create endpoint,
// so user creation is not available from the backoffice.
export interface User {
  id: string
  username: string
  firstname: string
  lastname: string
  email: string
  created_at: string
  updated_at: string
}

// UpdateUserDTO accepts ONLY these fields — email is read-only on this endpoint.
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
