const fs = require("fs/promises");

const ls = async () => {
  try {
    const files = await fs.readdir(process.cwd(), {
      withFileTypes: true,
    });
    const foldersSorted = files
      .filter((folder) => folder.isDirectory())
      .sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase());
    const fileSorted = files
      .filter((file) => file.isFile())
      .sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase());
    const filesSorted = foldersSorted.concat(fileSorted);
    console.table(
      filesSorted.map((file) => ({
        Name: file.name,
        Type: file.isFile() ? "file" : "directory",
      }))
    );
  } catch (err) {
    console.log("\x1b[31m%s\x1b[0m", "Operation failed");
  }
};

module.exports = {
  ls,
};
