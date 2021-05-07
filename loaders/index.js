const cryptoOrder = require("../api-routes/routes/cryptoOrder");
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
  let listedPropModel = {
    name: "listedPropModel",
    model: require("../models/listedProp"),
  };
  let cryptoOrderModel = {
    name: "cryptoOrderModel",
    model: require("../models/cryptoOrder"),
  };
  let investmentModel = {
    name: "investmentModel",
    model: require("../models/investment"),
  };

  await dependencyInjectorLoader({
    models: [
      userModel,
      kycModel,
      listedPropModel,
      cryptoOrderModel,
      investmentModel
    ],
  });

  await expressLoader(app);
  console.log(`✌️ Server up and running on port ${config.port} in ${config.environment}!`);
};

module.exports = loadApp;
