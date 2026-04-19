export interface Step {
  id: number
  name: string
  description: string
  image_path: string
  user_id: string
  project_id: number
  created_at: string
  updated_at: string
}

export interface CreateStepRequest {
  name: string
  description?: string
  image_path?: string
  project_id: number
}

export interface UpdateStepRequest {
  name: string
  description?: string
  image_path?: string
}
