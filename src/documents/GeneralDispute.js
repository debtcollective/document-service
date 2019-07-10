// @flow

import Document from "./Document";
import path from "path";
import PDFEngine from "../engines/PDFEngine";

class GeneralDispute extends Document implements DocumentGenerator {
  engine = PDFEngine;
  slug = "general-dispute";
  templates = [path.resolve(__dirname, `../templates/${this.slug}/0.hbs`)];
  version = "v1";
}

export default new GeneralDispute();
