const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const calculateHash = (path_to_file) => {
  const hash = crypto.createHash("sha256");
  const readStream = fs.createReadStream(
    path.resolve(process.cwd(), path_to_file)
  );

  readStream.on("data", (data) => {
    hash.update(data);
  });

  readStream.on("error", (e) => {
    console.error("\x1b[31m%s\x1b[0m", "Operation failed.");
    readStream.destroy(e);
  });

  readStream.on("end", () => {
    console.log(hash.digest("hex"));
  });
};

module.exports = calculateHash;
