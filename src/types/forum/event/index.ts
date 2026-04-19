export interface Event {
  id: number
  title: string
  description: string | null
  start_at: string
  end_at: string
  created_at: string
  updated_at: string
}

export interface CreateEventRequest {
  title: string
  description?: string
  start_at: string
  end_at: string
}

export interface UpdateEventRequest {
  title: string
  description?: string
  start_at: string
  end_at: string
}

export interface UserSummary {
  id: string
  username: string
  firstname: string
  lastname: string
}

export interface LinkEventUserRequest {
  user_id: string
}
