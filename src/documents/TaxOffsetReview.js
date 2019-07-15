// @flow

import Document from "./Document";
import path from "path";

class TaxOffsetReview extends Document implements DocumentGenerator {
  slug = "tax-offset-review";
  templates = [path.resolve(__dirname, `../templates/${this.slug}/0.fdf`)];
  version = "v1";
}

export default new TaxOffsetReview();
