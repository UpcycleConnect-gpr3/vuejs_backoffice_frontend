import { http } from '@/api/http'

// Talks live on the FORUM backend (trailing slash required).
export interface Talk {
  id: number
  title: string
  type: string
  status: string
  description: string
  created_at: string
  updated_at: string
}

// Create accepts { title, type, status, description }; update accepts { title, status }.
export interface CreateTalkPayload {
  title: string
  type: string
  status: string
  description?: string
}

export interface UpdateTalkPayload {
  title: string
  status: string
}

export interface TalkMessage {
  id: number
  content: string
  user_id: string
  talk_id: number
  created_at: string
}

export interface TalkMember {
  id: string
  username: string
}

export function fetchTalks(): Promise<Talk[]> {
  return http<Talk[]>('forum', '/talks/')
}

export function createTalk(data: CreateTalkPayload): Promise<Talk> {
  return http<Talk>('forum', '/talks/', { method: 'POST', body: JSON.stringify(data) })
}

export function updateTalk(id: number, data: UpdateTalkPayload): Promise<Talk> {
  return http<Talk>('forum', `/talks/${id}/`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteTalk(id: number): Promise<void> {
  return http<void>('forum', `/talks/${id}/`, { method: 'DELETE' })
}

export function fetchTalkMessages(id: number): Promise<TalkMessage[]> {
  return http<TalkMessage[]>('forum', `/talks/${id}/messages/`)
}

export function fetchTalkMembers(id: number): Promise<TalkMember[]> {
  return http<TalkMember[]>('forum', `/talks/${id}/users/`)
}
