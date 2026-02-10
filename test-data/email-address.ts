export interface EmailAddress {
  email: string;
}

export const SEEDED_EMAIL_ADDRESSES: EmailAddress[] = [
  { email: 'january@email.com' },
  { email: 'march@email.com' },
  { email: 'april@email.com' }
]

export function isSeededEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase()
  return SEEDED_EMAIL_ADDRESSES.some(entry => entry.email === normalized)
}
