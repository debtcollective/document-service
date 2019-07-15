import faker from "faker";
import path from "path";
import PDFEngine from "../PDFEngine";

describe("interpolateTemplate", () => {
  it("returns a parsed HTML from given template and data", async () => {
    const data = { body: faker.random.word(), title: faker.random.word() };
    const html = await PDFEngine.interpolateTemplate(
      data,
      path.resolve(__dirname, "../../stubs/dummyTemplate.hbs")
    );

    expect(html).toEqual(expect.stringContaining(data.body));
    expect(html).toEqual(expect.stringContaining(data.title));
  });
});
