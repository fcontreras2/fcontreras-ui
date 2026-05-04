import type { TranslationFn } from '../FieldsContext'

export function tryTranslate(t: TranslationFn | undefined, key: string, fallback: string): string {
  if (!t) return fallback
  try {
    const result = t(key)
    return result ?? fallback
  } catch {
    return fallback
  }
}
