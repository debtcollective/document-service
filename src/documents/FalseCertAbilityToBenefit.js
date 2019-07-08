// @flow

import Document from "./Document";

class FalseCertAbilityToBenefit extends Document implements DocumentGenerator {
  slug = "falsecert-ability-to-benefit";
  templates = [`${this.slug}/0.fdf`];
  version = "v1";
}

export default new FalseCertAbilityToBenefit();
