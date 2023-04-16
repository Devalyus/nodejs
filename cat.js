const { createReadStream } = require("fs");
const cat = async (path) => {
  const content = createReadStream(path, { encoding: "utf8" });
  content.on("data", (data) => {
    console.log(data);
  });
  content.on("error", () => {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "Operation failed."
    );
  });
};

module.exports = cat;
