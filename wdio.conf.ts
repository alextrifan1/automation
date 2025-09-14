import 'dotenv/config';
import type { Options } from '@wdio/types';
import {openApp} from "./test/utils/navigation.ts";

export const config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    specs: process.env.SPEC_TO_RUN
        ? process.env.SPEC_TO_RUN.split(',')
        : ['./test/specs/**/*.ts'],

    maxInstances: 10,

    capabilities: [{ browserName: 'chrome' }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: { ui: 'bdd', timeout: 60000 },

    before: async function(capabilities, specs)  {
        await openApp(process.env.START_PATH ?? '/')
    }
} as unknown as Options.Testrunner;
