const express = require("express");
let auth = require("./routes/auth");
let listedProp = require("./routes/listedProp")
const cryptoOrder = require("./routes/cryptoOrder");


module.exports =   ()=>{
    app = express.Router();
    auth(app);
    listedProp(app);
    cryptoOrder(app)
    return app  
}