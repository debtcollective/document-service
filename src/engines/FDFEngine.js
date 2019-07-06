// @flow

import path from "path";
import pdfFiller from "pdffiller";
import uuid from "uuid";

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
      pdfFiller.fillForm(sourcePDF, destinationPDF, data, err => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
}

export default new FDFEngine();
