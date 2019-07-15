import faker from "faker";
import GeneralDispute from "../GeneralDispute";

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

describe("generateFiles", () => {
  it("creates a file for each template on the document", async () => {
    const files = await GeneralDispute.generateFiles(fullData);

    expect(files.length).toEqual(GeneralDispute.templates.length);
  });
});
