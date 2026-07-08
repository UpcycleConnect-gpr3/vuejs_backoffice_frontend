import { http } from '@/api/http'

// Trainings live on the TRAINING backend (trailing slash required).
export interface Training {
  id: number
  name: string
  type: string
  mode_of_delivery: string
  duration: string
  minimum_number_of_participants: number
  maximum_number_of_participants: number
  location: string
  status?: string
}

export interface TrainingPayload {
  name: string
  type?: string
  mode_of_delivery?: string
  duration?: string
  minimum_number_of_participants?: number
  maximum_number_of_participants?: number
  location?: string
}

export interface Curriculum {
  id: number
  name: string
}

export interface TrainingContent {
  id: number
  title: string
}

export interface Schedule {
  id: number
  starts_at: string
  ends_at: string
}

export function fetchTrainings(): Promise<Training[]> {
  return http<Training[]>('training', '/trainings/')
}

export function createTraining(data: TrainingPayload): Promise<Training> {
  return http<Training>('training', '/trainings/', { method: 'POST', body: JSON.stringify(data) })
}

export function updateTraining(id: number, data: Partial<TrainingPayload>): Promise<Training> {
  return http<Training>('training', `/trainings/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteTraining(id: number): Promise<void> {
  return http<void>('training', `/trainings/${id}/`, { method: 'DELETE' })
}

export function fetchTrainingCurricula(id: number): Promise<Curriculum[]> {
  return http<Curriculum[]>('training', `/trainings/${id}/curricula/`)
}

export function fetchTrainingContent(id: number): Promise<TrainingContent[]> {
  return http<TrainingContent[]>('training', `/trainings/${id}/content/`)
}

export function fetchTrainingSchedules(id: number): Promise<Schedule[]> {
  return http<Schedule[]>('training', `/trainings/${id}/schedules/`)
}

// Validation d'une formation par un responsable (role administrator requis cote backend).
export function validateTraining(id: number): Promise<{ id: number; status: string }> {
  return http<{ id: number; status: string }>('training', `/trainings/${id}/validate/`, {
    method: 'POST',
  })
}

export function rejectTraining(id: number): Promise<{ id: number; status: string }> {
  return http<{ id: number; status: string }>('training', `/trainings/${id}/reject/`, {
    method: 'POST',
  })
}
