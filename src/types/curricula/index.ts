export interface Curricula {
  id: number
  path: string
  name: string
  description: string
  created_by_user_id: string
  created_at: string
  updated_at: string
}

export interface CreateCurriculaRequest {
  path?: string
  name: string
  description?: string
}

export interface UpdateCurriculaRequest {
  path?: string
  name: string
  description?: string
}
