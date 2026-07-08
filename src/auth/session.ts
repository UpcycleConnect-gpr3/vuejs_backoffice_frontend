

const AUTH_REDIRECT_URL = import.meta.env.VITE_AUTH_REDIRECT_URL || 'http://localhost:4284'

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match && match[1] ? decodeURIComponent(match[1]) : null
}

interface Claims {
  role?: string
  exp?: number
  userId?: string
}

function decodeClaims(token: string): Claims {
  try {
    const payload = token.split('.')[1]
    if (!payload) return {}
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json) as Claims
  } catch {
    return {}
  }
}

export function currentClaims(): Claims {
  const token = readCookie('bearer_token')
  if (!token) return {}
  const claims = decodeClaims(token)

  if (claims.exp && claims.exp * 1000 < Date.now()) return {}
  return claims
}

export function isAdmin(): boolean {
  return currentClaims().role === 'administrator'
}

export function redirectToLogin(): void {
  window.location.href = `${AUTH_REDIRECT_URL}/auth/login`
}
