export interface ContentSchedule {
  id: number
  title: string
  day_number: number
  duration: string
  description: string
  content: string
  is_practical: boolean
  resources_required: string
  order_position: number
  training_id: number
  created_at: string
  updated_at: string
}

export interface CreateContentScheduleRequest {
  title: string
  day_number?: number
  duration?: string
  description?: string
  content?: string
  is_practical?: boolean
  resources_required?: string
  order_position?: number
  training_id: number
}

export interface UpdateContentScheduleRequest {
  title: string
  day_number?: number
  duration?: string
  description?: string
  content?: string
  is_practical?: boolean
  resources_required?: string
  order_position?: number
}
