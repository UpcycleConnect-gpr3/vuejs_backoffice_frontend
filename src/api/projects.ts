import { http } from '@/api/http'
import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectObjectSummary,
  StepSummary,
} from '@/types/upcycle-connect'

export type { Project, CreateProjectRequest, UpdateProjectRequest }

export function fetchProjects(): Promise<Project[]> {
  return http<Project[]>('upcycle', '/projects')
}

export function createProject(data: CreateProjectRequest): Promise<Project> {
  return http<Project>('upcycle', '/projects', { method: 'POST', body: JSON.stringify(data) })
}

export function updateProject(id: number, data: UpdateProjectRequest): Promise<Project> {
  return http<Project>('upcycle', `/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteProject(id: number): Promise<void> {
  return http<void>('upcycle', `/projects/${id}`, { method: 'DELETE' })
}

export function fetchProjectObjects(id: number): Promise<ProjectObjectSummary[]> {
  return http<ProjectObjectSummary[]>('upcycle', `/projects/${id}/objects`)
}

export function fetchProjectSteps(id: number): Promise<StepSummary[]> {
  return http<StepSummary[]>('upcycle', `/projects/${id}/steps`)
}
