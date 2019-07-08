import faker from "faker";
import FDFEngine from "../FDFEngine";
import fs from "fs";
import path from "path";

const pathToPDFfolder = path.join(__dirname, "../../../pdf");

// This test fails on the Travis Pipeline
describe.skip("process", () => {
  beforeAll(() => {
    // A place to store the created PDFs while development
    const dir = pathToPDFfolder;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.readdirSync(pathToPDFfolder).forEach(f =>
      fs.unlinkSync(path.join(pathToPDFfolder, f))
    );
  });

  it("allows to mark checkboxes", async () => {
    const data = {
      baseball: "Yes",
      basketball: "Yes",
      hockey: "Yes",
      nascar: "Off",
    };

    const result = await FDFEngine.process(data, "../stubs/test.pdf");
    expect(result).toEqual(true);
  });

  it("generate a new PDF file from a given data and PDF source file", async () => {
    const preffixPage1 = "topmostSubform[0].Page1[0]";
    // use the utility function `generateFDFTemplate` if needed to generate the FDF object and know the keys
    const data = {
      "topmostSubform[0].Page1[0].CheckBox1[0]": "Yes",
      [`${preffixPage1}.#area[1].SSN1[0]`]: "023",
      [`${preffixPage1}.#area[1].SSN2[0]`]: "45",
      [`${preffixPage1}.#area[1].SSN3[0]`]: "6789",
      [`${preffixPage1}.CityStateZipCode[0]`]: faker.address.zipCode(),
      [`${preffixPage1}.Address[0]`]: faker.address.streetAddress(),
      [`${preffixPage1}.Email[0]`]: faker.internet.email(),
      [`${preffixPage1}.Name[0]`]: faker.name.findName(),
      [`${preffixPage1}.Phone1[0]`]: faker.phone.phoneNumber(),
      [`${preffixPage1}.Phone2[0]`]: faker.phone.phoneNumber(),
    };

    const result = await FDFEngine.process(data, "../stubs/file.pdf");
    expect(result).toEqual(true);
  });
});
