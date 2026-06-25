const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000';

let browser;
let context;
let page;

let user = {
    email: "",
    password: "123456",
    confirmPass: "123456",
};

let recipeName = "";

// Helper function to login a user
async function loginUser(page, email, password) {

    await page.goto(host);
    await page.click('text=Login');
    await page.waitForSelector('form');
    await page.locator('[name="email"]').fill(email);
    await page.locator('[name="password"]').fill(password);
    await page.click('[type="submit"]');
    await page.waitForURL(host + '/');
    await page.waitForSelector('nav >> text=Logout');
}


describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });


    describe("authentication", () => {

        test('Registration with a valid data', async () => {

            await page.goto(host);
            await page.click('text=Register');
            await page.waitForSelector('form'); // Wait for the registration form to appear

            let random = Math.floor(Math.random() * 10000); // Generate a random number for unique email
            user.email = `test${random}@example.com`; // Create a unique email address

            // Fill in the registration form
            await page.locator('[name="email"]').fill(user.email);
            await page.locator('[name="password"]').fill(user.password);
            await page.locator('[name="conf-pass"]').fill(user.confirmPass);
            await page.click('[type="submit"]'); // Submit the registration form

            await page.waitForURL(host + '/'); // Wait for the home page to load, indicating successful registration
            await expect(page.locator('nav >> text=Logout')).toBeVisible(); // Assert that the Logout button is visible
        })

        test('Login with a valid data', async () => {

            await loginUser(page, user.email, user.password); // Use the helper funcion to log in the registered user`s credentials

            await expect(page.locator('nav >> text=Logout')).toBeVisible(); // Assert that the Logout button is visible
            expect(page.url()).toBe(host + '/')

        });

        test('Logout from the application', async () => {

            await loginUser(page, user.email, user.password); // Use the helper funcion to log in the registered user`s credentials
            await page.locator('nav >> text=Logout').click(); // Click on the logout link
            await page.waitForURL(host + '/');
            await expect(page.locator('nav >> text=Login')).toBeVisible();
            expect(page.url()).toBe(host + '/');

        });

    });

    describe("navbar", () => {

        test('Navigation for Logged-in user', async () => {

            await loginUser(page, user.email, user.password);

            await expect(page.locator('nav >> text=Home')).toBeVisible();
            await expect(page.locator('nav >> text=Discover')).toBeVisible();
            await expect(page.locator('nav >> text=Search')).toBeVisible();
            await expect(page.locator('nav >> text=Create Recipe')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();

            await expect(page.locator('nav >> text=Login')).toBeHidden()
            await expect(page.locator('nav >> text=Register')).toBeHidden();


        });

        test('Navigation for guest user', async () => {

            await page.goto(host);
            await expect(page.locator('nav >> text=Home')).toBeVisible();
            await expect(page.locator('nav >> text=Discover')).toBeVisible();
            await expect(page.locator('nav >> text=Search')).toBeVisible();
            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=Register')).toBeVisible();

            await expect(page.locator('nav >> text=Create Recipe')).toBeHidden();
            await expect(page.locator('nav >> text=Logout')).toBeHidden();

        });
    });

    describe("CRUD", () => {

        beforeEach(async () => {
            await loginUser(page, user.email, user.password)
        })

        test('Create a recipe', async () => {

            await page.click('text=Create Recipe');
            await page.waitForSelector('form');

            let random = Math.floor(Math.random() * 1000); // Generate a random number to ensure unique recipe names for each test run
            recipeName = `newRecipe_${random}`; // Create a unique recipe name for creation

            await page.fill('#recipeName', recipeName); // Fill in the recipe name field
            await page.fill('#recipeImage', '/imagese/recipe.jpg'); // Fill in the image URL field
            await page.fill('#preparationTime', '30'); // Fill in the prep time field
            await page.fill('#sharedBy', 'Ani'); // Fill in the shared by field
            await page.fill('#cuisineType', 'BG'); // Fill in the cuisine field
            await page.fill('[name = "steps"]', 'Step 1; Step 2'); // Fill in the recipe steps field, we don't have an id for this field, so we use the name attribute instead

            await page.click('[type="submit"]'); // Click the submit button to create new recipe
            await page.waitForURL(host + '/discover'); // Wait for the dashboard page to load after the recipe creation

            await expect(page.locator('div.recipe h2', { hasText: recipeName })).toHaveCount(1); // Check if the newly created recipe is visible in the discover page

            expect(page.url()).toBe(host + '/discover'); // Verify that the URL is correct after recipe creation
        });

        test('Edit an recipe', async () => {

            await page.goto(host + '/search');
            await page.fill('[name="search"]', recipeName);
            await page.click('[type="submit"]')

            await page.locator('section.search-results ul li a', { hasText: recipeName }).click(); // Click on the recipe result

            await page.locator('a.edit-btn').click();
            await page.waitForSelector('form');

            recipeName = recipeName + '_Edited'; // Update the recipe name for editing
            await page.fill('#recipeName', recipeName); // Fill in the updated recipe name field
            await page.click('form [type="submit"]');
            await expect(page.locator('div.recipe h2', { hasText: recipeName })).toHaveCount(0);

        })

        test('Delete recipe', async () => {

            await page.goto(host + '/search');
            await page.fill('[name="search"]', recipeName);
            await page.click('[type="submit"]')

            await page.locator('section.search-results ul li a', { hasText: recipeName }).click(); // Click on the recipe result

            await page.click('text=Delete');
            await expect(page).toHaveURL(host + '/discover');

            await expect(page.locator('div.recipe h2', { hasText: recipeName })).toHaveCount(0);

        })

    });
});