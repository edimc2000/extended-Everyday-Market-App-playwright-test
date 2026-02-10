export interface Country {
  code: string;
  name: string;
  dialCode: string;
}

export const COUNTRIES: Country[] = [
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'US', name: 'United States', dialCode: '+1' },
]

// Convenience export for just the names
export const COUNTRY_NAMES = COUNTRIES.map(c => c.name)

// Convenience export for just the codes
export const COUNTRY_CODES = COUNTRIES.map(c => c.code)
