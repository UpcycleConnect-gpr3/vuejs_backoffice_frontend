export interface Message {
  id: number
  content: string
  file_path: string | null
  created_at: string
  updated_at: string
}

export interface CreateMessageRequest {
  content: string
  file_path?: string
}

export interface UpdateMessageRequest {
  content: string
}

export interface UserSummary {
  id: string
  username: string
  firstname: string
  lastname: string
}

export interface LinkMessageUserRequest {
  user_id: string
}
