import { http } from '@/api/http'

export interface Category {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface CategoryPayload {
  name: string
  description: string
}

export function fetchCategories(): Promise<Category[]> {
  return http<Category[]>('forum', '/categories/')
}

export function createCategory(data: CategoryPayload): Promise<Category> {
  return http<Category>('forum', '/categories/', { method: 'POST', body: JSON.stringify(data) })
}

export function updateCategory(id: number, data: Partial<CategoryPayload>): Promise<Category> {
  return http<Category>('forum', `/categories/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteCategory(id: number): Promise<void> {
  return http<void>('forum', `/categories/${id}/`, { method: 'DELETE' })
}
