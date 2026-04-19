export interface Object {
  id: string
  name: string
  description: string
  price: number
  image_path: string
  colomn_for_calc_the_score: string
  quantity: number
  score: number
  buy_by: string
  sell_by: string
  created_at: string
  updated_at: string
}

export interface CreateObjectRequest {
  name: string
  description?: string
  price: number
  image_path?: string
  colomn_for_calc_the_score?: string
  quantity: number
  buy_by?: string
  sell_by?: string
}

export interface UpdateObjectRequest {
  name: string
  description?: string
  price: number
  image_path?: string
  colomn_for_calc_the_score?: string
  quantity: number
}

export interface DeliveryMethodeSummary {
  id: number
  name: string
}

export interface ProjectSummary {
  id: number
  name: string
}

export interface UserSummary {
  id: string
  username: string
}

export interface LinkDeliveryMethodeRequest {
  delivery_methode_id: number
}

export interface LinkProjectRequest {
  project_id: number
}
