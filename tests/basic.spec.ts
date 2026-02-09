import { test, expect } from '@playwright/test';
import { fashionBrands, getBrandById } from '../test-data/brand-interface';
import { CATEGORIES } from '../test-data/category';

const APP_URL = 'http://localhost:4200';
// const APP_URL = 'http://localhost:5173';

test.describe('Testing Based on Data', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

  test('TC-001 Page title, header, and URL are valid', async ({ page }) => {
    await expect(page).toHaveTitle('Baro');
    await expect(page.locator('.shop-logo')).toContainText('Baro');
    await expect(page).toHaveURL(new RegExp(`^${APP_URL}`));
  });

  test('TC-002 Click Men category and verify brands on page', async ({ page }) => {
    const menBrands = fashionBrands.filter(brand => brand.type.includes('men'));
    await page.locator('.category-title').filter({ hasText: /^Men$/ }).click();
     await page.waitForTimeout(500);
    
    for (const brand of menBrands) {
      const brandElement = page.locator('.brand-name').filter({hasText:brand.name});
      await expect(brandElement).toBeVisible();
    }
  });

  test('TC-003 Click Women category and verify brands on page', async ({ page }) => {
    const womenBrands = fashionBrands.filter(brand => brand.type.includes('women'));
    await page.locator('.category-title').filter({ hasText: /^Women$/ }).click();
    await page.waitForTimeout(500);
    
    for (const brand of womenBrands) {
      const brandElement = page.locator('.brand-name').filter({hasText:brand.name});
      await expect(brandElement).toBeVisible();
    }
  });

  test('TC-004 Click Kids category and verify brands on page', async ({ page }) => {
    const kidsBrands = fashionBrands.filter(brand => brand.type.includes('kids'));
    await page.locator('.category-title').filter({ hasText: /^Kids$/ }).click();
    await page.waitForTimeout(500);
    
    for (const brand of kidsBrands) {
      const brandElement = page.locator('.brand-name').filter({hasText:brand.name});
      await expect(brandElement).toBeVisible();
    }
  });

  test('TC-005 Click Sports category and verify brands on page', async ({ page }) => {
    const sportsBrands = fashionBrands.filter(brand => brand.type.includes('sports'));
    await page.locator('.category-title').filter({ hasText: /^Sports$/ }).click();
    await page.waitForTimeout(500);
    
    for (const brand of sportsBrands) {
      const brandElement = page.locator('.brand-name').filter({hasText:brand.name});
      await expect(brandElement).toBeVisible();
    }
  });

  test('TC-006 Click Sleepwear category and verify brands on page', async ({ page }) => {
    const sleepwearBrands = fashionBrands.filter(brand => brand.type.includes('sleepwear'));
    await page.locator('.category-title').filter({ hasText: /^Sleepwear$/ }).click();
    await page.waitForTimeout(500);
    
    for (const brand of sleepwearBrands) {
      const brandElement = page.locator('.brand-name').filter({hasText:brand.name});
      await expect(brandElement).toBeVisible();
    }
  });

  test('TC-007 Verify all categories are clickable', async ({ page }) => {
    for (const category of CATEGORIES) {
      await page.locator('.category-title').filter({ hasText: new RegExp(`^${category.name}$`) }).click();
      await page.waitForTimeout(300);
      await expect(page).toHaveURL(new RegExp(`^${APP_URL}`));
    }
  });

  test('TC-008 Verify Nike appears in Men, Women, and Sports categories', async ({ page }) => {
    const nikeBrandTypes = ['Men', 'Women', 'Sports'];
    
    for (const categoryName of nikeBrandTypes) {
      await page.locator('.category-title').filter({ hasText: new RegExp(`^${categoryName}$`) }).click();
      await page.waitForTimeout(500);
      const brandElement = page.locator('.brand-name').filter({hasText:'Nike'});
      await expect(brandElement).toBeVisible();
    }
  });

  test('TC-009 Verify Adidas appears in all its categories', async ({ page }) => {
    const adidas = getBrandById('2');
    const adidasTypes = adidas?.type.map(t => t.charAt(0).toUpperCase() + t.slice(1)) || [];
    
    for (const categoryName of adidasTypes) {
      await page.locator('.category-title').filter({ hasText: new RegExp(`^${categoryName}$`) }).click();
      await page.waitForTimeout(500);
      const brandElement = page.locator('.brand-name').filter({hasText:'Adidas'});
      await expect(brandElement).toBeVisible();
    }
  });
});
