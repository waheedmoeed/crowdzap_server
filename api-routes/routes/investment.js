const {celebrate, Joi} =require("celebrate")

const express = require("express");
const {getWithAuth} = require("../middlewares")

const {addNewInvestmentController, resetInvestment} = require( "../../controllers/investments")

const router = new express.Router();

module.exports = (app)=> {
    app.use("/investment",router)

    router.post(
        "/add_new_investment",
        getWithAuth,
        celebrate({
            body: Joi.object({
                contractAddress: Joi.string().required(),
                amount: Joi.number().required(),
                transactionHash: Joi.string().required(),
                contractType:  Joi.string().required(),
            })
        }),
        addNewInvestmentController
    )

    router.get(
        "/reset",
        resetInvestment
    )
}