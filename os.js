const os = require("os");

const os_ = async (arg) => {
  if (arg == undefined) {
    console.log(`Usage:
        --EOL  : default system end of line
        --cpus : cpus info
        --homedir: home directory
        --username: system user name
        --architecture: cpu architecture`);
  }

  if (arg === "--EOL") {
    console.log(JSON.stringify(os.EOL));
  } else if (arg === "--cpus") {
    console.log(os.cpus());
  } else if (arg === "--homedir") {
    console.log(os.homedir);
  } else if (arg === "--username") {
    console.log(os.userInfo().username);
  } else if (arg === "--architecture") {
    console.log(os.arch());
  }
};

module.exports = os_;
