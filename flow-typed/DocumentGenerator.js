declare interface DocumentGeneratorEngine {
  process(
    data: mixed,
    templates: Array<string>
  ): Promise<Array<[Buffer, string]>>;
}

declare interface DocumentGenerator {
  engine: DocumentGeneratorEngine;
  slug: string;
  version: "v1";
  templates: Array<string>;
  generateFiles(): Promise<Array<[Buffer, string]>>;
}
