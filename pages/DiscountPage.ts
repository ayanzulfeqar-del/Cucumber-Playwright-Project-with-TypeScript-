import { Page, Locator, expect } from '@playwright/test';

export class DiscountPage {
  readonly page: Page;
  readonly checkboxes: Record<string, Locator>;
  readonly allCheckboxes: Locator;

  constructor(page: Page) {
    this.page = page;
    // ---------- Locators ----------
    this.checkboxes = {
      'Family and Friends':  page.locator('#ctl00_mainContent_chk_friendsandfamily'),
      'Senior Citizen':      page.locator('#ctl00_mainContent_chk_SeniorCitizenDiscount'),
      'Indian Armed Forces': page.locator('#ctl00_mainContent_chk_IndArm'),
      'Student':             page.locator('#ctl00_mainContent_chk_StudentDiscount'),
      'Unaccompanied Minor': page.locator('#ctl00_mainContent_chk_Unmr'),
    };
    this.allCheckboxes = page.locator('input[id^="ctl00_mainContent_chk_"]');
  }

  // ---------- Actions ----------
  async verifyCount(n: number) {
    // there is one hidden voucher checkbox also, so count only visible ones
    await expect(this.allCheckboxes.filter({ visible: true })).toHaveCount(n);
  }

  async check(name: string) {
    await this.checkboxes[name].click();
    await expect(this.checkboxes[name]).toBeChecked();
  }

  async verifyChecked(name: string) {
    await expect(this.checkboxes[name]).toBeChecked();
  }

  async verifyHidden(name: string) {
    await expect(this.checkboxes[name]).toBeHidden();
  }

  async verifyNotChecked(name: string) {
    await expect(this.checkboxes[name]).not.toBeChecked();
  }
}
