import { createContext, useContext } from 'react'

export type TranslationFn = (key: string) => string

export interface FieldsContextValue {
  t?: TranslationFn
}

export const FieldsContext = createContext<FieldsContextValue>({})

export function useFieldsContext(): FieldsContextValue {
  return useContext(FieldsContext)
}
