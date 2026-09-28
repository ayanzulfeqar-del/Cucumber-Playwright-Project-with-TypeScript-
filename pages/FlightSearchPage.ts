import { Page, Locator, expect } from '@playwright/test';

type TripType = 'One Way' | 'Round Trip' | 'Multicity';

export class FlightSearchPage {
  readonly page: Page;
  readonly tripRadios: Record<TripType, Locator>;
  readonly multiCityPopupOk: Locator;
  readonly secondFromInput: Locator;
  readonly fromInput: Locator;
  readonly toInput: Locator;
  readonly fromList: Locator;
  readonly toList: Locator;
  readonly calendar: Locator;
  readonly firstMonth: Locator;
  readonly departDate: Locator;
  readonly returnDate: Locator;
  readonly returnDateBlock: Locator;
  readonly searchButton: Locator;
  lastAlert = '';

  constructor(page: Page) {
    this.page = page;
    // ---------- Locators ----------
    this.tripRadios = {
      'One Way':    page.locator('#ctl00_mainContent_rbtnl_Trip_0'),
      'Round Trip': page.locator('#ctl00_mainContent_rbtnl_Trip_1'),
      'Multicity':  page.locator('#ctl00_mainContent_rbtnl_Trip_2'),
    };
    this.multiCityPopupOk = page.locator('#MultiCityModelAlert');
    this.secondFromInput  = page.locator('#ctl00_mainContent_ddl_originStation2_CTXT');

    this.fromInput = page.locator('#ctl00_mainContent_ddl_originStation1_CTXT');
    this.toInput   = page.locator('#ctl00_mainContent_ddl_destinationStation1_CTXT');
    this.fromList  = page.locator('#glsctl00_mainContent_ddl_originStation1_CTNR');
    this.toList    = page.locator('#glsctl00_mainContent_ddl_destinationStation1_CTNR');

    this.calendar        = page.locator('#ui-datepicker-div');
    this.firstMonth      = page.locator('.ui-datepicker-group-first');
    this.departDate      = page.locator('#ctl00_mainContent_view_date1');
    this.returnDate      = page.locator('#ctl00_mainContent_view_date2');
    this.returnDateBlock = page.locator('#Div1');

    this.searchButton = page.locator('#ctl00_mainContent_btn_FindFlights');
  }

  // ---------- Actions ----------
  async selectTrip(type: string) {
    await this.tripRadios[type as TripType].check();
  }

  async verifyTripSelected(type: string) {
    await expect(this.tripRadios[type as TripType]).toBeChecked();
  }

  async verifyReturnDateEnabled(enabled: boolean) {
    await expect(this.returnDateBlock).toHaveCSS('opacity', enabled ? '1' : '0.5');
  }

  async acceptMultiCityPopup() {
    await this.multiCityPopupOk.click();
  }

  async verifySecondLegVisible() {
    await expect(this.secondFromInput).toBeVisible();
  }

  async selectFrom(code: string) {
    await this.fromInput.click();
    await this.fromList.locator(`a[value="${code}"]`).click();
  }

  async selectTo(code: string) {
    // TO list opens by itself after FROM is picked
    await this.toList.locator(`a[value="${code}"]`).click();
  }

  async verifyCities(from: string, to: string) {
    await expect(this.fromInput).toHaveValue(new RegExp(`\\(${from}\\)`));
    await expect(this.toInput).toHaveValue(new RegExp(`\\(${to}\\)`));
  }

  async verifyToListDoesNotHave(code: string) {
    await expect(this.toList.locator(`a[value="${code}"]`)).toBeHidden();
  }

  async verifyToListHas(code: string) {
    await expect(this.toList.locator(`a[value="${code}"]`)).toBeVisible();
  }

  async verifyCalendarOpen() {
    await expect(this.calendar).toBeVisible();
  }

  async pickDay(day: string) {
    await this.firstMonth.locator('a.ui-state-default').getByText(day, { exact: true }).click();
  }

  // In Round Trip the calendar opens again by itself after depart date,
  // so click the return date only if the calendar is closed
  async openReturnCalendar() {
    await this.page.waitForTimeout(500); // calendar open/close animation
    if (!(await this.calendar.isVisible())) {
      await this.returnDate.click({ force: true });
    }
    await expect(this.calendar).toBeVisible();
  }

  async verifyDates(depart: string, ret?: string) {
    await expect(this.departDate).toHaveValue(depart);
    if (ret) await expect(this.returnDate).toHaveValue(ret);
  }

  async verifyDayDisabled(day: string) {
    const cell = this.firstMonth.locator('td.ui-datepicker-unselectable span').filter({ hasText: new RegExp(`^${day}$`) });
    await expect(cell).toHaveCount(1);
  }

  async clickSearch() {
    // some rules (like Family and Friends) show a JS alert on search
    this.page.once('dialog', async (dialog) => {
      this.lastAlert = dialog.message();
      await dialog.accept();
    });
    await this.searchButton.click();
  }

  async verifySearchAlert(text: string) {
    await expect.poll(() => this.lastAlert).toContain(text);
  }

  async verifyUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text.replace(/[.?]/g, '\\$&')));
  }

  async verifyStillOnSearchPage() {
    await expect(this.page).toHaveURL('https://rahulshettyacademy.com/dropdownsPractise/');
    await expect(this.searchButton).toBeVisible();
  }
}
