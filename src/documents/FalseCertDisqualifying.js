// @flow

import Document from "./Document";

class FalseCertDisqualifying extends Document implements DocumentGenerator {
  slug = "falsecert-disqualifying";
  templates = [`${this.slug}/0.fdf`];
  version = "v1";
}

export default new FalseCertDisqualifying();
