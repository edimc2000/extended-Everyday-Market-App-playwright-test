import { test, expect } from '@playwright/test';
import { RegisterPage } from './POM/registerPOM';
import { SEEDED_EMAIL_ADDRESSES } from '../test-data/email-address';
// import { PROVINCE_NAMES } from '../test-data/canadian-provinces';
// import { PROVINCE_NAMES } from '../test-data/canadian-provinces';
import { PROVINCE_NAMES } from '../test-data/canadian-provinces';

let timeout = 5000;

test.describe('Name Field', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.waitForPageLoad();
  });

  test('TC-REG-001 Name field shows error when name is too short', async ({ page }) => {
    await registerPage.fillName('John');
    await expect.soft(registerPage.nameInput).toHaveValue('John');

    // this will be to trigger validation and error message to show up 
    await registerPage.emailInput.click()

    await page.waitForTimeout(200)

    await expect.soft(registerPage.nameError).toBeVisible();
    await expect.soft(registerPage.nameError).toHaveText('Input does not meet the minimum length requirement - 5 chars');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-002 Name field shows error when field is empty (required validation)', async ({ page }) => {
    // Leave name field empty and trigger validation
    await registerPage.fillName('');
    await registerPage.emailInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.nameError).toBeVisible();
    await expect.soft(registerPage.nameError).toHaveText('Name is required');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-003 Name field shows error with invalid characters (pattern validation)', async ({ page }) => {
    // Enter name with numbers and special characters (not letters and spaces only)
    await registerPage.fillName('John123@#$');
    await registerPage.emailInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.nameError).toBeVisible();
    await expect.soft(registerPage.nameError).toHaveText('Input should be letters and spaces only');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-004 Name field accepts valid name (positive test)', async ({ page }) => {
    // Enter valid name: at least 5 chars, letters and spaces only
    await registerPage.fillName('John Doe');
    await registerPage.emailInput.click();

    await page.waitForTimeout(200);

    // Verify the input value is accepted
    await expect.soft(registerPage.nameInput).toHaveValue('John Doe');

    // Verify no error message is shown
    await expect.soft(registerPage.nameError).not.toBeVisible();
    await page.waitForTimeout(timeout);

  });

});

test.describe('Email Field', () => {
  let registerPage: RegisterPage;


  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.waitForPageLoad();
  });

  test('TC-REG-001 Email field shows error when email is empty (required validation)', async ({ page }) => {
    // Fill name field first to meet validation requirements
    await registerPage.fillName('John Doe');

    // Leave email field empty and trigger validation
    await registerPage.fillEmail('');
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.emailError).toBeVisible();
    await expect.soft(registerPage.emailError).toHaveText('Email is required');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-002 Email field shows error with invalid email format', async ({ page }) => {
    // Fill name field first to meet validation requirements
    await registerPage.fillName('John Doe');

    // Enter invalid email format
    await registerPage.fillEmail('invalid-email');
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.emailError).toBeVisible();
    await expect.soft(registerPage.emailError).toHaveText('Invalid email format');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-003 Email field shows error when email already exists', async ({ page }) => {
    // Fill name field first to meet validation requirements
    await registerPage.fillName('John Doe');

    // Use a seeded email address that already exists
    const existingEmail = SEEDED_EMAIL_ADDRESSES[0].email;
    await registerPage.fillEmail(existingEmail);
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.emailError).toBeVisible();
    await expect.soft(registerPage.emailError).toHaveText('This email address is already registered');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-004 Email field accepts valid new email (positive test)', async ({ page }) => {
    // Fill name field first to meet validation requirements
    await registerPage.fillName('John Doe');

    // Enter a valid email that's not in the seeded list
    const validNewEmail = 'newuser@example.com';
    await registerPage.fillEmail(validNewEmail);
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    // Verify the input value is accepted
    await expect.soft(registerPage.emailInput).toHaveValue(validNewEmail);

    // Verify no error message is shown
    await expect.soft(registerPage.emailError).not.toBeVisible();

    await page.waitForTimeout(timeout);
  });

});

