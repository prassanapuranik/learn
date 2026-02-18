# Employee Management POC (Vue 3 + Vuex + Vue Router + Quasar + Playwright + Cypress)

This POC demonstrates one small Employee Management application with CRUD modules for:

- Employee
- Department
- Role
- Salary
- Leave

## 1) Prerequisites

- Node.js 18+
- npm 9+

## 2) Create project (if doing manually)

```bash
npm create vite@latest employee-management-poc -- --template vue
cd employee-management-poc
npm i vuex@4 vue-router@4 quasar @quasar/extras
npm i -D @quasar/vite-plugin @playwright/test cypress
```

## 3) Run app

```bash
npm install
npm run dev
```

Open: `http://127.0.0.1:5173`

## 4) Architecture

- `src/store` contains Vuex modules (`employees`, `departments`, `roles`, `salaries`, `leaves`).
- `src/router/index.js` defines routes for each entity page.
- `src/components/CrudPage.vue` is reusable CRUD UI.
- Data persistence uses `localStorage`.

## 5) Playwright setup and execution

Install browsers:

```bash
npx playwright install
```

Run test:

```bash
npm run test:playwright
```

Test file: `tests/playwright/crud.spec.js`

## 6) Cypress setup and execution

Open Cypress UI:

```bash
npm run test:cypress:open
```

Headless run:

```bash
npm run test:cypress
```

Test file: `cypress/e2e/navigation.cy.js`

## 7) CRUD scope in this POC

- **Employee CRUD**: name, email, department, role
- **Department CRUD**: name, description
- **Role CRUD**: name, level
- **Salary CRUD**: employee, amount, effectiveDate
- **Leave CRUD**: employee, leave type, from, to, status

## 8) Suggested next improvements

- Replace `localStorage` with backend APIs.
- Add validations (required fields, email format, date checks).
- Add auth/roles and audit logs.
- Split table forms with dedicated page components.
