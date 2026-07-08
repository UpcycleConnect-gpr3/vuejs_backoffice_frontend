

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

  return Promise.resolve(null)
}
