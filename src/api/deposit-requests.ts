// NO BACKEND EXISTS for deposit requests. The data stays MOCKED in
// useDepositRequests (données de démonstration). The functions below reject /
// no-op on purpose so the composable's try/catch falls back to mock data.
// Do NOT invent endpoints here.

export type DepositStatus = 'en-attente' | 'validee' | 'fermee'

export interface DepositRequest {
  id: number
  objectName: string
  objectDescription: string
  category: string | null
  requesterName: string
  requesterEmail: string
  status: DepositStatus
  createdAt: string
}

export function fetchDepositRequests(): Promise<DepositRequest[]> {
  return Promise.reject(new Error('No backend endpoint for deposit requests — using mock data'))
}

export function updateDepositStatus(
  _id: number,
  _status: DepositStatus,
): Promise<DepositRequest | null> {
  // No backend: handled optimistically client-side in the composable.
  return Promise.resolve(null)
}
