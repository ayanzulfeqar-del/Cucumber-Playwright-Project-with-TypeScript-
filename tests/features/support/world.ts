import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { POManager } from '../../../pages/POManager';

// Custom World so "this.page" and "this.poManager" have types in steps
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  poManager!: POManager;

  constructor(options: IWorldOptions) {
    super(options);
  }
}
setWorldConstructor(CustomWorld);
