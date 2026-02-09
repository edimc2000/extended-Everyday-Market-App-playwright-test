/** This file was copied from the App's angular implementation */

export interface IBrand {
  id: string;
  name: string;
  type: string[];
  description: string;
  longDescription: string;
  imageUrl: string; // Added image URL
  colors?: string[]; // Made optional since we're removing colors
  sizes?: string[]; // Made optional since we're removing sizes
}

export const fashionBrands: IBrand[] = [
  {
    id: '1',
    name: 'Nike',
    type: ['men', 'women', 'sports'],
    description: 'Global athletic wear and shoes',
    longDescription: 'Nike is a worldwide leader in athletic footwear, apparel, equipment, and accessories. Founded in 1964 as Blue Ribbon Sports, the company is known for its innovative designs, quality products, and iconic "Just Do It" slogan.',
    imageUrl: '/assets/images/brands/nike.png'
  },
  {
    id: '2',
    name: 'Adidas',
    type: ['men', 'women', 'kids', 'sports'],
    description: 'German athletic footwear and apparel',
    longDescription: 'Adidas is a German multinational corporation that designs and manufactures shoes, clothing, and accessories. Known for its three stripes logo, the company is a major player in the sportswear industry worldwide.',
    imageUrl: '/assets/images/brands/adidas.png'
  },
  {
    id: '3',
    name: 'Birkenstock',
    type: ['men'],
    description: 'German footwear known for contoured cork footbeds',
    longDescription: 'Birkenstock is a German shoe manufacturer known for its ergonomic sandals with contoured cork footbeds. Founded in 1774, the brand emphasizes foot health and comfort in all its designs.',
   imageUrl: '/assets/images/brands/birkenstock.png'
  },
  {
    id: '5',
    name: 'New Balance',
    type: ['men'],
    description: 'American sports footwear and apparel manufacturer',
    longDescription: 'New Balance is an American sports footwear and apparel manufacturer founded in 1906. Known for its focus on width sizing and domestic manufacturing, the brand emphasizes both performance and comfort.',
   imageUrl: '/assets/images/brands/new_balance.png'
  },
  {
    id: '6',
    name: 'Vans',
    type: ['men', 'women', 'kids'],
    description: 'American manufacturer of skateboarding shoes',
    longDescription: 'Vans is an American manufacturer of skateboarding shoes and related apparel, founded in 1966. Known for its "Off the Wall" slogan and iconic checkerboard pattern, the brand is deeply rooted in skate culture.',
   imageUrl: '/assets/images/brands/vans.png'
  },
  {
    id: '7',
    name: 'Converse',
    type: ['men', 'women'],
    description: 'American shoe manufacturer with iconic Chuck Taylor All Stars',
    longDescription: 'Converse is an American shoe company founded in 1908, best known for its Chuck Taylor All Stars. The brand has become an American icon, deeply associated with rock music, rebellion, and casual style.',
   imageUrl: '/assets/images/brands/converse.png'
  },

  {
    id: '9',
    name: 'Under Armour',
    type: ['sports', 'kids'],
    description: 'American sports equipment and apparel company',
    longDescription: 'Under Armour is an American sports equipment and apparel company founded in 1996. Known for its moisture-wicking fabric technology, the brand focuses on performance gear for athletes across various sports.',
    imageUrl: '/assets/images/brands/under_armour.png'
  },
  {
    id: '11',
    name: 'Furla',
    type: ['sleepwear'],
    description: 'Italian luxury accessories brand',
    longDescription: 'Furla is an Italian luxury accessories brand founded in 1927, known for its high-quality handbags, shoes, and accessories. The brand combines Italian craftsmanship with contemporary design.',
    imageUrl: '/assets/images/brands/furla.png'
  },
  {
    id: '12',
    name: 'Prada',
    type: ['sleepwear'],
    description: 'Italian luxury fashion house',
    longDescription: 'Prada is an Italian luxury fashion house founded in 1913, specializing in leather handbags, travel accessories, shoes, ready-to-wear, perfumes and other fashion accessories. Known for its minimalist aesthetic and innovative designs.',
   imageUrl: '/assets/images/brands/prada.png'
  },
  {
    id: '13',
    name: 'Kate Spade',
    type: ['sleepwear'],
    description: 'American fashion design house',
    longDescription: 'Kate Spade is an American fashion design house founded in 1993, known for its colorful, playful handbags, clothing, jewelry, shoes, and other accessories. The brand embodies feminine, sophisticated style with a sense of whimsy.',
   imageUrl: '/assets/images/brands/kate_spade.png'
  }
]



// Export helper functions if needed
export function getBrandById(id: string): IBrand | undefined {
  return fashionBrands.find(brand => brand.id === id)
}
