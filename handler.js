const readDocxFile = async (filePath) => {
  const data = await parseDocx(filePath);
  return data;
};

const parseDocx = (filePath) => {
  const docxParser = require("docx-parser");

  return new Promise((resolve, reject) => {
    docxParser.parseDocx(filePath, (data) => {
      resolve(data);
    });
  });
};

module.exports = {
  readDocxFile,
};
