// NO BACKEND EXISTS for activity logs. The data stays MOCKED in useLogs
// (données de démonstration). fetchLogs rejects on purpose so the composable's
// try/catch falls back to the mock data. Do NOT invent an endpoint here.

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

export function fetchLogs(): Promise<Log[]> {
  return Promise.reject(new Error('No backend endpoint for logs — using mock data'))
}
