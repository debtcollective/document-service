// @flow

import Document from "./Document";

class WageGarnishment extends Document implements DocumentGenerator {
  slug = "tax-offset-review";
  templates = [`${this.slug}/0.fdf`];
  version = "v1";
}

export default new WageGarnishment();
