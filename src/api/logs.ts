import { http } from '@/api/http'

export type LogAction = 'create' | 'update' | 'delete' | 'login' | 'logout' | 'notify'
export type LogResource = 'user' | 'prestataire' | 'category' | 'event' | 'auth' | string

export interface Log {
  id: number
  adminName: string
  action: LogAction
  resource: LogResource
  resourceId: number | null
  details: string
  createdAt: string
}

interface ActivityLog {
  id: number
  user_id: string
  action: string
  entity: string
  entity_id: string
  detail: string
  created_at: string
}

export async function fetchLogs(): Promise<Log[]> {
  const rows = await http<ActivityLog[]>('upcycle', '/logs')
  return (rows || []).map((r) => ({
    id: r.id,
    adminName: r.user_id ? r.user_id.slice(0, 8) : 'système',
    action: r.action as LogAction,
    resource: r.entity,
    resourceId: r.entity_id ? Number(r.entity_id) || null : null,
    details: r.detail,
    createdAt: r.created_at,
  }))
}