test.describe('Password Field', () => {
  let registerPage: RegisterPage;



  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.waitForPageLoad();
  });

  test('TC-REG-001 Password field shows error when password is empty (required validation)', async ({ page }) => {
    // Fill name and email fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');

    // Leave password field empty and trigger validation
    await registerPage.fillPassword('');
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.passwordError).toBeVisible();
    await expect.soft(registerPage.passwordError).toHaveText('Password is required');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-002 Password field shows error when password is too short (minlength validation)', async ({ page }) => {
    // Fill name and email fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');

    // Enter password with less than 6 characters
    await registerPage.fillPassword('12345');
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.passwordError).toBeVisible();
    await expect.soft(registerPage.passwordError).toHaveText('Password required minimum of 6 chars');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-003 Password field accepts valid password (positive test)', async ({ page }) => {
    // Fill name and email fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');

    // Enter a valid password with 6 or more characters
    const validPassword = 'password123';
    await registerPage.fillPassword(validPassword);
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    // Verify the input value is accepted
    await expect.soft(registerPage.passwordInput).toHaveValue(validPassword);

    // Verify no error message is shown
    await expect.soft(registerPage.passwordError).not.toBeVisible();

    await page.waitForTimeout(timeout);
  });
});

test.describe('Phone Field', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.waitForPageLoad();
  });

  test('TC-REG-001 Phone field shows error when phone is empty (required validation)', async ({ page }) => {
    // Fill name, email and password fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');

    // Leave phone field empty and trigger validation
    await registerPage.fillPhone('');
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.phoneError).toBeVisible();
    await expect.soft(registerPage.phoneError).toHaveText('Phone number is required');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-002 Phone field shows error with invalid phone number (pattern validation)', async ({ page }) => {
    // Fill name, email and password fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');

    // Enter invalid phone number (not 10 digits)
    await registerPage.fillPhone('123456789'); // 9 digits
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.phoneError).toBeVisible();
    await expect.soft(registerPage.phoneError).toHaveText('Phone number should a 10 digit phone number');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-003 Phone field accepts valid 10-digit phone number (positive test)', async ({ page }) => {
    // Fill name, email and password fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');

    // Enter a valid 10-digit phone number
    const validPhone = '1234567890';
    await registerPage.fillPhone(validPhone);
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    // Verify the input value is accepted
    await expect.soft(registerPage.phoneInput).toHaveValue(validPhone);

    // Verify no error message is shown
    await expect.soft(registerPage.phoneError).not.toBeVisible();

    await page.waitForTimeout(timeout);
  });
});

test.describe('Birthday Field', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.waitForPageLoad();
  });

  test('TC-REG-001 Birthday field shows error when birthday is empty (required validation)', async ({ page }) => {
    // Fill all other required fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');
    await registerPage.fillPhone('1234567890');

    // Leave birthday field empty and trigger validation
    await registerPage.fillBirthday('');
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.birthdayError).toBeVisible();
    await expect.soft(registerPage.birthdayError).toHaveText('Birthday is required');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-002 Birthday field shows error when user is under 18 (underAge validation)', async ({ page }) => {
    // Fill all other required fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');
    await registerPage.fillPhone('1234567890');

    // Enter a date that makes user under 18 (current year - 17 years)
    const currentYear = new Date().getFullYear();
    const underAgeBirthdate = `${currentYear - 17}-01-01`;
    await registerPage.fillBirthday(underAgeBirthdate);
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.birthdayError).toBeVisible();
    await expect.soft(registerPage.birthdayError).toHaveText('You must be at least 18 years old');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-003 Birthday field accepts valid birthdate for 18+ user (positive test)', async ({ page }) => {
    // Fill all other required fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');
    await registerPage.fillPhone('1234567890');

    // Enter a valid date that makes user 18+ (using 1990 to be safe)
    const validBirthdate = '1990-01-01';
    await registerPage.fillBirthday(validBirthdate);
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    // Verify the input value is accepted
    await expect.soft(registerPage.birthdayInput).toHaveValue(validBirthdate);

    // Verify no error message is shown
    await expect.soft(registerPage.birthdayError).not.toBeVisible();

    await page.waitForTimeout(timeout);
  });
});

