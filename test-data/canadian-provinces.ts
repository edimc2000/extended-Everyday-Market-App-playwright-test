//AI assisted file 

export interface Province {
  code: string;
  name: string;
  region: 'Atlantic' | 'Central' | 'Prairies' | 'Pacific' | 'Northern';
}

export const CANADIAN_PROVINCES_TERRITORIES: Province[] = [
  // Atlantic Provinces
  { code: 'NL', name: 'Newfoundland and Labrador', region: 'Atlantic' },
  { code: 'PE', name: 'Prince Edward Island', region: 'Atlantic' },
  { code: 'NS', name: 'Nova Scotia', region: 'Atlantic' },
  { code: 'NB', name: 'New Brunswick', region: 'Atlantic' },
  
  // Central
  { code: 'QC', name: 'Quebec', region: 'Central' },
  { code: 'ON', name: 'Ontario', region: 'Central' },
  
  // Prairies
  { code: 'MB', name: 'Manitoba', region: 'Prairies' },
  { code: 'SK', name: 'Saskatchewan', region: 'Prairies' },
  { code: 'AB', name: 'Alberta', region: 'Prairies' },
  
  // Pacific
  { code: 'BC', name: 'British Columbia', region: 'Pacific' },
  
  // Northern Territories
  { code: 'YT', name: 'Yukon', region: 'Northern' },
  { code: 'NT', name: 'Northwest Territories', region: 'Northern' },
  { code: 'NU', name: 'Nunavut', region: 'Northern' },
]

// Convenience export for just the names
export const PROVINCE_NAMES = CANADIAN_PROVINCES_TERRITORIES.map(p => p.name)

// Convenience export for just the codes
export const PROVINCE_CODES = CANADIAN_PROVINCES_TERRITORIES.map(p => p.code)
