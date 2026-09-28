import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

// ---------------- Page ----------------
Given('the user is on the QAClickJet flight booking page', async function (this: CustomWorld) {
  await this.poManager.getHomePage().goTo();
});

// ---------------- Country ----------------
When('the user types {string} in the country box', async function (this: CustomWorld, text: string) {
  await this.poManager.getHomePage().typeCountry(text);
});

Then('the suggestions shown are {string}', async function (this: CustomWorld, list: string) {
  await this.poManager.getHomePage().verifySuggestions(list.split(','));
});

When('the user selects {string} from the suggestions', async function (this: CustomWorld, country: string) {
  await this.poManager.getHomePage().selectCountry(country);
});

Then('the country box shows {string}', async function (this: CustomWorld, country: string) {
  await this.poManager.getHomePage().verifyCountry(country);
});

// ---------------- Trip type ----------------
When('the user selects trip type {string}', async function (this: CustomWorld, type: string) {
  await this.poManager.getFlightSearchPage().selectTrip(type);
});

Then('trip type {string} is selected', async function (this: CustomWorld, type: string) {
  await this.poManager.getFlightSearchPage().verifyTripSelected(type);
});

Then('the return date is {string}', async function (this: CustomWorld, state: string) {
  await this.poManager.getFlightSearchPage().verifyReturnDateEnabled(state === 'enabled');
});

When('the user clicks OK on the multicity popup', async function (this: CustomWorld) {
  await this.poManager.getFlightSearchPage().acceptMultiCityPopup();
});

Then('the second flight row is visible', async function (this: CustomWorld) {
  await this.poManager.getFlightSearchPage().verifySecondLegVisible();
});

// ---------------- From / To ----------------
When('the user selects from city {string} and to city {string}', async function (this: CustomWorld, from: string, to: string) {
  await this.poManager.getFlightSearchPage().selectFrom(from);
  await this.poManager.getFlightSearchPage().selectTo(to);
});

When('the user selects from city {string}', async function (this: CustomWorld, from: string) {
  await this.poManager.getFlightSearchPage().selectFrom(from);
});

Then('the cities shown are {string} to {string}', async function (this: CustomWorld, from: string, to: string) {
  await this.poManager.getFlightSearchPage().verifyCities(from, to);
});

Then('{string} is not in the TO list', async function (this: CustomWorld, code: string) {
  await this.poManager.getFlightSearchPage().verifyToListDoesNotHave(code);
});

Then('{string} is in the TO list', async function (this: CustomWorld, code: string) {
  await this.poManager.getFlightSearchPage().verifyToListHas(code);
});

// ---------------- Calendar ----------------
Then('the calendar opens by itself', async function (this: CustomWorld) {
  await this.poManager.getFlightSearchPage().verifyCalendarOpen();
});

When('the user picks day {string} in the calendar', async function (this: CustomWorld, day: string) {
  await this.poManager.getFlightSearchPage().pickDay(day);
});

When('the user opens the return date calendar', async function (this: CustomWorld) {
  await this.poManager.getFlightSearchPage().openReturnCalendar();
});

Then('day {string} is disabled in the calendar', async function (this: CustomWorld, day: string) {
  await this.poManager.getFlightSearchPage().verifyDayDisabled(day);
});

Then('the depart date is {string}', async function (this: CustomWorld, depart: string) {
  await this.poManager.getFlightSearchPage().verifyDates(depart);
});

Then('the depart date is {string} and return date is {string}', async function (this: CustomWorld, depart: string, ret: string) {
  await this.poManager.getFlightSearchPage().verifyDates(depart, ret);
});

// ---------------- Search ----------------
When('the user clicks on Search', async function (this: CustomWorld) {
  await this.poManager.getFlightSearchPage().clickSearch();
});

Then('the page url contains {string}', async function (this: CustomWorld, text: string) {
  await this.poManager.getFlightSearchPage().verifyUrlContains(text);
});

Then('the user is still on the search page', async function (this: CustomWorld) {
  await this.poManager.getFlightSearchPage().verifyStillOnSearchPage();
});

Then('the search alert says {string}', async function (this: CustomWorld, text: string) {
  await this.poManager.getFlightSearchPage().verifySearchAlert(text);
});

// ---------------- Passengers ----------------
When('the user opens the passengers box', async function (this: CustomWorld) {
  await this.poManager.getPassengersPage().open();
});

When('the user adds {int} {string}', async function (this: CustomWorld, times: number, type: string) {
  await this.poManager.getPassengersPage().add(type, times);
});

When('the user removes {int} {string}', async function (this: CustomWorld, times: number, type: string) {
  await this.poManager.getPassengersPage().remove(type, times);
});

When('the user tries to add one more {string}', async function (this: CustomWorld, type: string) {
  await this.poManager.getPassengersPage().tryToAddOneMore(type);
});

Then('{string} count is {int}', async function (this: CustomWorld, type: string, number: number) {
  await this.poManager.getPassengersPage().verifyCount(type, number);
});

Then('the plus button for {string} is disabled', async function (this: CustomWorld, type: string) {
  await this.poManager.getPassengersPage().verifyPlusDisabled(type);
});

Then('an alert says {string}', async function (this: CustomWorld, text: string) {
  await this.poManager.getPassengersPage().verifyAlertContains(text);
});

When('the user clicks Done', async function (this: CustomWorld) {
  await this.poManager.getPassengersPage().close();
});

Then('the passengers box shows {string}', async function (this: CustomWorld, text: string) {
  await this.poManager.getPassengersPage().verifySummary(text);
});

// ---------------- Currency ----------------
Then('the currency list has {string}', async function (this: CustomWorld, list: string) {
  await this.poManager.getHomePage().verifyCurrencyOptions(list.split(','));
});

When('the user selects currency {string}', async function (this: CustomWorld, currency: string) {
  await this.poManager.getHomePage().selectCurrency(currency);
});

Then('currency {string} is selected', async function (this: CustomWorld, currency: string) {
  await this.poManager.getHomePage().verifyCurrency(currency);
});

// ---------------- Discounts ----------------
Then('there are {int} discount options', async function (this: CustomWorld, n: number) {
  await this.poManager.getDiscountPage().verifyCount(n);
});

When('the user checks the {string} discount', async function (this: CustomWorld, name: string) {
  await this.poManager.getDiscountPage().check(name);
});

Then('the {string} discount is checked', async function (this: CustomWorld, name: string) {
  await this.poManager.getDiscountPage().verifyChecked(name);
});

Then('the {string} discount is not checked', async function (this: CustomWorld, name: string) {
  await this.poManager.getDiscountPage().verifyNotChecked(name);
});

Then('the {string} discount is not shown', async function (this: CustomWorld, name: string) {
  await this.poManager.getDiscountPage().verifyHidden(name);
});

// ---------------- Header ----------------
Then('these tabs are visible {string}', async function (this: CustomWorld, tabs: string) {
  for (const tab of tabs.split(',')) {
    await this.poManager.getHomePage().verifyTabVisible(tab);
  }
});
