// ── API response wrapper ───────────────────────────────────────────────────

export interface ValidationError {
  field: string
  message: string
}

export interface ApiSuccess<T = null> {
  success: true
  data?: T
  message?: string
}

export interface ApiError {
  status: string
  message: string
  errors?: ValidationError[]
}

export type ApiResponse<T = null> = ApiSuccess<T> | ApiError

// ── Entity types ───────────────────────────────────────────────────────────

export type { LoginRequest, RegisterRequest, LoginResponse } from './auth'
export type { User } from './user'
