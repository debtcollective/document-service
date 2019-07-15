// @flow

import Document from "./Document";
import path from "path";

class WageGarnishment extends Document implements DocumentGenerator {
  slug = "wage-garnishment";
  templates = [path.resolve(__dirname, `../templates/${this.slug}/0.fdf`)];
  version = "v1";
}

export default new WageGarnishment();
