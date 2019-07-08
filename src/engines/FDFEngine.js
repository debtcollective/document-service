// @flow

import _fillPDF from "fill-pdf";
import fs from "fs";
import path from "path";
import { promisify } from "util";
// import pdfFiller from "pdffiller";
import uuid from "uuid";

const writeFile = promisify(fs.writeFile);

class FDFEngine implements DocumentGeneratorEngine {
  process = async (data: mixed, sourcePDF: string) => {
    const pathToSourceFile = path.join(__dirname, sourcePDF);
    const destinationPDF = `pdf/${uuid.v4()}.pdf`;
    const result = await this.fillPDF(pathToSourceFile, destinationPDF, data);

    return result;
  };

  fillPDF = (
    sourcePDF: string,
    destinationPDF: string,
    data: mixed
  ): Promise<boolean> =>
    new Promise((resolve, reject) => {
      _fillPDF.generatePdf(data, sourcePDF, async (err, buffer) => {
        if (err) {
          reject(err);
        }

        await writeFile(destinationPDF, buffer);
        resolve(true);
      });
    });
}

export default new FDFEngine();
