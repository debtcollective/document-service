// @flow

import Document from "./Document";
import path from "path";

class UnauthorizedSignForm extends Document implements DocumentGenerator {
  slug = "unauthorized-sign-form";
  templates = [path.resolve(__dirname, `../templates/${this.slug}/0.fdf`)];
  version = "v1";
}

export default new UnauthorizedSignForm();
