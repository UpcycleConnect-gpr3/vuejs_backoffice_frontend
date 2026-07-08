

export type Backend = 'auth' | 'forum' | 'training' | 'upcycle'

const BASE_URLS: Record<Backend, string> = {
  auth: import.meta.env.VITE_AUTH_URL ?? 'http://auth.localhost',
  forum: import.meta.env.VITE_FORUM_URL ?? 'http://forum.localhost',
  training: import.meta.env.VITE_TRAINING_URL ?? 'http://training.localhost',
  upcycle: import.meta.env.VITE_UPCYCLE_URL ?? 'http://upcycle.localhost',
}

const NEEDS_TRAILING_SLASH: Record<Backend, boolean> = {
  auth: true,
  forum: true,
  training: true,
  upcycle: false,
}

export class HttpError extends Error {
  status: number
  errors?: { field: string; message: string }[]

  constructor(message: string, status: number, errors?: { field: string; message: string }[]) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.errors = errors
  }
}

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match && match[1] ? decodeURIComponent(match[1]) : null
}

function normalisePath(backend: Backend, path: string): string {
  const queryIndex = path.indexOf('?')
  let pathname = queryIndex === -1 ? path : path.slice(0, queryIndex)
  const query = queryIndex === -1 ? '' : path.slice(queryIndex)

  if (NEEDS_TRAILING_SLASH[backend]) {
    if (!pathname.endsWith('/')) pathname += '/'
  } else {
    if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.replace(/\/+$/, '')
  }

  return pathname + query
}

export async function http<T>(
  backend: Backend,
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const base = BASE_URLS[backend]
  const url = base + normalisePath(backend, path.startsWith('/') ? path : '/' + path)

  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }
  const token = readCookie('bearer_token')
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', token)
  }

  if (backend === 'forum' && !headers.has('X-Container-Name')) {
    headers.set('X-Container-Name', 'app')
  }

  const res = await fetch(url, { ...options, headers })

  if (!res.ok) {
    let message = `Erreur ${res.status}`
    let errors: { field: string; message: string }[] | undefined
    try {
      const body = await res.json()
      if (body && typeof body === 'object') {
        if (typeof body.message === 'string') message = body.message
        if (Array.isArray(body.errors)) errors = body.errors
      }
    } catch {

    }
    throw new HttpError(message, res.status, errors)
  }

  if (res.status === 204) return undefined as T

  const text = await res.text()
  if (!text) return undefined as T

  const body = JSON.parse(text)

  if (body && typeof body === 'object' && 'success' in body && 'data' in body) {
    return body.data as T
  }
  return body as T
}
