// @flow

import Document from "./Document";
import path from "path";
import PDFEngine from "../engines/PDFEngine";

class PrivateStudentLoan extends Document implements DocumentGenerator {
  engine = PDFEngine;
  slug = "private-student-loan";
  templates = [
    path.resolve(__dirname, `../templates/${this.slug}/defaulted.hbs`),
    path.resolve(__dirname, `../templates${this.slug}/non-defaulted.hbs`),
  ];
  version = "v1";
}

export default new PrivateStudentLoan();
