export interface TrainingContent {
  id: number
  type: string
  name: string
  content: string
  created_at: string
  updated_at: string
}

export interface CreateTrainingContentRequest {
  type?: string
  name: string
  content?: string
}

export interface UpdateTrainingContentRequest {
  type?: string
  name: string
  content?: string
}
