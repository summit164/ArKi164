export function getEnv(name: string): string | undefined {
  return Deno.env.get(name)
}

export function getEnvOrThrow(name: string): string {
  const value = Deno.env.get(name)
  if (!value) throw new Error(`Missing required env var: ${name}`)
  return value
}

export function getBoolEnv(name: string, defaultValue = false): boolean {
  const raw = Deno.env.get(name)
  if (raw === undefined || raw === null || raw === '') return defaultValue
  return ['1', 'true', 'yes', 'on'].includes(raw.toLowerCase())
}

export function getIntEnv(name: string, defaultValue: number): number {
  const raw = Deno.env.get(name)
  if (!raw) return defaultValue
  const parsed = Number.parseInt(raw, 10)
  return Number.isFinite(parsed) ? parsed : defaultValue
}


