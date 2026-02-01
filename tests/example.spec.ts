import { test, expect } from '@playwright/test';
import { fashionBrands, getBrandById } from '../test-data/brand-interface';
import { CATEGORIES } from '../test-data/category';

const APP_URL = 'http://localhost:4200';

test.describe('Testing Based on Data', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

  test('TC-001 Page title, header, and URL are valid', async ({ page }) => {
    await expect(page).toHaveTitle('Baro');
    await expect(page.locator('.shop-logo')).toContainText('Baro');
    await expect(page).toHaveURL(new RegExp(`^${APP_URL}`));
  });

  test('TC-002 Category Men/Women/Sports: Nike shows up', async () => {
    const nike = fashionBrands.find(brand => brand.name === 'Nike');
    expect(nike).toBeTruthy();
    expect(nike?.id).toBe('1');
    expect(nike?.type).toEqual(expect.arrayContaining(['men', 'women', 'sports']));
    expect(nike?.imageUrl).toBe('/assets/images/brands/nike.png');
  });

  test('TC-003 Category Men/Women/Kids/Sports: Adidas shows up', async () => {
    const adidas = getBrandById('2');
    expect(adidas?.name).toBe('Adidas');
    expect(adidas?.description).toBe('German athletic footwear and apparel');
  });

  test('TC-004 Category Men/Women: Birkenstock shows up', async () => {
    const birkenstock = fashionBrands.find(brand => brand.name === 'Birkenstock');
    expect(birkenstock?.type).toEqual(expect.arrayContaining(['men', 'women']));
  });

  test('TC-005 Category Men: New Balance shows up', async () => {
    const newBalance = fashionBrands.find(brand => brand.name === 'New Balance');
    expect(newBalance?.type).toEqual(['men']);
  });

  test('TC-006 Category Kids: brands include Vans', async () => {
    const kidsBrands = fashionBrands
      .filter(brand => brand.type.includes('kids'))
      .map(brand => brand.name);
    expect(kidsBrands).toContain('Vans');
  });

  test('TC-007 Category Men/Women: Converse shows up', async () => {
    const converse = fashionBrands.find(brand => brand.name === 'Converse');
    expect(converse?.imageUrl).toBe('/assets/images/brands/converse.png');
  });

  test('TC-008 Category Sports/Kids: Under Armour shows up', async () => {
    const underArmour = fashionBrands.find(brand => brand.name === 'Under Armour');
    expect(underArmour?.type).toEqual(expect.arrayContaining(['sports']));
  });

  test('TC-009 Category Sleepwear: Furla shows up', async () => {
    const furla = fashionBrands.find(brand => brand.name === 'Furla');
    expect(furla?.type).toEqual(['sleepwear']);
  });

  test('TC-010 Category Sleepwear: Prada shows up with details', async () => {
    const prada = fashionBrands.find(brand => brand.name === 'Prada');
    expect(prada?.longDescription.length).toBeGreaterThan(80);
    expect(prada?.imageUrl).toBe('/assets/images/brands/prada.png');
  });

  test('TC-011 Category Sleepwear: Kate Spade shows up with details', async () => {
    const kateSpade = fashionBrands.find(brand => brand.name === 'Kate Spade');
    expect(kateSpade?.description).toContain('fashion');
  });

  test('TC-012 Brands: all show up with id, name, and imageUrl', async () => {
    for (const brand of fashionBrands) {
      expect(brand.id).toBeTruthy();
      expect(brand.name).toBeTruthy();
      expect(brand.imageUrl).toContain('/assets/images/brands/');
    }
  });

  test('TC-013 Categories: 5 items in expected order', async () => {
    expect(CATEGORIES).toHaveLength(5);
    expect(CATEGORIES.map(category => category.name)).toEqual([
      'Men',
      'Women',
      'Kids',
      'Sports',
      'Sleepwear'
    ]);
  });

  test('TC-014 Category Men: has correct id and image', async () => {
    const men = CATEGORIES.find(category => category.name === 'Men');
    expect(men?.id).toBe(1);
    expect(men?.imageUrl).toBe('/assets/images/men.webp');
  });

  test('TC-015 Category Women: description is accurate', async () => {
    const women = CATEGORIES.find(category => category.name === 'Women');
    expect(women?.description).toBe("Women's apparel and accessories");
  });

  test('TC-016 Category Sports: long description content', async () => {
    const sports = CATEGORIES.find(category => category.name === 'Sports');
    expect(sports?.longDescription).toContain('fitness');
  });

  test('TC-017 Categories: each includes a non-empty long description', async () => {
    for (const category of CATEGORIES) {
      expect(category.longDescription.length).toBeGreaterThan(50);
    }
  });
});
