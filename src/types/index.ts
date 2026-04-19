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
export type { User, UpdateUserRequest } from './user'
export type {
  Training,
  CreateTrainingRequest,
  UpdateTrainingRequest,
  CurriculaSummary,
  TrainingContentSummary,
  LinkCurriculumRequest,
  LinkTrainingContentRequest,
} from './training'
export type { Curricula, CreateCurriculaRequest, UpdateCurriculaRequest } from './curricula'
export type {
  ContentSchedule,
  CreateContentScheduleRequest,
  UpdateContentScheduleRequest,
} from './content-schedule'
export type {
  TrainingContent,
  CreateTrainingContentRequest,
  UpdateTrainingContentRequest,
} from './training-content'
export type { Image, CreateImageRequest, UpdateImageRequest } from './image'
export type { Category, CreateCategoryRequest, UpdateCategoryRequest } from './category'
