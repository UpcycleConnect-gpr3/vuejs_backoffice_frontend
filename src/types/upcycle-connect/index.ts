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

export type { User, UpdateUserRequest } from './user'
export type {
  Object,
  CreateObjectRequest,
  UpdateObjectRequest,
  DeliveryMethodeSummary as ObjectDeliveryMethodeSummary,
  ProjectSummary as ObjectProjectSummary,
  UserSummary as ObjectUserSummary,
  LinkDeliveryMethodeRequest,
  LinkProjectRequest as ObjectLinkProjectRequest,
} from './object'
export type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  ObjectSummary as ProjectObjectSummary,
  StepSummary,
  LinkObjectRequest,
} from './project'
export type { Step, CreateStepRequest, UpdateStepRequest } from './step'
export type {
  DeliveryMethode,
  CreateDeliveryMethodeRequest,
  UpdateDeliveryMethodeRequest,
  ObjectSummary as DeliveryMethodeObjectSummary,
} from './delivery-methode'
