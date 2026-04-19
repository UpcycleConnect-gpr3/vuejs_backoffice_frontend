export interface Category {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface CreateCategoryRequest {
  name: string
  description?: string
}

export interface UpdateCategoryRequest {
  name: string
  description?: string
}

export interface TalkSummary {
  id: number
  title: string
  created_at: string
}
