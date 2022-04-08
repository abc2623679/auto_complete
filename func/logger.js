const { createLogger, format, transports } = require("winston");
const moment = require("moment-timezone");
require("winston-daily-rotate-file");
const customformat = format.printf((info) => `${info.message}`);
const path = process.mainModule.path;

const logger = createLogger({
  level: "info",
  transports: [
    new transports.DailyRotateFile({
      filename: `${path}/logs/nodejslog.log`,
      json: false,
      maxsize: "5m",
      format: format.combine(customformat),
    }),
    new transports.Console({
      format: customformat,
      level: "info",
    }),
  ],
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

module.exports = logger;
