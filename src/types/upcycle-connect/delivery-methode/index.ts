export interface DeliveryMethode {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface CreateDeliveryMethodeRequest {
  name: string
}

export interface UpdateDeliveryMethodeRequest {
  name: string
}

export interface ObjectSummary {
  id: string
  name: string
  score: number
}
