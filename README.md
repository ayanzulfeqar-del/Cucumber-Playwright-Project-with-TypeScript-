# Cucumber + Playwright + TypeScript Project
QAClickJet Flight Booking (Rahul Shetty Academy practice site) – BDD tests with Page Object Model.

## Folder
```
pages/                       -> page objects (.ts): locators + actions, POManager
tests/features/FlightBooking.feature        -> 24 scenarios (from TEST_PLAN.md)
tests/features/step_definations/flightSteps.ts
tests/features/support/world.ts   -> custom World (typed this.page / this.poManager)
tests/features/support/hooks.ts   -> Before (Chrome) / BeforeStep / AfterStep (screenshot) / After
cucumber.js  tsconfig.json  TEST_PLAN.md
```

## Run
```
npm install
npm test                 # all 24 scenarios
npm run test:smoke       # only @smoke
npm run test:e2e         # only @e2e
npm run test:headed      # see the browser
npm run typecheck        # TypeScript errors check
npm run report           # open cucumber-report.html
```
TypeScript runs directly through ts-node, so there is no build step.
Screenshots of failed steps are saved in `screenshots/`.
