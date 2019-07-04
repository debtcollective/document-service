// @flow

import chromium from "chrome-aws-lambda";

export const getBrowser = async () => {
  // use chrome-aws-lambda only in production
  if (process.env.NODE_ENV === "production") {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args.concat(["--remote-debugging-port=9222"]),
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    return browser;
  }

  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  return browser;
};
