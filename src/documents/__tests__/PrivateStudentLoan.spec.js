import faker from "faker";
import fs from "fs";
import { getBrowser } from "../../setup";
import path from "path";
import PrivateStudentLoan from "../PrivateStudentLoan";
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
  date: faker.date.recent(),
  lastCorrespondence: faker.date.past(),
  user: {
    account: faker.finance.account(),
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    id: fakeData.userId,
    name: faker.name.findName(),
  },
};

const tmpDir = tmp.dirSync();
const pathToPDFfolder = tmpDir.name;
const DocumentHandler = PrivateStudentLoan;

describe("generateFiles", () => {
  it("creates a file for each template on the document", async () => {
    const browser = await getBrowser();
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

    // clean up
    await browser.close();
  }, 25000);
});
