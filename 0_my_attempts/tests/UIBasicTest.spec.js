import { test, expect } from '@playwright/test';

test('First test without page fixture', async ({ browser }) => {
    // Create browser context/metadata with all the information you need
    // Cookies, plugins, proxies, etc.
    // This create a browser instance
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
});

//test.only MVP
test('First test WITH page fixture', async ({ page }) => {
    await page.goto("https://www.google.com/");
    //get title
    await expect(page).toHaveTitle("Google");
});


test('Incorrect password for login page', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator('#username').type('rahulshettyacademy');
    await page.locator('#password').type('password');

    await page.locator('#signInBtn').click();
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')
});



test('Fix incorrect password for input field', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const userNameElement = page.locator('#username');
    const passwordElement = page.locator('#password');
    const signInButtonElement = page.locator('#signInBtn');
    const cardElements = page.locator('.card-body a')



    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await userNameElement.type('rahulshettyacademy');
    await passwordElement.type('password');
    await signInButtonElement.click();

    await userNameElement.fill('');
    await userNameElement.fill('rahulshettyacademy');
    await passwordElement.fill('');
    await passwordElement.fill('learning');
    await signInButtonElement.click();

    console.log(await cardElements.allTextContents())

    await expect(cardElements.nth(2)).toContainText('Nokia Edge')

});



test('Login page UI controls', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const selectElement = page.locator('select.form-control');
    const okButtonElement = page.locator('#okayBtn')
    const radioElement = page.locator('.customradio .radiotextsty').last();
    const termsElement = page.locator('#terms')
    const bannerElement = page.locator('[href*="documents-request"]')

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await selectElement.selectOption('consult')
    await radioElement.click()
    await okButtonElement.click()

    await termsElement.click();
    await termsElement.uncheck();

    await expect(radioElement).toBeChecked()
    expect(await termsElement.isChecked()).toBeFalsy()
    await expect(bannerElement).toHaveAttribute('class', 'blinkingText')

});



test('New Tabs', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const bannerElement = page.locator('[href*="documents-request"]')

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        bannerElement.click()
        ])

    await expect(await newPage.locator('p.im-para.red').last())
        .toContainText('Please email us at mentor@rahulshettyacademy.com with below template to receive response');

});