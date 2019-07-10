import faker from "faker";
import PrivateStudentLoan from "../PrivateStudentLoan";

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

describe("generateFiles", () => {
  it("creates a file for each template on the document", async () => {
    const files = await PrivateStudentLoan.generateFiles(fullData);

    expect(files.length).toEqual(PrivateStudentLoan.templates.length);
  });
});
