import { FieldsContext, type TranslationFn } from './FieldsContext'

export interface FieldsProviderProps {
  t?: TranslationFn
  children: React.ReactNode
}

export function FieldsProvider({ t, children }: FieldsProviderProps) {
  return (
    <FieldsContext.Provider value={{ t }}>
      {children}
    </FieldsContext.Provider>
  )
}

FieldsProvider.displayName = 'FieldsProvider'
