const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

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

export async function fetchDepositRequests(): Promise<DepositRequest[]> {
  const res = await fetch(`${BASE_URL}/api/deposit-requests`)
  if (!res.ok) throw new Error('Failed to fetch deposit requests')
  return res.json()
}

export async function updateDepositStatus(id: number, status: DepositStatus): Promise<DepositRequest> {
  const res = await fetch(`${BASE_URL}/api/deposit-requests/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Failed to update deposit request status')
  return res.json()
}
