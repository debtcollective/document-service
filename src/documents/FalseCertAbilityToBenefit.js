// @flow

import Document from "./Document";

class FalseCertAbilityToBenefit extends Document implements DocumentGenerator {
  slug = "falsecert-ability-to-benefit";
  templates = [`${this.slug}/0.hbs`];
  version = "v1";
}

export default new FalseCertAbilityToBenefit();
