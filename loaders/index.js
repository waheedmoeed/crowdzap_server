const initLogger = require("./logger");
expressLoader = require("./express");
mongooseLoader = require("./mongoose");
dependencyInjectorLoader = require("./dependencyInjection")

loadApp = async (app) => {
  await initLogger(app);
  await mongooseLoader();

  //add all the models to Container that are needed in service layer
  let userModel = {
     name: "userModel",
     model: require("../models/user"),
  };
  let kycModel = {
    name: "kycModel",
    model: require("../models/kyc"),
 };
  await dependencyInjectorLoader({
    models: [
      userModel,
      kycModel
    ],
  });

  await expressLoader(app);
  console.log(`✌️ Server up and running on port ${config.port} in ${config.environment}!`);
};

module.exports = loadApp;
