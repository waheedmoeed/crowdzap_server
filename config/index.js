dotenv = require("dotenv");

dotenv.config();

exports.port = process.env.PORT;
exports.databaseURL = process.env.MONGO_URI;
exports.jwtSecret = process.env.JWT_SECRET;
exports.clientURL = process.env.CLIENT_URL;
exports.environment = process.env.NODE_ENV;
exports.admin_service_account = process.env.ADMIN_SERVICE_ACCOUNT;
exports.logs = {
  level: process.env.LOG_LEVEL || "debug",
};
exports.api = {
  prefix: "/api",
};
