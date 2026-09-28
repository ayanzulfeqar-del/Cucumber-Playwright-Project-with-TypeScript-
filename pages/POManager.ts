import { Page } from '@playwright/test';
import { HomePage } from './HomePage';
import { FlightSearchPage } from './FlightSearchPage';
import { PassengersPage } from './PassengersPage';
import { DiscountPage } from './DiscountPage';

export class POManager {
  readonly page: Page;
  readonly homePage: HomePage;
  readonly flightSearchPage: FlightSearchPage;
  readonly passengersPage: PassengersPage;
  readonly discountPage: DiscountPage;

  constructor(page: Page) {
    this.page             = page;
    this.homePage         = new HomePage(page);
    this.flightSearchPage = new FlightSearchPage(page);
    this.passengersPage   = new PassengersPage(page);
    this.discountPage     = new DiscountPage(page);
  }

  getHomePage()         { return this.homePage; }
  getFlightSearchPage() { return this.flightSearchPage; }
  getPassengersPage()   { return this.passengersPage; }
  getDiscountPage()     { return this.discountPage; }
}
