The tests are written under the open-source framework which is Playwright.

Source code is written in Typescript.

npm install
npm init playwright@latest

NOTES:
Pause is intentionally added in the login script when captcha textbox is checked to manually perform the challenge in reCaptcha. This is due to the availability of the API key to perform the captcha byPass.
Once done, you may resume the automation test by clicking the 'play' button in the playwright modal.
*The TS file is available for the byPass that will use the 2Captcha to solve the reCaptcha.
*For testing environment, disabling the captcha would be an option.

To run the test:
npx playwright test createjob.spec.ts --project chromium --headed
OR
npx playwright test createjob.spec.ts --project firefox --headed

