const PATH_DIR_SRC = "./src";
const PATH_DIR_OUT = "./out";

const { readDocxFile } = require("./handler");
const { TemplateHandler } = require("easy-template-x");

const run = async () => {
  const path = require("path");
  const fs = require("fs/promises");
  const prompt = require("prompt");

  const PATH_SRC_FILE = path.join(PATH_DIR_SRC, "template.docx");
  const PATH_OUT_FILE = path.join(PATH_DIR_OUT, "template.docx");

  const rawText = await readDocxFile(PATH_SRC_FILE);
  const templates = rawText.match(/(?<={)[^{}]+(?=})/g);

  prompt.start();
  const inputs = await prompt.get(templates);

  const text = await fs.readFile(PATH_SRC_FILE);

  const handler = new TemplateHandler();
  const data = {
    firstName: "Denis",
    lastName: "Cho",
  };

  const result = await handler.process(text, inputs);

  await fs.writeFile(PATH_OUT_FILE, result);
};

run();
