// @flow

import _ from "lodash";
import chromium from "chrome-aws-lambda";
import fs from "fs";
import handlebars from "handlebars";
import uuid from "uuid";

class PDFEngine implements DocumentGeneratorEngine {
  process = async (data: mixed, templates: Array<string>) => {
    const browser = await this.initPuppeteer();

    const files = await Promise.all(
      _.map(templates, async pathToTemplate => {
        const html = this.interpolateTemplate(data, pathToTemplate);

        return this.createFile(html, browser);
      })
    );

    // clean up
    await browser.close();

    return files;
  };

  interpolateTemplate = (data: mixed, pathToTemplate: string) => {
    const templateFile = fs.readFileSync(pathToTemplate);
    const template = handlebars.compile(templateFile.toString());
    const html = template(data);

    return html;
  };

  createFile = async (html: string, browser: any) => {
    // start puppeteer or use the one provided
    const page = await browser.newPage();

    // render HTML
    await page.setContent(html);

    // create the PDF
    const pdfBuffer = await page.pdf();

    // TODO: make filenames deterministic
    // generate random filename
    const filename = `${uuid.v4()}.pdf`;

    // clean up
    await page.close();

    // return the PDF. If we can return a buffer even better
    // if we use buffers, we should add a flag to test to persist these buffers
    return [pdfBuffer, filename];
  };

  async initPuppeteer() {
    const executablePath = await chromium.executablePath;

    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath,
      headless: process.env.CHROME_HEADLESS || true,
    });

    return browser;
  }
}

export default new PDFEngine();
