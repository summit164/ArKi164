import { corsHeaders } from './cors.ts'

export function jsonResponse(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers)
  headers.set('Content-Type', 'application/json; charset=utf-8')
  Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v))

  return new Response(JSON.stringify(body), { ...init, headers })
}

export function ok(body: unknown = { ok: true }) {
  return jsonResponse(body, { status: 200 })
}

export function noContent() {
  const headers = new Headers(corsHeaders)
  return new Response(null, { status: 204, headers })
}

export function badRequest(message: string, details?: unknown) {
  return jsonResponse({ error: message, details }, { status: 400 })
}

export function unauthorized(message = 'Unauthorized') {
  return jsonResponse({ error: message }, { status: 401 })
}

export function forbidden(message = 'Forbidden') {
  return jsonResponse({ error: message }, { status: 403 })
}

export function serverError(message = 'Server error', details?: unknown) {
  return jsonResponse({ error: message, details }, { status: 500 })
}


