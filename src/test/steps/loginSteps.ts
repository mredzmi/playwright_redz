import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";


let browser: Browser;
let page: Page;

Given('User navigates to the application',{timeout: 9000}, async function () {
     browser = await chromium.launch({ headless:false })
     page = await browser.newPage();
     await page.goto("https://bookcart.azurewebsites.net/");
  });

Given('User click on the login link', async function () {
    await page.locator("//span[text()='Login']").click();
  });

Given('User enter the username as {string}', async function (username) {
    await page.locator("input[formcontrolname='username']").type(username);

    });

Given('User enter the password as {string}', async function (password) {
    await page.locator("input[formcontrolname='password']").type(password);

    });

When('User click on the login button', async function () {
    await page.locator("button[color='primary']").click();
    });

Then('Login should be success', async function () {
const text = await page.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]").textContent();
console.log("Username: " + text) ;
    await browser.close();
    });

When('Login should fail', async function () {
  const failureMessages = page.locator("mat-error[role='alert']");
  await expect(failureMessages).toBeVisible();
  await browser.close();
    });  