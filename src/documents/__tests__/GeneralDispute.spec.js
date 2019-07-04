import faker from "faker";
import fs from "fs";
import GeneralDispute from "../GeneralDispute";
import { getBrowser } from "../../setup";
import path from "path";
import tmp from "tmp";

const fakeData = {
  disputeId: faker.random.uuid(),
  userId: faker.random.uuid(),
};

const fullData = {
  agency: {
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    name: faker.company.companyName(),
  },
  user: {
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    id: fakeData.userId,
    name: faker.name.findName(),
  },
};

const tmpDir = tmp.dirSync();
const pathToPDFfolder = tmpDir.name;
const DocumentHandler = GeneralDispute;

describe("generateFiles", () => {
  let browser;

  beforeAll(() => {
    // A place to store the created PDFs while development
    const dir = pathToPDFfolder;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    browser = getBrowser();
  });

  beforeEach(() => {
    fs.readdirSync(pathToPDFfolder).forEach(f =>
      fs.unlinkSync(path.join(pathToPDFfolder, f))
    );
  });

  afterAll(async () => {
    await browser.close();
  });

  it("creates a file for each template on the document", async () => {
    const files = await DocumentHandler.generateFiles(fullData);

    // simulate side effect after process files
    await Promise.all(
      files.map(async ({ fileName, file }) => {
        const pathToFile = path.join(pathToPDFfolder, fileName);
        await file.toFile(pathToFile);
      })
    );
    const readFiles = fs.readdirSync(pathToPDFfolder);

    expect(files.length).toEqual(DocumentHandler.templates.length);
    expect(
      readFiles.filter(readFileName => readFileName === files[0].fileName)
    ).toHaveLength(1);
  });
});
