const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'prestataire'
  status: 'actif' | 'inactif' | 'suspendu'
  createdAt: string
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/api/users`)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/users/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete user')
}

export async function updateUserStatus(id: number, status: User['status']): Promise<User> {
  const res = await fetch(`${BASE_URL}/api/users/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Failed to update user status')
  return res.json()
}
