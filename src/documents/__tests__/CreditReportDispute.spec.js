import CreditReportDispute from "../CreditReportDispute";
import faker from "faker";
import { persistFiles } from "../../../tests";

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

describe("generateFiles", () => {
  it("creates a file for each template on the document", async () => {
    const files = await CreditReportDispute.generateFiles(fullData);

    const filePaths = await persistFiles(files);
    console.log(filePaths);

    expect(files.length).toEqual(CreditReportDispute.templates.length);
  });
});
