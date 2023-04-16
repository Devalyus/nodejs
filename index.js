const os = require("os");
const readline = require("readline");
const path = require("path");

const cat = require("./cat");
const { ls } = require("./ls");
const add = require("./add");
const rn = require("./rn");
const cp = require("./cp");
const rm = require("./rm");
const os_ = require("./os");
const calculateHash = require("./hash");
const compress = require("./compress");
const decompress = require("./decompress");

const blank = "\n".repeat(process.stdout.rows);
console.log(blank);
readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);
process.chdir(os.homedir());

const username = process.argv
  .find((item) => item.startsWith("--username"))
  .split("=")[1];
console.log("Welcome to the File Manager, " + username + "!");

process.stdin.on("data", (data) => {
  console.clear();
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);

  const command = String(data).trim();
  const args = command.split(/\s+/);

  if (command === ".exit") {
    process.exit(0);
  }

  if (args[0] === "up") {
    process.chdir("../");
  }

  if (args[0] === "cd") {
    if (args.length !== 2) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Invalid input. Format: cd path_to_directory"
      );
      return;
    }
    try {
      process.chdir(path.resolve(process.cwd(), args[1]));
    } catch (err) {
      console.error("\x1b[31m%s\x1b[0m", "Operation failed.");
    }
  }

  const currentPath = process.cwd();
  console.log("You are currently in " + process.cwd());
  console.log("-".repeat(currentPath.length + 21));

  if (args[0] === "ls") {
    if (args.length !== 1) {
      console.error("\x1b[31m%s\x1b[0m", "Invalid input. Format: ls");
      return;
    }
    ls();
  }

  if (args[0] === "cat") {
    if (args.length !== 2) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Invalid input. Format: cat path_to_file"
      );
      return;
    }

    const path = args[1];
    cat(path);
  }

  if (args[0] === "add") {
    if (args.length !== 2) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Invalid input. Format: add new_file_name"
      );
      return;
    }

    add(args[1]);
  }

  if (args[0] === "rn") {
    if (args.length !== 3) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Invalid input. Format: rn path_to_file new_name"
      );
      return;
    }

    rn(args[1], args[2]);
  }

  if (args[0] === "cp") {
    if (args.length !== 3) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Invalid input. Format: cp source_file destination"
      );
      return;
    }

    cp(args[1], args[2]);
  }

  if (args[0] === "mv") {
    if (args.length !== 3) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Invalid input. Format: mv source_file destination"
      );
      return;
    }

    cp(args[1], args[2], () => {
      rm(args[1]);
    });
  }

  if (args[0] === "rm") {
    if (args.length !== 2) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Invalid input. Format: rm path_to_file"
      );
      return;
    }

    rm(args[1]);
  }

  if (args[0] === "os") {
    os_(args[1]);
  }

  if (args[0] === "hash") {
    if (args.length !== 2) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Invalid input. Format: hash path_to_file"
      );
      return;
    }
    calculateHash(args[1]);
  }

  if (args[0] === "compress") {
    if (args.length !== 3) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Invalid input. Format: compress path_to_file path_to_destination"
      );
      return;
    }

    compress(args[1], args[2]);
  }

  if (args[0] === "decompress") {
    if (args.length !== 3) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Invalid input. Format: decompress path_to_file path_to_destination"
      );
      return;
    }

    decompress(args[1], args[2]);
  } else {
    console.error("\x1b[31m%s\x1b[0m", "Invalid input.");
  }
});

process.on("SIGINT", () => {
  process.exit(0);
});

process.on("exit", () => {
  readline.cursorTo(process.stdout, 0);
  readline.clearLine(process.stdout, 0);
  console.clear();
  console.log("Thank you for using File Manager, " + username + ", goodbye!");
});
