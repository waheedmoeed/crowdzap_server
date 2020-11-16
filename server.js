/* eslint-disable max-len */
config = require("./config");
express = require("express");


/**
 * Starts Express Server
**/
async function startServer() {
  const app = express();  
  await require("./loaders")(app);
  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info(`
      Server listening on port: ${config.port}
    `);
  });
}

startServer();
