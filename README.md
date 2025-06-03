# taf_playwright_ts_js
Test automation framework with playwright on javascript/typescript
TAF structure :
tests/
├── api/
│   ├── auth.spec.ts
│   ├── products.spec.ts
│   └── orders.spec.ts
│
│── ui/
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
│
├── db/
│   └── db-checks.spec.ts
│
└── utils/
│   ├── api-helpers.ts
│   ├── apiClient.ts        <== API-client
│   ├── pageObjects/        <== Page Objects (UI)
│   ├── dbClient.ts         <== DB-client
│   ├── auth.ts             <== login/auth functions, tokens etc...
│   └── config.ts           <== get configuration functionality
│
├── playwright.config.ts
├── .env
├── package.json
└── README.md
