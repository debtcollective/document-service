// @flow

import Document from "./Document";
import path from "path";

class FalseCertDisqualifying extends Document implements DocumentGenerator {
  slug = "falsecert-disqualifying";
  templates = [path.resolve(__dirname, `../templates/${this.slug}/0.fdf`)];
  version = "v1";
}

export default new FalseCertDisqualifying();
