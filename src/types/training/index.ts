export interface Training {
  id: number
  type: string
  name: string
  mode_of_delivery: string
  duration: string
  target_audience: string
  minimum_number_of_participants: number
  maximum_number_of_participants: number
  location: string
  trainer_profile: string
  created_at: string
  updated_at: string
}

export interface CreateTrainingRequest {
  type?: string
  name: string
  mode_of_delivery?: string
  duration?: string
  target_audience?: string
  minimum_number_of_participants?: number
  maximum_number_of_participants?: number
  location?: string
  trainer_profile?: string
}

export interface UpdateTrainingRequest {
  type?: string
  name: string
  mode_of_delivery?: string
  duration?: string
  target_audience?: string
  minimum_number_of_participants?: number
  maximum_number_of_participants?: number
  location?: string
  trainer_profile?: string
}

export interface CurriculaSummary {
  id: number
  name: string
  path: string
}

export interface TrainingContentSummary {
  id: number
  name: string
  type: string
}

export interface LinkCurriculumRequest {
  curriculum_id: number
}

export interface LinkTrainingContentRequest {
  content_id: number
}
