const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export interface DashboardStats {
  usersCount: number
  prestatairesCount: number
  prestatairesDistribution: {
    labels: string[]
    values: number[]
  }
}

export interface PendingAction {
  id: number
  icon: string
  title: string
  description: string
  link: string
}

export interface ActivityLog {
  id: number
  adminName: string
  action: string
  createdAt: string
  avatarUrl?: string
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${BASE_URL}/api/dashboard/stats`)
  if (!res.ok) throw new Error('Failed to fetch dashboard stats')
  return res.json()
}

export async function fetchPendingActions(): Promise<PendingAction[]> {
  const res = await fetch(`${BASE_URL}/api/dashboard/pending-actions`)
  if (!res.ok) throw new Error('Failed to fetch pending actions')
  return res.json()
}

export async function fetchActivityLogs(): Promise<ActivityLog[]> {
  const res = await fetch(`${BASE_URL}/api/dashboard/activity-logs`)
  if (!res.ok) throw new Error('Failed to fetch activity logs')
  return res.json()
}