test.describe('Address Field', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.waitForPageLoad();
  });

  test('TC-REG-001 Address field shows error when address is empty (required validation)', async ({ page }) => {
    // Fill all other required fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');
    await registerPage.fillPhone('1234567890');
    await registerPage.fillBirthday('1990-01-01');

    // Leave address field empty and trigger validation
    await registerPage.fillAddress('');
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.addressError).toBeVisible();
    await expect.soft(registerPage.addressError).toHaveText('Address is required');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-002 Address field shows error when address is too short (pattern validation)', async ({ page }) => {
    // Fill all other required fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');
    await registerPage.fillPhone('1234567890');
    await registerPage.fillBirthday('1990-01-01');

    // Enter address with less than 5 characters
    await registerPage.fillAddress('123'); // Only 3 characters
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.addressError).toBeVisible();
    await expect.soft(registerPage.addressError).toHaveText('Requires min of 5 chars (letters, numbers, spaces, # and - )');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-003 Address field shows error with invalid characters (pattern validation)', async ({ page }) => {
    // Fill all other required fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');
    await registerPage.fillPhone('1234567890');
    await registerPage.fillBirthday('1990-01-01');

    // Enter address with invalid characters (not letters, numbers, spaces, # and -)
    await registerPage.fillAddress('123 Main St @ Building'); // Contains @ which is invalid
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    await expect.soft(registerPage.addressError).toBeVisible();
    await expect.soft(registerPage.addressError).toHaveText('Requires min of 5 chars (letters, numbers, spaces, # and - )');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-004 Address field handles maximum length (100 characters edge case)', async ({ page }) => {
    // Fill all other required fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');
    await registerPage.fillPhone('1234567890');
    await registerPage.fillBirthday('1990-01-01');

    // Enter exactly 100 characters (the maximum allowed)
    const maxLengthAddress = '1234 Very Long Street Name That Goes On And On And On And Continues For more than One Hundred Characters 108';
    await registerPage.fillAddress(maxLengthAddress);
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    // Verify the input accepts exactly 100 characters - toBe for more strict comparison 
    const inputValue = await registerPage.addressInput.inputValue();
    expect.soft(inputValue).toBe(maxLengthAddress.slice(0, 100)); // assert the actual value
    expect.soft(inputValue.length).toBe(100); // assert the number of chars

    // Verify no error message is shown for valid max length
    await expect.soft(registerPage.addressError).not.toBeVisible();
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-005 Address field accepts valid address (positive test)', async ({ page }) => {
    // Fill all other required fields first to meet validation requirements
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');
    await registerPage.fillPhone('1234567890');
    await registerPage.fillBirthday('1990-01-01');

    // Enter a valid address with allowed characters
    const validAddress = '123 Main Street #456-B';
    await registerPage.fillAddress(validAddress);
    await registerPage.nameInput.click();

    await page.waitForTimeout(200);

    // Verify the input value is accepted
    await expect.soft(registerPage.addressInput).toHaveValue(validAddress);

    // Verify no error message is shown
    await expect.soft(registerPage.addressError).not.toBeVisible();

    await page.waitForTimeout(timeout);
  });
});

test.describe('Province Field', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.waitForPageLoad();
  });

  test.only('TC-REG-001 Province dropdown options match test data', async ({ page }) => {
    // Fill all other required fields first
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');
    await registerPage.fillPhone('1234567890');
    await registerPage.fillBirthday('1990-01-01');
    await registerPage.fillAddress('123 Main Street');
    
    // Click on the dropdown to open it
    await registerPage.provinceSelect.click();
    await page.waitForTimeout(200);
    
    // Get all option elements from the dropdown (excluding the empty placeholder)
    const options = await registerPage.provinceSelect.locator('option:not([value=""])').allTextContents();
    
    // Verify the dropdown options match the test data
    expect(options).toEqual(PROVINCE_NAMES);
    expect(options.length).toBe(PROVINCE_NAMES.length);
    
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-002 Province field shows error when no province is selected (required validation)', async ({ page }) => {
    // Fill all other required fields first
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');
    await registerPage.fillPhone('1234567890');
    await registerPage.fillBirthday('1990-01-01');
    await registerPage.fillAddress('123 Main Street');
    
    // Leave province unselected (it starts with empty value) and trigger validation
    await registerPage.provinceSelect.click();
    await registerPage.nameInput.click();
    
    await page.waitForTimeout(200);
    
    await expect.soft(registerPage.provinceError).toBeVisible();
    await expect.soft(registerPage.provinceError).toHaveText('Province is required');
    await page.waitForTimeout(timeout);
  });

  test('TC-REG-003 Province field accepts valid province selection (positive test)', async ({ page }) => {
    // Fill all other required fields first
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('newuser@example.com');
    await registerPage.fillPassword('password123');
    await registerPage.fillPhone('1234567890');
    await registerPage.fillBirthday('1990-01-01');
    await registerPage.fillAddress('123 Main Street');
    
    // Select a valid province from the test data
    const selectedProvince = PROVINCE_NAMES[0]; // Take first province (Newfoundland and Labrador)
    await registerPage.selectProvince(selectedProvince);
    await registerPage.nameInput.click();
    
    await page.waitForTimeout(200);
    
    // Verify the selected value
    const selectedValue = await registerPage.provinceSelect.inputValue();
    expect(selectedValue).toBe(selectedProvince);
    
    // Verify no error message is shown
    await expect.soft(registerPage.provinceError).not.toBeVisible();
    
    await page.waitForTimeout(timeout);
  });
});