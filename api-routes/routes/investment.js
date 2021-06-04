const {celebrate, Joi} =require("celebrate")

const express = require("express");
const {getWithAuth} = require("../middlewares")

const {addNewInvestmentController, transferInvestmentController,resetInvestment, populateDB, getAllInvestment} = require( "../../controllers/investments")

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
                investmentType : Joi.string(),
                senderName: Joi.string(),
                senderAddress: Joi.string()
            })
        }),
        getWithAuth,
        addNewInvestmentController
    )

    router.post(
        "/transfer_investment",
        getWithAuth,
        celebrate({
            body: Joi.object({
                investmentId: Joi.string().required(),
                transactionHash: Joi.string().required(),
                senderName: Joi.string(),
                senderAddress: Joi.string(),
                toId: Joi.string()
            })
        }),
        getWithAuth,
        transferInvestmentController
    )

    router.get(
        "/all_investments",
        getWithAuth,
        getAllInvestment
    )


    router.get(
        "/populateDB",
        populateDB
    )

    router.get(
        "/reset",
        resetInvestment
    )
}