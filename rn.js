const fs = require("fs/promises");
const path = require("path");

const rn = async (oldName, newName) => {
  try {
    await fs.rename(
      path.resolve(process.cwd(), oldName),
      path.resolve(process.cwd(), newName)
    );
  } catch (err) {
    console.error("\x1b[31m%s\x1b[0m", "Operation failed.");
  }
};

module.exports = rn;
