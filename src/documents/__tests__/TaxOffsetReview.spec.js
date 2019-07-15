import faker from "faker";
import TaxOffsetReview from "../TaxOffsetReview";

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

// eslint-disable-next-line jest/no-disabled-tests
describe.skip("generateFiles", () => {
  it("creates a file for each template on the document", async () => {
    const files = await TaxOffsetReview.generateFiles(fullData);

    expect(files.length).toEqual(TaxOffsetReview.templates.length);
  });
});
