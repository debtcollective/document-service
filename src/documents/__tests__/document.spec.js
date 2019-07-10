import Document from "../Document";
import faker from "faker";
import path from "path";
import PDFEngine from "../../engines/PDFEngine";

const fakeData = {
  disputeId: faker.random.uuid(),
  userId: faker.random.uuid(),
};

const fullData = {
  dispute: {
    date: faker.date.recent(1),
    id: fakeData.disputeId,
    toolId: "credit-report-dispute",
  },
  user: {
    id: fakeData.userId,
    name: faker.name.findName(),
  },
};

describe("generateFiles", () => {
  const templates = [
    path.resolve(__dirname, "../../templates/credit-report-dispute/0.hbs"),
    path.resolve(__dirname, "../../templates/general-dispute/0.hbs"),
  ];

  const DocumentHandler = (() => {
    class TestDocument extends Document {
      engine = PDFEngine;
      templates = templates;
    }

    return new TestDocument();
  })();

  it("creates a file for each template on the document", async () => {
    const files = await DocumentHandler.generateFiles(fullData, templates);

    expect(files.length).toEqual(templates.length);
  });
});
