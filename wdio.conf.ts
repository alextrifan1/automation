import 'dotenv/config';
import type { Options } from '@wdio/types';
import { openApp } from './test/utils/navigation.ts';
import { browser } from '@wdio/globals';

const isApiTest = process.env.TEST_TYPE === 'api';

export const config: Options.Testrunner = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',
  
  specs: process.env.SPEC_TO_RUN
      ? process.env.SPEC_TO_RUN.split(',')
      : isApiTest
          ? ['./test/specs/api/**/*.ts']
          : ['./test/specs/ui/**/*.ts'],

  //
  // Capabilities: only if UI tests
  //
  maxInstances: 10,
  capabilities: isApiTest
      ? [{ browserName: 'chrome', maxInstances: 1, 'wdio:headless': true }]  // dummy capability for API tests
      : [{ browserName: 'chrome' }],


  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { ui: 'bdd', timeout: 60000 },

  //
  // Hooks
  //
  before: async function () {
    if (!isApiTest) {
      await openApp(process.env.START_PATH ?? '/');
    }
  },

  afterTest: async function (test, context, { passed }) {
    if (!isApiTest && !passed) {
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      await browser.saveScreenshot(`./errorShots/${test.title}_${timestamp}.png`);
    }
  },
};
