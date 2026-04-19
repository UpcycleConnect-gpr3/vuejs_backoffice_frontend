const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export type LogAction = 'create' | 'update' | 'delete' | 'login' | 'logout'
export type LogResource = 'user' | 'prestataire' | 'category' | 'event' | 'auth'

export interface Log {
  id: number
  adminName: string
  action: LogAction
  resource: LogResource
  resourceId: number | null
  details: string
  createdAt: string
}

export async function fetchLogs(): Promise<Log[]> {
  const res = await fetch(`${BASE_URL}/api/logs`)
  if (!res.ok) throw new Error('Failed to fetch logs')
  return res.json()
}
