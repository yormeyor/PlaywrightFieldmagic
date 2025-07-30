//Log in setup
//Not being used in the current test setup, but kept for reference
import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';

const TWO_CAPTCHA_API_KEY = 'YOUR_2CAPTCHA_API_KEY';

chromium
  .use(StealthPlugin())
  .use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: TWO_CAPTCHA_API_KEY,
      },
      visualFeedback: true, // shows visual tags on solved captchas
    })
 );

    (async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://staging.fieldmagic.co/#/account/login');
    // Fill in the login form and submit.
    await page.locator('id=username').fill('alegaspi@crmonline.com.au');
    await page.locator('id=password').fill('Password01');
    await page.pause();
    const result = await page.solveRecaptchas();
    console.log(`CAPTCHA solved: ${result.solved.length}, Errors: ${result.error ?? 'None'}`);
    await page.waitForTimeout(5000);
    await page.mouse.down();
    await page.mouse.up();
    await page.getByTitle('reCAPTCHA',{ exact: true }).click();
    await page.pause();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(5000); // Wait for the page to load after login
    //await page.pause(); // Pause to allow for manual interaction if needed

    await page.context().storageState({ path: 'auth.json' });
    //await browser.close();
})();