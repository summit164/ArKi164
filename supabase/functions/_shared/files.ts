export function sanitizeFilename(filename: string) {
  const cleaned = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
  return cleaned.slice(0, 180)
}


