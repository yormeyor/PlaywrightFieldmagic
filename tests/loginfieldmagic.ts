//Log in setup
import { Page } from '@playwright/test';

export async function login(page: Page) {
    await page.goto('https://staging.fieldmagic.co/#/account/login');

    // Fill in the login form and submit.
    
    await page.locator('id=username').fill('alegaspi@crmonline.com.au');
    await page.locator('id=password').fill('Password01');

    //Added the below timeout and interaction to have like human-like response
    await page.waitForTimeout(2000);
    await page.mouse.down();
    await page.mouse.up();

    //Click the reCAPTCHA checkbox.
    await page.getByTitle('reCAPTCHA',{ exact: true }).click();

    //Added pause for manual challenge for reCAPTCHA. Cannot set up bypass at the moment due to funding issues (2Captcha API Key).
    await page.pause();

    // Click the login button.
    await page.getByRole('button', { name: 'Continue' }).click()

    await page.waitForURL('https://staging.fieldmagic.co/#/account/selection');
};