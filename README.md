## 🎯 Full-Stack Test Framework (TypeScript + Playwright)

A unified testing framework to cover **API**, **UI**, and **Database** tests using **Playwright**, **TypeScript**, **Axios**, and **pg (PostgreSQL)**.

---

### 📁 Project Structure

```
tests/
├── api/                  # ✅ API tests using Playwright's request fixture
│   ├── auth.spec.ts      # 🔐 Auth endpoints
│   ├── products.spec.ts  # 🛒 Products
│   └── orders.spec.ts    # 📦 Orders
│
├── ui/                   # ✅ UI tests (Playwright browser automation)
│   ├── login.spec.ts     # 🔐 Login flow
│   ├── cart.spec.ts      # 🛒 Cart behavior
│   └── checkout.spec.ts  # 🧾 Checkout flow
│
├── db/                   # 🧠 DB tests (optional)
│   └── db-checks.spec.ts # 🔍 Post-query validation or DB state checks
│
├── utils/                # 🧰 Shared helpers and config
│   ├── api-helpers.ts    # 🌐 Auth/login/token flows
│   ├── apiClient.ts      # 🛠️ Axios-based client (used only where needed)
│   ├── dbClient.ts       # 🧠 DB client using `pg`
│   ├── config.ts         # ⚙️ Loads config from `.env`
│   ├── logger.ts         # 🪵 Optional custom logger
│   └── pageObjects/      # 🧱 Page Object Models (POMs) for UI
│       └── loginPage.ts  # 🔐 Login UI interaction logic
│
├── fixtures/             # ✅ Playwright custom fixtures (auth/session tokens)
│   ├── custom-fixtures.ts
│   └── globalSetup.ts    # 🧹 Global init logic
│
├── types/                # 📦 Shared types/interfaces
│   └── user.ts           # 👤 Example DTOs
│
├── .env                  # 🔐 ENV variables (BASE_URL, tokens, DB...)
├── playwright.config.ts  # ⚙️ Playwright configuration
├── package.json          # 📦 Dependencies and scripts
└── README.md             # 📘 This file
```

---

### 🚀 Running Tests

1. **Install dependencies**

```bash
npm install
```

2. **Set up .env file**

```bash
BASE_URL=http://localhost:3000
API_URL=http://localhost:8000/api
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=shop
```

3. **Run tests**

```bash
# All tests
npx playwright test

# Only UI tests
npx playwright test tests/ui

# Only API tests
npx playwright test tests/api

# Only DB checks
npx playwright test tests/db
```

---

### 🧪 Features

* 🔗 Unified **API testing** using [`request` fixture](https://playwright.dev/docs/api/class-testrequestcontext)
* 🧭 **UI testing** via Page Object Pattern
* 🧠 Optional **DB assertions** using `pg` library
* 🧰 Typed helpers and DTOs
* 🪵 Optional logging layer (custom `logger.ts`)
* 🧹 Custom fixtures for login and shared state

---

### 📦 Libraries Used

| Category | Library                                                       |
| -------- | ------------------------------------------------------------- |
| UI/API   | [Playwright](https://playwright.dev)                          |
| HTTP     | [Axios](https://axios-http.com) *(fallback only)*             |
| DB       | [pg](https://node-postgres.com)                               |
| ENV      | [dotenv](https://github.com/motdotla/dotenv)                  |
| Logs     | [debug](https://www.npmjs.com/package/debug) or custom logger |

---

### ✅ Code Conventions

| Topic            | Convention                                                                        |
| ---------------- | --------------------------------------------------------------------------------- |
| Test naming      | Use `describe/it` with clear BDD-style naming (e.g., `should login successfully`) |
| File naming      | Use `kebab-case` for test files, e.g., `checkout.spec.ts`                         |
| Page Objects     | Located in `utils/pageObjects/`, named `XxxPage.ts` with `camelCase` methods      |
| Test structure   | Keep each test focused: avoid mixing UI, API, DB in a single test                 |
| API abstraction  | Use Playwright's native `request` context unless special logic needed             |
| DB usage         | Minimal, only for verifying internal state (e.g., after placing an order)         |
| Shared logic     | Move reused logic to `utils/` and shared DTOs to `types/`                         |
| Test readability | Group related tests in meaningful `describe()` blocks                             |
| Comments         | Prefer `// Given`, `// When`, `// Then` to clarify test steps                     |
| POM logic        | Encapsulate UI interactions; avoid assertions inside Page Object methods          |
| Reports          | Use built-in Playwright HTML reports and CI-friendly outputs                      |

---

### 🧪 CI Integration (GitHub Actions)

**.github/workflows/tests.yml**

```yaml
name: Run Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - run: npm install
      - run: npx playwright install --with-deps
      - run: npx playwright test
```

---

### 📊 Reports

Playwright supports built-in HTML reporting:

```bash
npx playwright show-report
```

Or generate:

```bash
npx playwright test --reporter=html
```

You can also add:

```ts
// playwright.config.ts
reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]]
```

---

### 🧠 Notes

* Playwright supports **API testing natively**, no need for `axios` unless advanced custom client is required.
* Prefer using Playwright’s `page.request` or `request.newContext()` for all API test flows.
* Keep tests atomic and modular.
* DB access should be optional and minimal — use it only for verifying internal state.

---
