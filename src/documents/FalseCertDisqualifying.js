// @flow

import Document from "./Document";

class FalseCertDisqualifying extends Document implements DocumentGenerator {
  slug = "falsecert-disqualifying";
  templates = [`${this.slug}/0.hbs`];
  version = "v1";
}

export default new FalseCertDisqualifying();
