const winston = require("winston");

const CATEGORY = "onetouch-server";
// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: "info",
    filename: "./app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
const loggerConfig={
  transports: [
    //new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    //new winston.transports.File(options.file),
  ],
  format: winston.format.combine(
      winston.format.label({
        label: CATEGORY,
      }),
      winston.format.timestamp(),
      winston.format.printf((info) => {
        return `${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}`;
      }),
  ),
  exitOnError: false, // do not exit on handled exceptions
};

const logger= winston.createLogger(loggerConfig);

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
