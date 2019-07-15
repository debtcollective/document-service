// @flow

import Document from "./Document";
import path from "path";
import PDFEngine from "../engines/PDFEngine";

class CreditReportDispute extends Document implements DocumentGenerator {
  engine = PDFEngine;
  slug = "credit-report-dispute";
  templates = [
    path.resolve(__dirname, `../templates/${this.slug}/0.hbs`),
    path.resolve(__dirname, `../templates/${this.slug}/1.hbs`),
  ];
  version = "v1";
}

export default new CreditReportDispute();
