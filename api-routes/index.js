const express = require("express");
let auth = require("./routes/auth");
let socialPlatforms = require("./routes/socialplatformsroutes")


module.exports =   ()=>{
    app = express.Router();
    auth(app);
    socialPlatforms(app);
    return app
}
//exports.authRouter = auth;
//exports.socialPlatformsRouter = socialPlatforms