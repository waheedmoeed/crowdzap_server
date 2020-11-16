const mongoose = require("mongoose");
const config = require("../config");
winstonLogger = require("winston").loggers;

const logger = winstonLogger.get("database.js");

connectDB = async () =>{
  await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    poolSize: 10,
  })
      .then(()=>{
        logger.info("✌️ DB loaded and connected!");
        registerListener();
      })
      .catch((error)=> {
        logger.info(error);
        process.exit(1);
      });
};

/**
 * Reconnect on fail
**/
function registerListener() {
  mongoose.Promise = global.Promise;

  mongoose.connection.on("error", (err) => {
    logger.error("Database connection dropped, Trying again\n"+err);
  });

  mongoose.connection.on("reconnect", ()=>{
    logger.info("Reconnected.\n");
  });

  mongoose.connection.on("reconnectFailed", ()=>{
    logger.error("Mongoose has run out of reconnectTries.\n");
    process.exit(2);
  });
}

module.exports = connectDB;
