import { http } from '@/api/http'

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

export interface FinanceStats {
  revenue_cents: number
  commission_cents: number
  paid_transactions: number
  active_subscriptions: number
  objects_count: number
  projects_count: number
}

export function fetchFinanceStats(): Promise<FinanceStats> {
  return http<FinanceStats>('upcycle', '/stats/finance')
}
