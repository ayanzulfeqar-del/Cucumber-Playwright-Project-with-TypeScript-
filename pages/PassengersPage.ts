import { Page, Locator, expect } from '@playwright/test';

type PaxType = 'Adult' | 'Child' | 'Infant';

export class PassengersPage {
  readonly page: Page;
  readonly paxBox: Locator;
  readonly doneButton: Locator;
  readonly plus: Record<PaxType, Locator>;
  readonly minus: Record<PaxType, Locator>;
  readonly count: Record<PaxType, Locator>;
  lastAlert = '';

  constructor(page: Page) {
    this.page = page;
    // ---------- Locators ----------
    this.paxBox     = page.locator('#divpaxinfo');
    this.doneButton = page.locator('#btnclosepaxoption');
    this.plus  = { Adult: page.locator('#hrefIncAdt'), Child: page.locator('#hrefIncChd'), Infant: page.locator('#hrefIncInf') };
    this.minus = { Adult: page.locator('#hrefDecAdt'), Child: page.locator('#hrefDecChd'), Infant: page.locator('#hrefDecInf') };
    this.count = { Adult: page.locator('#spanAudlt'), Child: page.locator('#spanChild'), Infant: page.locator('#spanInfant') };
  }

  // ---------- Actions ----------
  async open() {
    await this.paxBox.click();
    await expect(this.doneButton).toBeVisible();
  }

  async add(type: string, times: number) {
    for (let i = 0; i < times; i++) {
      await this.plus[type as PaxType].click();
    }
  }

  async remove(type: string, times: number) {
    for (let i = 0; i < times; i++) {
      // minus gets disabled at the lowest value, so force it and don't wait long
      await this.minus[type as PaxType].click({ force: true, timeout: 3000 });
    }
  }

  // Site shows a JS alert when you go above 9 people
  async tryToAddOneMore(type: string) {
    this.page.once('dialog', async (dialog) => {
      this.lastAlert = dialog.message();
      await dialog.accept();
    });
    // button gets disabled, a div sits on top of it, so force the click
    await this.plus[type as PaxType].click({ force: true, timeout: 3000 });
  }

  async verifyAlertContains(text: string) {
    await expect.poll(() => this.lastAlert).toContain(text);
  }

  async verifyCount(type: string, number: number) {
    await expect(this.count[type as PaxType]).toHaveText(String(number));
  }

  async verifyPlusDisabled(type: string) {
    await expect(this.plus[type as PaxType]).toHaveClass(/pax-disabled/);
  }

  async close() {
    await this.doneButton.click();
  }

  async verifySummary(text: string) {
    await expect(this.paxBox).toHaveText(text);
  }
}
