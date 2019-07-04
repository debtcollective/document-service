// @flow

import Document from "./Document";
import PDFEngine from "../engines/PDFEngine";

class PrivateStudentLoan extends Document implements DocumentGenerator {
  engine = PDFEngine;
  slug = "private-student-loan";
  templates = [`${this.slug}/defaulted.hbs`, `${this.slug}/non-defaulted.hbs`];
  version = "v1";
}

export default new PrivateStudentLoan();
