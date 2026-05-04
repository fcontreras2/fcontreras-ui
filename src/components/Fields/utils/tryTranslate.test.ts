import { tryTranslate } from './tryTranslate'

describe('tryTranslate', () => {
  it('returns fallback when t is undefined', () => {
    expect(tryTranslate(undefined, 'form.fields.name', 'Name')).toBe('Name')
  })

  it('returns translated value when t resolves the key', () => {
    const t = (key: string) => ({ 'form.fields.name': 'Full Name' }[key] ?? (() => { throw new Error() })())
    expect(tryTranslate(t, 'form.fields.name', 'Name')).toBe('Full Name')
  })

  it('returns fallback when t throws', () => {
    const t = () => { throw new Error('Missing translation') }
    expect(tryTranslate(t, 'form.fields.name', 'Name')).toBe('Name')
  })

  it('returns fallback when t returns null/undefined', () => {
    const t = () => null as unknown as string
    expect(tryTranslate(t, 'form.fields.name', 'Name')).toBe('Name')
  })
})
