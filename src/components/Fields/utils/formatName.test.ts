import { formatName } from './formatName'

describe('formatName', () => {
  it('converts camelCase to Title Case', () => {
    expect(formatName('firstName')).toBe('First Name')
  })

  it('converts snake_case to Title Case', () => {
    expect(formatName('first_name')).toBe('First Name')
  })

  it('converts kebab-case to Title Case', () => {
    expect(formatName('first-name')).toBe('First Name')
  })

  it('handles single word', () => {
    expect(formatName('email')).toBe('Email')
  })

  it('handles already Title Case', () => {
    expect(formatName('First Name')).toBe('First Name')
  })

  it('handles nested camelCase', () => {
    expect(formatName('billingAddress')).toBe('Billing Address')
  })
})
