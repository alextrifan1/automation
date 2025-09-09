import {browser, $} from '@wdio/globals'

describe('Duck search', () => {
    it('Searches for WebdriverIO', async () => {
        await browser.url('https://duckduck.go.com/');

        await $('#search_form_input_homepage').setValue('WebdriverIO');
        await $('#search_button_homepage').click();

        const title = await browser.getTitle();
        expect(title).toBe('WebdriverIO at DuckDuckGo');
    });
});