const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export interface Category {
  id: number
  name: string
  slug: string
  objectCount: number
  createdAt: string
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/api/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/categories/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete category')
}

export async function updateCategory(id: number, data: Partial<Category>): Promise<Category> {
  const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update category')
  return res.json()
}
