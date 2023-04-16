const fs = require("fs/promises");
const path = require("path");

const add = async (name) => {
  try {
    await fs.writeFile(path.resolve(process.cwd(), name), "");
  } catch (err) {
    console.log(err);
    console.error("\x1b[31m%s\x1b[0m", "Operation failed.");
  }
};

module.exports = add;
