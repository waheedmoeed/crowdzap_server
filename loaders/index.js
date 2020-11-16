const initLogger = require("./logger");
expressLoader = require("./express");
mongooseLoader = require("./mongoose");
dependencyInjectorLoader = require("./dependencyInjection")
initFirebaseAdmin = require("./firebaseAdmin");

loadApp = async (app) => {
  await initLogger(app);
  await mongooseLoader();
  await initFirebaseAdmin();

  //add all the models to Container that are needed in service layer
  let userModel = {
     name: "userModel",
     model: require("../models/user"),
  };
  let socialPlatformsModel = {
    name: "social_platforms",
    model: require("../models/socialplatforms")
  }
  await dependencyInjectorLoader({
    models: [
      userModel,
      socialPlatformsModel
    ],
  });

  await expressLoader(app);
  console.log(`✌️ Server up and running on port ${config.port} in ${config.environment}!`);
};

module.exports = loadApp;
