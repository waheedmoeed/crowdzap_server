const {celebrate, Joi} =require("celebrate")

const express = require("express");
const {refreshFirebaseToken} = require("../../controllers/auth/users");
const {getWithAuth} = require("../middlewares")
// const passport = require('passport')
const router = new express.Router();



// @route Auth with Google
// @desc Register user
// @access Public
// router.post("/google", passport.authenticate('google',{scope:['profile']}));

// router.get('/google/callback',
// passport.authenticate('google',{failureRedirect: '/'}),
// (req,res)=>{
//     res.redirect('/dashboard')
// }
// )

const {googleController, facebookController, loginUserController, registerUserController} = require("../../controllers/auth/users");

module.exports = (app)=> {
    app.use("/user",router)

    router.post(
        "/register",
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        registerUserController);

    router.post(
        "/login",
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        loginUserController);

    router.post("/google-login", googleController);
    router.post("/facebook-login", facebookController);

    router.get("/refresh-firebase", getWithAuth, refreshFirebaseToken)
}
    //module.exports = router;
