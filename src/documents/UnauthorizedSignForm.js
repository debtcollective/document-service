// @flow

import Document from "./Document";

class UnauthorizedSignForm extends Document implements DocumentGenerator {
  slug = "unauthorized-sign-form";
  templates = [`${this.slug}/0.fdf`];
  version = "v1";
}

export default new UnauthorizedSignForm();
