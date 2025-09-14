import {browser} from "@wdio/globals";

export async function openApp(path = '/'): Promise<void> {
    const base = (process.env.BASE_URL ?? 'https://www.saucedemo.com').replace(/\/+$/, '');
    const normalizedPath = path.startsWith('/') ? path : '/${path}';
    const url = new URL(normalizedPath, base).toString();

    console.log(`[openApp] Navigating to: ${url}`);

    await browser.navigateTo(url);
}