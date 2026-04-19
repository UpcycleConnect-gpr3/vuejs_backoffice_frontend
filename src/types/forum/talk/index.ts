export interface Talk {
  id: number
  title: string
  content: string
  category_id: number
  created_at: string
  updated_at: string
}

export interface CreateTalkRequest {
  title: string
  content: string
  category_id: number
}

export interface UpdateTalkRequest {
  title: string
  content: string
}

export interface MessageSummary {
  id: number
  content: string
  created_at: string
}

export interface UserSummary {
  id: string
  username: string
  firstname: string
  lastname: string
}

export interface LinkTalkMessageRequest {
  message_id: number
}

export interface LinkTalkUserRequest {
  user_id: string
}
