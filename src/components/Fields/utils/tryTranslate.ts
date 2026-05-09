import type { TranslationFn } from "../FieldsContext";

export function tryTranslate(
  t: TranslationFn | undefined,
  key: string,
  fallback: string,
): string {
  if (!t) return fallback;
  try {
    const result = t(key);
    if (!result || result === key) return fallback;
    return result;
  } catch {
    return fallback;
  }
}
