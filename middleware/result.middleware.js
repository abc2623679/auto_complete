const { result, httpStatus } = require("../func/misc");

const Success = result.success;

const errorParams = (req) => {
  console.info("### Error API Parameters List ###");
};

const notFound = (req, res, next) => {
  next(result.error.notFound());
};

const response = (data, req, res, next) => {
  if (data instanceof Success) {
    res.send(data);
  } else {
    console.log(data);
    let statusCode,
      code = -1,
      message,
      custom,
      description;
    errorParams(req);

    if (data instanceof Error) {
      statusCode = data.statusCode || httpStatus.internalServerError;
      custom = data.custom || false;
      code = data.code || -1;
      message = data.message;
      description = data.stack;
    } else {
      statusCode = httpStatus.internalServerError;
      message = data + "";
      custom = false;
      description = data + "";
    }
    if (!Number.isInteger(statusCode)) statusCode = httpStatus.internalServerError;

    if (statusCode === httpStatus.internalServerError) {
      console.log("InternalServerError:", message);
      message = "서버 장애가 발생했습니다.";
    }
    res.status(statusCode).send({ code, message, data: {} });
  }
};

module.exports = { notFound, response };
