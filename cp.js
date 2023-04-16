const { createReadStream, createWriteStream } = require("fs");
const path = require("path");

const cp = async (source, destination, callback) => {
  const readableStream = createReadStream(path.resolve(process.cwd(), source));
  const writeableStream = createWriteStream(
    path.resolve(process.cwd(), destination, source)
  );

  readableStream.pipe(writeableStream);
  readableStream.on("error", () => {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "Operation failed. Maybe source does not exist."
    );
  });

  if (callback !== undefined) {
    readableStream.on("end", callback);
  }
};

module.exports = cp;
