# Recipe Sharing Hub – E2E Test Suite

End-to-end test suite built with **Playwright** for the Recipe Sharing Hub web application.

---

## Project Overview

**Application under test:** Recipe Sharing Hub – a platform for sharing and discovering recipes  
**Testing type:** End-to-end automation (E2E)  
**Framework:** Playwright  
**Language:** JavaScript  
**Tests:** 8 passing

---

## What Is Tested

| Test Group | Test Case |
|------------|-----------|
| Authentication | Registration with valid data |
| Authentication | Login with valid credentials |
| Authentication | Logout from the application |
| Navigation | Navbar links for logged-in user |
| Navigation | Navbar links for guest user |
| CRUD | Create a new recipe |
| CRUD | Edit an existing recipe |
| CRUD | Delete a recipe |

---

## How to Run

**1. Install dependencies**
```bash
npm install
npx playwright install
```

**2. Start the app**
```bash
# Terminal 1
npm run server

# Terminal 2
npm start
```

**3. Run the tests**
```bash
npm test
```

---

## Technologies Used

- Playwright v1.59
- JavaScript (Node.js)
- Chromium browser
