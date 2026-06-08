// Typed fetch helper shared by every API module.
//
// Grounded backend rules (verified against backend source):
// - Four backends, base URLs in .env (VITE_AUTH_URL / VITE_FORUM_URL / VITE_TRAINING_URL / VITE_UPCYCLE_URL).
// - NO /api prefix. Routes live at the root.
// - Trailing slash (Go 1.22 {$} matcher):
//     auth / forum / training  -> EVERY path REQUIRES a trailing slash.
//     upcycle                  -> NO trailing slash.
// - Auth token: JWT stored in the `bearer_token` cookie (shared across *.localhost),
//   sent as `Authorization: <token>` (NO 'Bearer ' prefix).
// - Response envelope: success = { success: true, data: <T> } -> unwrapped to `.data`.
//   Error = { message, status, errors? }.

export type Backend = 'auth' | 'forum' | 'training' | 'upcycle'

const BASE_URLS: Record<Backend, string> = {
  auth: import.meta.env.VITE_AUTH_URL ?? 'http://auth.localhost',
  forum: import.meta.env.VITE_FORUM_URL ?? 'http://forum.localhost',
  training: import.meta.env.VITE_TRAINING_URL ?? 'http://training.localhost',
  upcycle: import.meta.env.VITE_UPCYCLE_URL ?? 'http://upcycle.localhost',
}

// auth / forum / training require a trailing slash, upcycle must NOT have one.
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

// Normalise the trailing slash on the path portion only, preserving the query string.
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
      // body is not JSON, keep the default message
    }
    throw new HttpError(message, res.status, errors)
  }

  if (res.status === 204) return undefined as T

  const text = await res.text()
  if (!text) return undefined as T

  const body = JSON.parse(text)
  // Unwrap the { success, data } envelope when present.
  if (body && typeof body === 'object' && 'success' in body && 'data' in body) {
    return body.data as T
  }
  return body as T
}
