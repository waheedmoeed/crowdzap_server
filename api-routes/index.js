const express = require("express");
const auth = require("./routes/auth");
const listedProp = require("./routes/listedProp")
const cryptoOrder = require("./routes/cryptoOrder");
const investment = require("./routes/investment")


module.exports =   ()=>{
    app = express.Router();
    auth(app);
    listedProp(app);
    cryptoOrder(app)
    investment(app);
    return app  
}