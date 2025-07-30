import { test, expect, Page} from '@playwright/test';
import { login } from './loginfieldmagic';

export async function accountselection(page:Page) {
    //Waiting for the page to load once log in is successful
    await login(page);
    await page.waitForURL('https://staging.fieldmagic.co/#/account/selection')
    //Check if the dashboard is loaded by verifying the title.
    await expect(page).toHaveTitle('Switch Account | Fieldmagic');

    //Open the account selection dropdown and select CRM Online Test Staging
    await page.getByRole('listbox').locator('div').first().click();
    await page.getByText('CRM Online Test Staging').click();
    await page.getByRole('button', { name: 'Go' }).click();

    await page.waitForURL('https://staging.fieldmagic.co/#/jobs?page=1');
};