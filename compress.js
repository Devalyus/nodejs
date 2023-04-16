const fs = require("fs");
const path = require("path");
const zlip = require("zlib");

const compress = (path_to_file, path_to_destination) => {
  const readStream = fs.createReadStream(
    path.resolve(process.cwd(), path_to_file)
  );
  const writeStream = fs.createWriteStream(
    path.resolve(process.cwd(), path_to_destination)
  );

  const brotli = zlip.createBrotliCompress();
  const stream = readStream.pipe(brotli).pipe(writeStream);

  stream.on("finish", () => {
    console.log("Successfully compressed.");
  });

  stream.on("error", (err) => {
    console.error("\x1b[31m%s\x1b[0m", "Operation failed.");
  });
};

module.exports = compress;
