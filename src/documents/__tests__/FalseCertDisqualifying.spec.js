import faker from "faker";
import FalseCertDisqualifying from "../FalseCertDisqualifying";
import fs from "fs";
import { getBrowser } from "../../setup";
import path from "path";

const fakeData = {
  disputeId: faker.random.uuid(),
  userId: faker.random.uuid(),
};

const fullData = {
  agencies: [
    { address: [faker.address.streetAddress(), faker.address.streetAddress()] },
    { address: [faker.address.streetAddress()] },
  ],
  creditors: [faker.company.companyName(), faker.company.companyName()],
  date: faker.date.recent(),
  user: {
    address: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    dob: faker.date.past(),
    email: faker.internet.email(),
    id: fakeData.userId,
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumber(),
    ssn: faker.random.number(),
  },
};

const pathToPDFfolder = path.join(__dirname, "../../../pdf");
const DocumentHandler = FalseCertDisqualifying;

// NOTE: CI is not able to run this since it relies on Chromium instance
describe.skip("generateFiles", () => {
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
        const pathToFile = `pdf/${fileName}`;
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
