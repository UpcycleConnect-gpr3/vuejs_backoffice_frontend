// NO BACKEND EXISTS for "prestataires" as a dedicated resource. The data stays
// MOCKED in usePrestataires (données de démonstration). The functions below
// reject / no-op on purpose so the composable's try/catch falls back to mock
// data. Do NOT invent endpoints here.

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

export type PrestatairePayload = Partial<Omit<Prestataire, 'id' | 'createdAt'>>

const NO_BACKEND = 'No backend endpoint for prestataires — using mock data'

export function fetchPrestataires(): Promise<Prestataire[]> {
  return Promise.reject(new Error(NO_BACKEND))
}

export function deletePrestataire(_id: number): Promise<void> {
  // No backend: handled optimistically client-side in the composable.
  return Promise.resolve()
}

export function updatePrestataire(
  _id: number,
  _data: PrestatairePayload,
): Promise<Prestataire | null> {
  // No backend: handled optimistically client-side in the composable.
  return Promise.resolve(null)
}
