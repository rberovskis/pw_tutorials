import { test, expect } from '@playwright/test';

test('Browser Context Validation error login', async ({page}) =>
{
    const userNameElement = page.locator('#userEmail');
    const passwordElement = page.locator('#userPassword');
    const signInButtonElement = page.locator('[value="Login"]');
    const cardElements = page.locator('.card-body b');

    await page.goto("https://rahulshettyacademy.com/client/");
    await userNameElement.fill('email@mail.com');
    await passwordElement.type('P@ssword1234');    
    await signInButtonElement.click();    

    //This does not wait - need to wait in other ways
    console.log(await cardElements.allTextContents())

    await page.waitForLoadState('networkidle');

    //Now it should be ok
    console.log(await cardElements.allTextContents())

    await expect(cardElements.nth(2)).toContainText('iphone 13 pro')
});
