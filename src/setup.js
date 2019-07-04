// @flow

import chromium from "chrome-aws-lambda";

const env = process.env.NODE_ENV || "development";
const port = process.env.CHROME_DEBUGGING_PORT || "9222";

export const getBrowser = async () => {
  // use chrome-aws-lambda only in production
  if (env === "production") {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args.concat([`--remote-debugging-port=${port}`]),
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
    });

    return browser;
  }

  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      `--remote-debugging-port=${port}`,
    ],
  });

  return browser;
};
