# TimeWise – Manual Testing & API Testing Project

Manual and API testing project for the **TimeWise** web application – a task and schedule management tool.

---

## Project Overview

**Application under test:** TimeWise – a task management web app  
**Testing type:** Manual functional testing + API testing (Postman)  
**Test cases:** 40+  
**Bugs found:** 9 (including 4 blocking/critical severity)

---

## What Was Tested

| Use Case | Description |
|----------|-------------|
| UC1 | Landing Page – navigation, buttons, links |
| UC2 | User Registration – field validation, boundary values |
| UC3 | User Login – authentication, remember me, forgot password |
| UC4 | Home Page and Navigation – navbar, sidebar, boards |
| UC5 | Profile Management – editing profile data |
| UC6 | Task Creation and Management – CRUD, status boards, boundary values |

---

## Testing Techniques Used

- **Boundary Value Analysis** – tested min/max character limits for all input fields
- **Equivalence Partitioning** – grouped valid and invalid inputs
- **Functional Testing** – verified each feature against the requirements specification
- **API Testing** – tested REST API endpoints via Postman with Bearer token authentication

---

## API Testing (Postman)

Tested the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api | Get all available methods |
| POST | /api/User/Register | Register a new user |
| POST | /api/User/Authorization | Authenticate and get access token |
| POST | /api/Task/Create | Create a new task (Bearer auth) |
| GET | /api/Task/AllTasks | Get all tasks (Bearer auth) |
| GET | /api/Task/AllTasks?where=todo | Filter tasks by status |
| GET | /api/Task/Count | Get task count |
| PUT | /api/Task/Edit/{id} | Edit an existing task |
| DELETE | /api/Task/Delete/{id} | Delete a task |

---

## Repository Contents

| File | Description |
|------|-------------|
| `test-cases-and-bug-tracker.xlsx` | All test cases and bug reports |
| `requirements-specification.docx` | Software requirements specification used as a test basis |
| `timewise-postman-collection.json` | Postman collection with all API requests |

---

## Bug Summary

9 bugs documented, including 4 blocking or critical severity issues.

| Severity | Count |
|----------|-------|
| Blocking | 2 |
| Critical | 2 |
| High | 1 |
| Medium | 3 |
| Low | 1 |

Notable bugs found:
- User cannot log in with username (blocking) – only email works
- Forgot Password functionality not working (blocking)
- Terms of Service hyperlink broken (critical)
- Profile changes cannot be saved (critical)

---

## Tools Used

- **Browser** – manual exploratory and scripted testing
- **Postman** – API testing and collection management
- **Excel** – test case and bug tracking
