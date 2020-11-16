const {celebrate, Joi} =require("celebrate")

const express = require("express");
// const passport = require('passport')
const router = new express.Router();
const {getWithAuth, postWithAuth} = require("../middlewares")

const {getInstBasic, getInstGraph, storeInstBasic, storeInstGraph, getAllAttachedAccounts} = require("../../controllers/auth/socialplatforms")

module.exports=  (app)=>{
    app.use("/social/",router)

    router.get("/attached",getWithAuth,getAllAttachedAccounts)
    router.get("/instagram/basic",getWithAuth,getInstBasic)
    router.get("/instagram/graph",getWithAuth,getInstGraph)

    router.post("/instagram/basic",celebrate({
        body: Joi.object({
            userId: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            }),
        })
        ,storeInstBasic
    )
    router.post("/instagram/graph", celebrate({
        body: Joi.object({
            userId: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            }),
        })
        ,storeInstGraph)
}