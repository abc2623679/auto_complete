const { HTTP_STATUS, TIMEZONE } = require("../config/env.config");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault(TIMEZONE); 

const httpStatus = {};
HTTP_STATUS.map((item) => {
  httpStatus[item.name] = item.code;
});
[1, 2, 3, 4, 5].map((item) => {
  httpStatus["is" + item + "xx"] = (code) => {
    return Math.floor(code / 100) == item;
  };
});

const result = { error: {}, success: {} };

const Success = function () { };

result.success = Success;

result.customSuccess = (statusCode, code, object) => {
  const success = new Success();
  success.code = 0;
  success.data = object;
  return success;
};

result.customError = (statusCode, code, message) => {
  const err = new Error();
  err.statusCode = statusCode;
  err.code = code;
  err.message = message;
  err.custom = true;
  return err;
};

HTTP_STATUS.filter((item) => httpStatus.is2xx(item.code)).map((item) => {
  result.success[item.name] = (object = {}, code = 0) => result.customSuccess(item.code, code, object);
});

HTTP_STATUS.filter((item) => httpStatus.is4xx(item.code) || httpStatus.is5xx(item.code)).map((item) => {
  result.error[item.name] = (message, code = -1) =>
    result.customError(item.code, code, message === undefined ? item.defaultMessage : message);
});

module.exports = { httpStatus, result };
