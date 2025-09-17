import { browser } from '@wdio/globals';
import { TIMEOUT } from '../../constants.ts';

export async function safeAction(
  action: () => Promise<void>,
  retries = 2,
  pause = TIMEOUT.HALF_SECOND,
) {
  for (let i = 0; i < retries; i++) {
    try {
      await action();
      return;
    } catch (err) {
      if (i === retries - 1) {
        throw err;
      }
      await browser.pause(pause); // pauza intre incercari
    }
  }
}

export async function safeClick(
  el: WebdriverIO.Element,
  timeout = TIMEOUT.FIVE_SECONDS,
  retries = 2,
) {
  for (let i = 0; i < retries; i++) {
    try {
      await el.waitForClickable({ timeout });
      await el.click();
      return;
    } catch (err) {
      if (i === retries - 1) {
        throw err;
      }
      await browser.pause(TIMEOUT.HALF_SECOND); // pauza intre incercari
    }
  }
}

export async function waitForGone(el: WebdriverIO.Element, timeout = TIMEOUT.FIVE_SECONDS) {
  await el.waitForDisplayed({ reverse: true, timeout });
}

export async function isDisplayedSafe(
  el: WebdriverIO.Element,
  timeout = TIMEOUT.TWO_SECONDS,
): Promise<boolean> {
  try {
    await browser.waitUntil(async () => (await el.isExisting()) && (await el.isDisplayed()), {
      timeout,
      interval: TIMEOUT.HALF_SECOND,
      timeoutMsg: `Elementul nu a devenit vizibil în ${timeout}ms`,
    });
    return true;
  } catch {
    return false;
  }
}
