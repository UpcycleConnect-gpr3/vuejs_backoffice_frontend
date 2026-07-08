

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
