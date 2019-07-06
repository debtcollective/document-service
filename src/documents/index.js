// @flow

const documentMap = {
  "credit-report-dispute": require("./CreditReportDispute").default,
  "falsecert-ability-to-benefit": require("./FalseCertAbilityToBenefit")
    .default,
  "falsecert-disqualifying": require("./FalseCertDisqualifying").default,
  "general-dispute": require("./GeneralDispute").default,
  "private-student-loan": require("./PrivateStudentLoan").default,
  "tax-offset-review": require("./TaxOffsetReview").default,
  "unauthorized-sign-form": require("./UnauthorizedSignForm").default,
  "wage-garnishment": require("./WageGarnishment").default,
};

export const findBySlug = (documentSlug: $Keys<typeof documentMap>) => {
  return documentMap[documentSlug];
};
