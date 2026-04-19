export interface Category {
  id: number
  name: string
  slug: string
  description: string
  created_by_user_id: string
  created_at: string
  updated_at: string
}

export interface CreateCategoryRequest {
  name: string
  slug: string
  description?: string
}

export interface UpdateCategoryRequest {
  name: string
  slug: string
  description?: string
}
