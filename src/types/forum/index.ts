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
export type { User, UpdateUserRequest, MessageSummary as UserMessageSummary } from './user'
export type {
  Message,
  CreateMessageRequest,
  UpdateMessageRequest,
  UserSummary as MessageUserSummary,
  LinkMessageUserRequest,
} from './message'
export type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  TalkSummary,
} from './category'
export type {
  Talk,
  CreateTalkRequest,
  UpdateTalkRequest,
  MessageSummary as TalkMessageSummary,
  UserSummary as TalkUserSummary,
  LinkTalkMessageRequest,
  LinkTalkUserRequest,
} from './talk'
export type {
  Event,
  CreateEventRequest,
  UpdateEventRequest,
  UserSummary as EventUserSummary,
  LinkEventUserRequest,
} from './event'
export type { Project, CreateProjectRequest, UpdateProjectRequest } from './project'
