// Use this script by `node generateFDFTemplate.js`
var pdfFiller = require("pdffiller");

// replace the value ./0.pdf with the route relative to the template is
var sourcePDF = "./0.pdf";

// Override the default field name regex. Default: /FieldName: ([^\n]*)/
var nameRegex = null;

pdfFiller.generateFDFTemplate(sourcePDF, nameRegex, function(err, fdfData) {
  if (err) throw err;
  console.log(fdfData);
});
