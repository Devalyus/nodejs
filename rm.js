const { unlink } = require("fs/promises");
const path = require("path");

const rm = async (name) => {
  try {
    await unlink(path.resolve(process.cwd(), name));
  } catch (err) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "Operation failed. Maybe file does not exist."
    );
  }
};

module.exports = rm;
