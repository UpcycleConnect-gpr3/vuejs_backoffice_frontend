export interface Project {
  id: number
  name: string
  description: string
  image_path: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface CreateProjectRequest {
  name: string
  description?: string
  image_path?: string
}

export interface UpdateProjectRequest {
  name: string
  description?: string
  image_path?: string
}

export interface ObjectSummary {
  id: string
  name: string
  score: number
}

export interface StepSummary {
  id: number
  name: string
}

export interface LinkObjectRequest {
  object_id: string
}
