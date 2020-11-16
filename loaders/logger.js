const morgan = require("morgan");
const winston = require("../config/logger/logger");
require("../config/logger/loggerconfig");

initLogger = (app)=>{
  app.use(morgan("combined", {stream: winston.stream}));
};

module.exports = initLogger;
