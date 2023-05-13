const { errors } = require("../constants/constants");

const validateData = (user) => {
  if (!user.age || !user.hobbies || !user.username) {
    throw new Error(errors.missing_properties);
  }
  return true;
};

module.exports = {
  validateData,
};
