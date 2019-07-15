// @flow

class DummyEngine implements DocumentGeneratorEngine {
  process = async (data: mixed, templates: Array<string>) => {
    console.warn("calling process without proper engine", data, templates);

    const buffer = new Buffer(0);

    return Promise.resolve([[buffer, ""]]);
  };
}

export default class Document implements DocumentGenerator {
  version = "v1";
  slug = "";
  engine = new DummyEngine();
  templates = [];
  generateFiles = async (data: mixed) => {
    const files = await this.engine.process(data, this.templates);

    return files;
  };
}
