const express = require("express");
let auth = require("./routes/auth");


module.exports =   ()=>{
    app = express.Router();
    auth(app);
    return app
}