// NO BACKEND EXISTS for dashboard stats / pending-actions / activity-logs.
// These endpoints are not implemented on any of the four backends, so the data
// stays MOCKED in useDashboard (données de démonstration). The functions below
// reject on purpose so the composable's try/catch falls back to the mock data.
// Do NOT invent endpoints here.

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

const NO_BACKEND = 'No backend endpoint for dashboard — using mock data'

export function fetchDashboardStats(): Promise<DashboardStats> {
  return Promise.reject(new Error(NO_BACKEND))
}

export function fetchPendingActions(): Promise<PendingAction[]> {
  return Promise.reject(new Error(NO_BACKEND))
}

export function fetchActivityLogs(): Promise<ActivityLog[]> {
  return Promise.reject(new Error(NO_BACKEND))
}
