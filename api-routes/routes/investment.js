const {celebrate, Joi} =require("celebrate")

const express = require("express");
const {getWithAuth} = require("../middlewares")

const {addNewInvestmentController} = require( "../../controllers/investments")

const router = new express.Router();

module.exports = (app)=> {
    app.use("/investment",router)

    router.post(
        "/add_new_investment",
        getWithAuth,
        celebrate({
            body: Joi.object({
                contractAddress: Joi.string().required(),
                tokens: Joi.number().required(),
                transactionHash: Joi.string().required(),
            })
        }),
        addNewInvestmentController
    )
}