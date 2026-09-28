import { Before, After, BeforeStep, AfterStep, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import * as fs from 'fs';
import { CustomWorld } from './world';
import { POManager } from '../../../pages/POManager';

setDefaultTimeout(60 * 1000);

// ---------- Before: runs before EVERY scenario ----------
// Opens Chrome and creates the page objects
Before(async function (this: CustomWorld, scenario) {
  this.browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',                              // HEADLESS=false -> see the browser
    channel: process.env.BROWSER_CHANNEL === 'bundled' ? undefined : 'chrome', // Google Chrome
    slowMo: Number(process.env.SLOWMO || 0),                                 // SLOWMO=500 -> slow motion
  });
  this.context = await this.browser.newContext({ viewport: { width: 1366, height: 900 } });
  this.page = await this.context.newPage();
  this.poManager = new POManager(this.page);
  console.log(`\n▶ Scenario started: ${scenario.pickle.name}`);
});

// ---------- BeforeStep: runs before EVERY step ----------
BeforeStep(async function (this: CustomWorld, step) {
  console.log(`   → ${step.pickleStep.text}`);
});

// ---------- AfterStep: runs after EVERY step ----------
// Takes a screenshot if the step failed
AfterStep(async function (this: CustomWorld, { result, pickle, pickleStep }) {
  if (result.status === Status.FAILED) {
    fs.mkdirSync('screenshots', { recursive: true });
    const name = `${pickle.name}-${pickleStep.text}`.replace(/[^a-z0-9]+/gi, '_').slice(0, 120);
    const shot = await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    this.attach(shot, 'image/png');
    console.log(`   ✖ Step failed - screenshot saved: screenshots/${name}.png`);
  }
});

// ---------- After: runs after EVERY scenario ----------
// Closes the browser
After(async function (this: CustomWorld) {
  await this.context?.close();
  await this.browser?.close();
});
