const {Container} = require("typedi")

const dotenv = require("dotenv");
dotenv.config();
const {OAuth2Client} = require("google-auth-library");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//const {validateLoginInput, validateRegisterInput} = require('../../lib/userValidation')
let logger = require("winston").loggers.get("UserController.js")
//Creating user in local API
exports.registerUserController = async (req, res) => {
    let userObj = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }
    try{
        const userService = Container.get("UserService")
        let user = await userService.Register(userObj)
            return res.status(201).json({user});
    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "User Register failed with Local API",
        });
    }
}

//Local API Login
exports.loginUserController = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const userService = Container.get("UserService")
        const response = await userService.Login(email, password)
        return res.status(200).json({ user: response.user, token : response.token});
    }catch (e) {
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "User login failed with Local API",
        });
    }
}

// Google Login
exports.googleController = async (req, res) => {
    const {idToken} = req.body;
    client
        .verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT_ID})
        .then((response) => {
            console.log("GOOGLE LOGIN RESPONSE HERE ", response);
            const {email_verified, name, email} = response.payload;
            if (email_verified) {
                UserService.findOne({email}).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({
                            _id: user._id,
                            email: user.email,
                            name: user.name,
                            role: user.role,
                        }, process.env.JWT_SECRET, {
                            expiresIn: "7d",
                        });
                        return res.json({
                            token,
                        });
                    } else {
                        const password = email + process.env.JWT_SECRET;
                        user = new UserService({name, email, password});
                        user.save((err, data) => {
                            if (err) {
                                console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
                                return res.status(400).json({
                                    error: "UserService signup failed with google",
                                });
                            }
                            const token = jwt.sign(
                                {
                                    _id: data._id,
                                    email: data.email,
                                    name: data.name,
                                    role: data.role,
                                },
                                process.env.JWT_SECRET,
                                {expiresIn: "7d"},
                            );
                            return res.json({
                                token,
                            });
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    error: "Google login failed. Try again",
                });
            }
        });
};

exports.facebookController = (req, res) => {
    console.log("FACEBOOK LOGIN REQ BODY", req.body);
    const {userID, accessToken} = req.body;

    const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

    return (
        fetch(url, {
            method: "GET",
        })
            .then((response) => response.json())
            // .then(response => console.log(response))
            .then((response) => {
                const {email, name} = response;
                UserService.findOne({email}).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({
                            _id: user._id,
                            email: user.email,
                            name: user.name,
                            role: user.role,
                        }, process.env.JWT_SECRET, {
                            expiresIn: "7d",
                        });
                        const {_id, email, name, role} = user;
                        return res.json({
                            token,
                            user: {_id, email, name, role},
                        });
                    } else {
                        const password = email + process.env.JWT_SECRET;
                        user = new UserService({name, email, password});
                        user.save((err, data) => {
                            if (err) {
                                console.log("ERROR FACEBOOK LOGIN ON USER SAVE", err);
                                return res.status(400).json({
                                    error: "UserService signup failed with facebook",
                                });
                            }
                            const token = jwt.sign(
                                {_id: data._id},
                                process.env.JWT_SECRET,
                                {expiresIn: "7d",
                                },
                            );
                            const {_id, email, name, role} = data;
                            return res.json({
                                token,
                                user: {_id, email, name, role},
                            });
                        });
                    }
                });
            })
            .catch((error) => {
                res.json({
                    error: "Facebook login failed. Try later",
                });
            })
    );
};

exports.kycController = async (req, res) => {
    let kycObj = {...req.body}
    kycObj['userId'] = req.userId;
    try{
        const userService = Container.get("UserService")
        let response = await userService.StoreKyc(kycObj)
        if (response) return res.status(200).json({status: "ok"});
        return res.status(201).json({status: "Already KYC Process done"})
    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Kyc processing failed with Local API",
        });
    }
}

exports.addKeyController = async (req, res) => {
    let keyObj = {...req.body}
    let userId = req.userId;
    try{
        const userService = Container.get("UserService")
        let response = await userService.AddKey(keyObj, userId)
        if (response) return res.status(200).json({status: "ok"});
        return res.status(201).json({status: "Failed to add key"})
    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Add new key failed with Local API",
        });
    }
}

exports.getKeyController = async (req, res) => {
    let userId = req.userId;
    try{
        const userService = Container.get("UserService")
        let response = await userService.GetKeys(userId)
        if (response) return res.status(200).json({data: response});
        return res.status(202).json({data: "No keys founded"})
    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Keys get failed with Local API",
        });
    }
}