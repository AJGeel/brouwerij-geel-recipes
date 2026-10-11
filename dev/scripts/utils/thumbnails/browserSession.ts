import fs from "fs";

import puppeteer, { type Browser, type Page } from "puppeteer-core";

/** The search can't run, e.g. no Chrome or a captcha. The developer can still paste an image */
export class SearchUnavailableError extends Error {}

const chromePaths = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

const findChrome = () => {
  const chrome = chromePaths.find((path) => path && fs.existsSync(path));

  if (!chrome) {
    throw new SearchUnavailableError(
      "Chrome wasn't found. Set CHROME_PATH to its executable.",
    );
  }

  return chrome;
};

let browser: Promise<Browser> | undefined;
let gallery: Promise<Page> | undefined;

export const getBrowser = () =>
  (browser ??= puppeteer.launch({
    executablePath: findChrome(),
    headless: false,
    defaultViewport: null,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--window-size=1100,900",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
  }));

/** The tab that previews are shown in, brought to the front */
export const getGalleryPage = () =>
  (gallery ??= getBrowser().then(
    async (chrome) => (await chrome.pages())[0] ?? chrome.newPage(),
  ));

export const closeBrowser = async () => {
  const running = browser;

  browser = undefined;
  gallery = undefined;
  await (await running)?.close();
};
