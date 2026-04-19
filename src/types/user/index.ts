export interface User {
  id: string
  firstname: string
  lastname: string
  username: string
  email: string
  created_at: string
  updated_at: string
}

export interface UpdateUserRequest {
  firstname?: string
  lastname?: string
  username?: string
}
