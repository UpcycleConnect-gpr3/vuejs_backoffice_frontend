const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export interface Prestataire {
  id: number
  name: string
  siret: string
  contactName: string
  contactEmail: string
  contactPhone: string
  categorie: string | null
  status: 'actif' | 'inactif' | 'suspendu'
  createdAt: string
}

export async function fetchPrestataires(): Promise<Prestataire[]> {
  const res = await fetch(`${BASE_URL}/api/prestataires`)
  if (!res.ok) throw new Error('Failed to fetch prestataires')
  return res.json()
}

export async function deletePrestataire(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/prestataires/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete prestataire')
}

export async function updatePrestataire(id: number, data: Partial<Prestataire>): Promise<Prestataire> {
  const res = await fetch(`${BASE_URL}/api/prestataires/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update prestataire')
  return res.json()
}
