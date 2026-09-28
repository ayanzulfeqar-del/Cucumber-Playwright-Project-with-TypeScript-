import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly countryInput: Locator;
  readonly countryOptions: Locator;
  readonly currencyDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    // ---------- Locators ----------
    this.countryInput     = page.locator('#autosuggest');
    this.countryOptions   = page.locator('li.ui-menu-item a');
    this.currencyDropdown = page.locator('#ctl00_mainContent_DropDownListCurrency');
  }

  // ---------- Actions ----------
  async goTo() {
    await this.page.goto('https://rahulshettyacademy.com/dropdownsPractise/', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveTitle(/QAClickJet/);
  }

  async typeCountry(text: string) {
    await this.countryInput.pressSequentially(text, { delay: 100 });
    await this.countryOptions.first().waitFor();
  }

  async verifySuggestions(expectedList: string[]) {
    await expect(this.countryOptions).toHaveText(expectedList);
  }

  // When only 1 suggestion comes, the list goes under the site logo and
  // mouse click does not work. So we pick it with arrow keys like a real user.
  async selectCountry(name: string) {
    const total = await this.countryOptions.count();
    for (let i = 0; i < total; i++) {
      await this.countryInput.press('ArrowDown');
      if ((await this.countryInput.inputValue()) === name) break;
    }
    await this.countryInput.press('Enter');
  }

  async verifyCountry(name: string) {
    await expect(this.countryInput).toHaveValue(name);
  }

  async verifyTabVisible(tabName: string) {
    await expect(this.page.getByRole('link', { name: tabName, exact: true }).first()).toBeVisible();
  }

  async verifyCurrencyOptions(list: string[]) {
    await expect(this.currencyDropdown.locator('option')).toHaveText(list);
  }

  async selectCurrency(currency: string) {
    await this.currencyDropdown.selectOption(currency);
  }

  async verifyCurrency(currency: string) {
    await expect(this.currencyDropdown).toHaveValue(currency);
  }
}
