import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly registerUrl: string;

    // Form elements
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly phoneInput: Locator;
    readonly birthdayInput: Locator;
    readonly addressInput: Locator;
    readonly provinceSelect: Locator;

    readonly termsCheckbox: Locator;
    readonly newsletterCheckbox: Locator;



    // Form validation and messages
    readonly nameError: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;
    readonly phoneError: Locator;
    readonly birthdayError: Locator;
    readonly addressError: Locator;
    readonly provinceError: Locator;



    readonly termsError: Locator;
    readonly generalErrorMessage: Locator;
    readonly successMessage: Locator;

    // Action buttons
    readonly registerButton: Locator;
    readonly loginLink: Locator;
    readonly backToHomeButton: Locator;

    // Page elements
    readonly pageTitle: Locator;
    readonly registerHeader: Locator;
    readonly registerForm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerUrl = 'http://localhost:4200/register';

        // Form input fields
        this.nameInput = page.getByTestId('name');
        this.nameError = page.locator('div.input-group> #name ~ .error')

        this.emailInput = page.getByTestId('email');
        this.emailError = page.locator('div.input-group> #email ~ .error')

        this.passwordInput = page.getByTestId('password');
        this.passwordError = page.locator('div.input-group> #password ~ .error');
  
        this.phoneInput = page.getByTestId('phone');
        this.phoneError = page.locator('div.input-group> #phone ~ .error');

        this.birthdayInput = page.getByTestId('bday');
        this.birthdayError = page.locator('div.input-group> #bday ~ .error');

        this.addressInput = page.getByTestId('address');
        this.addressError = page.locator('div.input-group> #address ~ .error');

        this.provinceSelect = page.getByTestId('province');
        this.provinceError = page.locator('div.input-group> #province ~ .error');

        this.confirmPasswordInput = page.getByTestId('confirmPassword');

        this.termsCheckbox = page.locator('input[name="terms"], input[id="terms"], #accept-terms');
        this.newsletterCheckbox = page.locator('input[name="newsletter"], input[id="newsletter"], #newsletter');

        // Action buttons
        this.registerButton = page.locator('button[type="submit"], .register-btn, #register-button, button:has-text("Register")');
        this.loginLink = page.locator('a[href*="login"], .login-link, :text("Login"), :text("Sign in")');
        this.backToHomeButton = page.locator('a[href="/"], a[href="/home"], .back-home, :text("Back to Home")');


        // Page elements
        this.pageTitle = page.locator('title, .page-title, h1:has-text("Register")');
        this.registerHeader = page.locator('h1, h2, .register-header, .register-title');
        this.registerForm = page.locator('form, .register-form, .registration-form');
    }

    // Navigation methods
    async goto() {
        await this.page.goto(this.registerUrl);
    }

    async goToLogin() {
        await this.loginLink.click();
    }

    async goToHome() {
        await this.backToHomeButton.click();
    }

    // Form filling methods
    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async fillConfirmPassword(confirmPassword: string) {
        await this.confirmPasswordInput.fill(confirmPassword);
    }

    async fillPhone(phone: string) {
        await this.phoneInput.fill(phone);
    }

    async fillBirthday(birthday: string) {
        await this.birthdayInput.fill(birthday);
    }

    async fillAddress(address: string) {
        await this.addressInput.fill(address);
    }

    async selectProvince(province: string) {
        await this.provinceSelect.selectOption(province);
    }

    async fillRegistrationForm(userData: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        phone?: string;
        acceptTerms?: boolean;
        newsletter?: boolean;
    }) {
        await this.fillName(userData.name);
        await this.fillEmail(userData.email);
        await this.fillPassword(userData.password);
        await this.fillConfirmPassword(userData.confirmPassword);

        if (userData.phone) {
            await this.fillPhone(userData.phone);
        }

        if (userData.acceptTerms) {
            await this.acceptTerms();
        }

        if (userData.newsletter) {
            await this.subscribeToNewsletter();
        }
    }

    // Checkbox interaction methods
    async acceptTerms() {
        await this.termsCheckbox.check();
    }

    async subscribeToNewsletter() {
        await this.newsletterCheckbox.check();
    }

    // Form submission
    async submitRegistration() {
        await this.registerButton.click();
    }

    async registerUser(userData: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        phone?: string;
        acceptTerms?: boolean;
        newsletter?: boolean;
    }) {
        await this.fillRegistrationForm(userData);
        await this.submitRegistration();
    }

    // Validation methods
    async waitForPageLoad() {
        await this.registerForm.waitFor();
    }
}
