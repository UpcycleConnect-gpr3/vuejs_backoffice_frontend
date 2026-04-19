export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  username: string
  firstname: string
  lastname: string
}

export interface LoginResponse {
  bearer_token: string
}
