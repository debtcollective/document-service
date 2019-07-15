// @flow

import Document from "./Document";
import path from "path";

class FalseCertAbilityToBenefit extends Document implements DocumentGenerator {
  slug = "falsecert-ability-to-benefit";
  templates = [path.resolve(__dirname, `../templates/${this.slug}/0.fdf`)];
  version = "v1";
}

export default new FalseCertAbilityToBenefit();
