export interface Image {
  id: number
  path: string
  description: string
  created_by_user_id: string
  created_at: string
  updated_at: string
}

export interface CreateImageRequest {
  path: string
  description?: string
}

export interface UpdateImageRequest {
  path: string
  description?: string
}
