const bcrypt = require("bcrypt");

const response = (statusCode, message, data) => {
  return {
    statusCode,
    message,
    data,
  };
};

const isDefVar = (variable) => (variable ? true : false);

const isDefObject = (object) =>
  Object.keys(object).length === 0 ? false : true;

module.exports = {
  response,
  isDefVar,
  isDefObject,
};
